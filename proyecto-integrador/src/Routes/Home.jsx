/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import buffets from "/images/buffets.jpg"; // Ruta de la primera imagen
import cenas from "/images/cenas.jpg"; // Ruta de la primera imagen
import desayunos from "/images/desayunos.jpg"; // Ruta de la primera imagen
import postres from "/images/postres.jpg"; // Ruta de la primera imagen

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/comidas");
        if (!response.ok) {
          throw new Error("Error al cargar las comidas");
        }
        const result = await response.json();

        // Obtener 10 elementos aleatorios
        const randomProducts = result.sort(() => Math.random() - Math.random()).slice(0, 10);

        setData(randomProducts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5 home-container">
      <div className="row">
        <div className="col-8 search-bar-container">
          <h3>Buscar ofertas en servicios de catering y más</h3>
          <div className="input-group">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Buscar comida"
              aria-label="Buscar comida"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="Seleccionar fecha"
                className="form-control date-picker"
              />
              <button className="btn btn-primary search-button" type="button">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-2">
          <img src={desayunos} alt="Imagen 2" className="img-fluid mx-1" />
        </div>
        <div className="col-2">
          <img src={cenas} alt="Imagen 3" className="img-fluid mx-1" />
        </div>
        <div className="col-2">
          <img src={postres} alt="Imagen 4" className="img-fluid mx-1" />
        </div>
        <div className="col-2">
          <img src={buffets} alt="Imagen 5" className="img-fluid mx-1" />
        </div>
      </div>
      <div className="row my-4">
        {loading ? (
          <div className="col">Cargando...</div>
        ) : (
          data.map((producto) => (
            <div key={producto.id} className="col-md-6 mb-4">
              <div className="card">
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  className="card-img-top w-100 h-100"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detalles/${producto.id}`} className="link">
                      {producto.nombre}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
