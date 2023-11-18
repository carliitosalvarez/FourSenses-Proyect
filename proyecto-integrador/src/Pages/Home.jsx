import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/home.css";
import buffets from "../images/buffets.jpg";
import cenas from "../images/cenas.jpg";
import desayunos from "../images/desayunos.jpg";
import postres from "../images/postres.jpg";
import sinimagen from "../images/sinimagen.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { Form } from "react-bootstrap";
import RangeDatePicker from '../Components/RangeDatePicker'; 
import { useAuth } from "../Context/AuthContext";

const categorias = ["Desayuno", "Desayunos y Brunch", "Cenas", "Postres", "Buffets"];

const Home = () => {
  const { user } = useAuth();
  const [dataFetch, setDataFetch] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState([]); 
  const [isRequesting, setIsRequesting] = useState(false); 
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false); 
  const itemsPerPage = 10;

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/favoritos`
      );
      const favoritesData = response.data;
      setFavorites(favoritesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFavorites(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/comidas`
      );
      const result = response.data;
      setDataFetch(result);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const isFavorite = (comidaId) => {
    return favorites.some((fav) => fav.comida.id === comidaId && user.id === fav.user.id);
  };

  const handleFavoriteClick = async (comidaId) => {
    if (isRequesting) {
      return;
    }

    setIsRequesting(true); 
    let updatedFavorites = [...favorites];
    const isCurrentlyFavorite = isFavorite(comidaId);
  
    if (isCurrentlyFavorite) {
      updatedFavorites = updatedFavorites.filter(
        (fav) => fav.comida.id !== comidaId
      );
    } else {
      updatedFavorites.push({
        comida: { id: comidaId },
        user: { id: user.id },
      });
    }
    setFavorites(updatedFavorites);
    try {
      if (isCurrentlyFavorite) {
        await axios.delete(
          `${import.meta.env.VITE_BASE_SERVER_URL}/favoritos/${comidaId}/${user.id}`
        );
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/favoritos`, {
          user: { id: user.id },
          comida: { id: comidaId },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setIsSearching(true);
    setTimeout(() => {
      const newFilteredData = dataFetch.filter((producto) => {
        const categoryMatch =
          selectedCategory === "" || producto.categoria === selectedCategory;
        const textMatch =
          searchText === "" ||
          producto.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
          producto.descripcion.toLowerCase().includes(searchText.toLowerCase());        
        const favoritesMatch = !showOnlyFavorites || isFavorite(producto.id);
        return categoryMatch && textMatch && favoritesMatch;
      });
      setCurrentPage(1);
      setData(newFilteredData);
      setIsSearching(false);
      setLoading(false);
    }, 1000);
  };

  const handleShowOnlyFavoritesChange = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  return (
    <div className="container mt-5 home-container">
      <div className="row">
        <div className="col-12">
          <h3 className="mb-4">
            Buscar ofertas en servicios de catering y más
          </h3>
          <div className="input-group mb-4">
            <div className="search">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Buscar comida"
                aria-label="Buscar comida"
                aria-describedby="basic-addon2"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="picker">
              <RangeDatePicker />
            </div>
            <div className="category-select">
              <Form.Control
                as="select"
                name="categoria"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Form.Control>
            </div>
            <div className="show-only-favorites">
              <label>
                <input
                  type="checkbox"
                  checked={showOnlyFavorites}
                  onChange={handleShowOnlyFavoritesChange}
                />
                Solo Mis Favoritos
              </label>
            </div>
            <div className="btnfind">
              <button
                className="btn btn-primary search-button"
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
              >
                <FontAwesomeIcon icon={faSearch} />
                {isSearching ? " Cargando..." : " Buscar"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-3">
          <img src={desayunos} alt="Imagen 2" className="img-fluid mx-1" />
        </div>
        <div className="col-3">
          <img src={cenas} alt="Imagen 3" className="img-fluid mx-1" />
        </div>
        <div className="col-3">
          <img src={postres} alt="Imagen 4" className="img-fluid mx-1" />
        </div>
        <div className="col-3">
          <img src={buffets} alt="Imagen 5" className="img-fluid mx-1" />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h3>Comidas Destacadas</h3>
        </div>
      </div>
      <br></br>
      {loading ? (
        <div className="row">
          <div className="col">Cargando...</div>
        </div>
      ) : (
        <>
          <div className="row">
            {currentItems.map((producto) => (
              <div key={producto.id} className="col-md-6 mb-4">
                <div className="card card-custom">
                  <div className="card-img-wrapper">
                    {producto.imagenes[0] ? (
                      <img
                        src={producto.imagenes[0]}
                        alt={producto.nombre}
                        className="card-img-top img-fluid cover-image"
                        onError={(e) => {
                          e.target.src = sinimagen;
                        }}
                      />
                    ) : (
                      <img
                        src={sinimagen}
                        alt="Sin imagen"
                        className="card-img-top img-fluid cover-image"
                      />
                    )}
                    {user && (
                    <div className={isFavorite(producto.id) ? "favorite-star" : "nonfavorite-star"}>
                      <FontAwesomeIcon
                        icon={isFavorite(producto.id) ? faSolidStar : faRegularStar}
                        className={isRequesting ? "disabled-star" : ""}
                        onClick={() => handleFavoriteClick(producto.id)}
                      />
                    </div>
                    )}
                  </div>
                  <span className="badge badge-secondary categoria-badge">
                    Categoría: {producto.categoria}
                  </span>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/detalles/${producto.id}`} className="link">
                        {producto.nombre}
                      </Link>
                    </h5>
                    <p className="card-text description">
                      {producto.descripcion.length > 50
                        ? producto.descripcion.slice(0, 50) + "..."
                        : producto.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <ul className="pagination">
                {currentPage > 1 && (
                  <li className="page-item">
                    <button className="page-link" onClick={goToPrevPage}>
                      {"<"}
                    </button>
                  </li>
                )}
                {data.length > itemsPerPage &&
                  Array(Math.ceil(data.length / itemsPerPage))
                    .fill()
                    .map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          i + 1 === currentPage ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                {currentPage < Math.ceil(data.length / itemsPerPage) && (
                  <li className="page-item">
                    <button className="page-link" onClick={goToNextPage}>
                      {">"}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
