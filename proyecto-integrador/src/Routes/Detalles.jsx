// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Detalles.css";
import backButtonImage from "/images/esquema-de-boton-circular-de-flecha-hacia-atras-izquierda.png"; // Ruta de la imagen

const Detalles = () => {
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await fetch(`http://localhost:8080/comidas/${id}`);
        if (!response.ok) {
          throw new Error(`Error al cargar la comida con ID ${id}`);
        }
        const result = await response.json();
        setDetalle(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetalle();
  }, [id]);

  const handleImageClick = (imagen) => {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    const modalImg = document.getElementById("img01");
    modalImg.src = imagen;
  };

  const closeModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  };

  return (
    <div className="details-container">
      {detalle ? (
        <div>
          <div className="header">
            <h2>{detalle.nombre}</h2>
            <div className="back-button" onClick={() => window.history.back()}>
              <img src={backButtonImage} alt="Volver" />
            </div>
          </div>
          <p>{detalle.descripcion}</p>
          <div className="image-container">
            <div className="first-image">
              <img
                src={detalle.imagenes[0]}
                alt="Imagen 0"
                onClick={() => handleImageClick(detalle.imagenes[0])}
              />
            </div>
            <div className="other-images">
              {detalle.imagenes.slice(1, showAllImages ? undefined : 5).map((imagen, index) => (
                <img
                  key={index + 1}
                  src={imagen}
                  alt={`Imagen ${index + 1}`}
                  onClick={() => handleImageClick(imagen)}
                />
              ))}
              {!showAllImages && (
                <div className="more-images">
                  <button onClick={() => setShowAllImages(true)}>Ver Más</button>
                </div>
              )}
            </div>
          </div>
          <div id="myModal" className="modal">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-content">
              <img id="img01" src="" alt="Imagen ampliada" />
            </div>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default Detalles;
