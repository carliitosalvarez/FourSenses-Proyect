import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import '../Styles/productos.css';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [newProduct, setNewProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_SERVER_URL}/comidas`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };


  const closeModal = () => {
    setModalIsOpen(false);
  };


  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_SERVER_URL}/comidas`,
        selectedProduct
      );
      closeModal();
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await axios.delete(`http://localhost:8080/comidas/${id}`);
        const updatedProducts = products.filter((product) =>
          product.id !== id
        );
        setProducts(updatedProducts);
      } catch (error) {
        console.error(error);
      }
    }
  };


  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };


  const handleAddNew = async () => {
    try {
      await axios.post("http://localhost:8080/comidas", newProduct);
      setProducts([...products, newProduct]);
      setNewProduct({});
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Listado de productos</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <img
                src={product.imagenes[0]}
                alt={product.nombre}
                onError={(e) => {
                    e.target.src = "../images/sinimagen.png"; 
                }}
                />
            <div>
              <strong>{product.nombre}</strong>
              <p>{product.categoria}</p>
            </div>
            <div className="product-actions">
              <button onClick={() => openModal(product)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => handleDelete(product.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="add-button" onClick={() => setModalIsOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        {modalIsOpen && (
          <>
            <h2>Editar producto</h2>
            <form>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={selectedProduct.nombre || ""}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Categoría:</label>
                <input
                  type="text"
                  name="categoria"
                  value={selectedProduct.categoria || ""}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  value={selectedProduct.descripcion || ""}
                  onChange={handleEditChange}
                />
              </div>
              <button type="button" onClick={handleEditSave}>
                Guardar
              </button>
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Productos;
