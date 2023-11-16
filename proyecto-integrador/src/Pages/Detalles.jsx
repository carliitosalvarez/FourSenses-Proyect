import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/detalles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import sinimagen from "../images/sinimagen.png";
import axios from "axios";

const Detalles = () => {
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_SERVER_URL}/comidas/${id}`
        );
        const result = response.data;
        setDetalle(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetalle();
  }, [id]);

  const handleLeftArrowClick = () => {
    if (detalle.imagenes.length > 1 && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (detalle.imagenes.length > 1 && currentImageIndex < detalle.imagenes.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="details-container">
      {detalle ? (
        <div>
          <div className="header">
            <h2>{detalle.nombre}</h2>
            <div className="back-button" onClick={() => window.history.back()}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
          </div>
          <div className="image-container">
            <img
              src={detalle.imagenes[currentImageIndex] || sinimagen}
              alt={`Imagen ${currentImageIndex}`}
              className="current-image cover-image-detalle"
              onError={(e) => {
                e.target.src = sinimagen;
              }}
            />
            {detalle.imagenes.length > 1 && (
              <>
              <div className="image-count">Imagen {currentImageIndex + 1}/{detalle.imagenes.length}</div>
              <div className="arrow-buttons">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="arrow-left"
                  onClick={handleLeftArrowClick}
                />
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="arrow-right"
                  onClick={handleRightArrowClick}
                />
              </div>
              </>
            )}
          </div>
          <br></br>
          <p className="description-det">{detalle.descripcion}</p>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default Detalles;
