import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Styles/productos.css";
import sinimagen from "../images/sinimagen.png";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuth } from '../Context/AuthContext';

const categorias = [
  "Desayunos y Brunch",
  "Cenas",
  "Postres",
  "Buffets",
];

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [largeImage, setLargeImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { isAdmin } = useAuth();
  
  useEffect(() => {
    if (!isAdmin()) {
        window.location.href = '/'; 
      }
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_SERVER_URL}/comidas`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setLargeImage(product.imagenes[0]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct({});
    setSelectedImages('');
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
      setSaving(true);
      await axios.put(
        `${import.meta.env.VITE_BASE_SERVER_URL}/comidas`,
        selectedProduct
      );
      closeModal();
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      );
      setProducts(updatedProducts);
      setSaving(false);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  };


  function confirmModal(message) {
    return new Promise((resolve) => {
      let modal = document.createElement("div");
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.right = "0";
      modal.style.bottom = "0";
      modal.style.left = "0";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      modal.style.zIndex = "1000";
  
      let modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "#fff";
      modalContent.style.padding = "20px";
      modalContent.style.borderRadius = "8px";
      modalContent.style.maxWidth = "80%";
      modalContent.style.minWidth = "300px";
      modalContent.style.display = "flex";
      modalContent.style.flexDirection = "column";
      modalContent.style.gap = "20px";
      modalContent.style.alignItems = "center";
  
      let text = document.createElement("p");
      text.innerText = message;
      text.style.textAlign = "center";
  
      let buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.justifyContent = "space-between";
      buttonContainer.style.width = "100%";
  
      let confirmButton = document.createElement("button");
      confirmButton.innerText = "Confirmar";
      confirmButton.style.backgroundColor = "#007BFF";
      confirmButton.style.color = "#fff";
      confirmButton.style.border = "none";
      confirmButton.style.padding = "10px 20px";
      confirmButton.style.borderRadius = "5px";
      confirmButton.style.cursor = "pointer";
      confirmButton.style.flexGrow = "1";
      confirmButton.onclick = function () {
        document.body.removeChild(modal);
        resolve(true);
      };
  
      let cancelButton = document.createElement("button");
      cancelButton.innerText = "Cancelar";
      cancelButton.style.backgroundColor = "#dc3545";
      cancelButton.style.color = "#fff";
      cancelButton.style.border = "none";
      cancelButton.style.padding = "10px 20px";
      cancelButton.style.borderRadius = "5px";
      cancelButton.style.cursor = "pointer";
      cancelButton.style.flexGrow = "1";
      cancelButton.style.marginLeft = "20px";
      cancelButton.onclick = function () {
        document.body.removeChild(modal);
        resolve(false);
      };
  
      buttonContainer.appendChild(confirmButton);
      buttonContainer.appendChild(cancelButton);
  
      modalContent.appendChild(text);
      modalContent.appendChild(buttonContainer);
  
      modal.appendChild(modalContent);
  
      document.body.appendChild(modal);
    });
  }

  const handleDelete = async (id) => {
    try {
      const userConfirmed = await confirmModal("¿Estás seguro de eliminar este producto?");
  
      if (userConfirmed) {
        await axios.delete(
          `${import.meta.env.VITE_BASE_SERVER_URL}/comidas/${id}`
        );
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleAddNew = async () => {
    try {
      setSaving(true);
      const imagesArray = selectedImages.split(',').map((img) => img.trim());

      const data = {
        nombre: selectedProduct.nombre,
        descripcion: selectedProduct.descripcion,
        categoria: selectedProduct.categoria,
        imagenes: imagesArray,
      };

      await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/comidas/guardar`,
        data
      );

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/comidas`
      );
      setProducts(response.data);
      closeModal();
      setSaving(false);
    } catch (error) {
      console.error(error);
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <button
        className="add-button"
        onClick={() => setShowModal(true)}
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        <FontAwesomeIcon icon={faPlus} />
        Agregar
      </button>
      <h1>Listado de productos</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id}>
              <div className="product-image" onClick={() => openModal(product)}>
                {product.imagenes[0] ? (
                  <img
                    src={product.imagenes[0]}
                    alt={product.nombre}
                    className="card-img-top img-fluid"
                    onError={(e) => {
                      e.target.src = sinimagen;
                    }}
                  />
                ) : (
                  <img
                    src={sinimagen}
                    alt="Sin imagen"
                    className="card-img-top img-fluid"
                  />
                )}
              </div>
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
      )}

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedProduct.id ? "Editar producto" : "Agregar producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={selectedProduct.nombre || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                name="categoria"
                value={selectedProduct.categoria || ""}
                onChange={handleEditChange}
              >
                <option value="" disabled>
                  Seleccione una categoría
                </option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={selectedProduct.descripcion || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="imagenes">
              <Form.Label>Imágenes (URL separadas por coma)</Form.Label>
              <Form.Control
                type="text"
                name="imagenes"
                value={selectedImages}
                onChange={(e) => setSelectedImages(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            variant="secondary"
            onClick={selectedProduct.id ? handleEditSave : handleAddNew}
          >
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Productos;