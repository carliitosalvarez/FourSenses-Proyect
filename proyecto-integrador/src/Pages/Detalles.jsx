import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles/detalles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import sinimagen from "../images/sinimagen.png";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../Context/AuthContext";
import { parseISO } from "date-fns";

const Detalles = () => {
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [blockedDates, setBlockedDates] = useState([]);
  const { user } = useAuth();
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    fetchDetalle();
  }, [id]);

  useEffect(() => {
    blockDatesFromEndpoint();
  }, []);

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

  const findNextAvailableDate = (blockedDatesFromEndpoint) => {
    let nextDate = new Date(selectedDate);
    while (blockedDatesFromEndpoint.some((date) => date.getDate() === nextDate.getDate())) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    return nextDate;
  };

  const blockDatesFromEndpoint = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/reservas/${id}`
      );
      const blockedDatesFromEndpoint = response.data.map((dateString) =>
        parseISO(dateString)
      );
      setBlockedDates(blockedDatesFromEndpoint);
      setSelectedDate(findNextAvailableDate(blockedDatesFromEndpoint));
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleReserveClick = async () => {
    try {
      setIsReserving(true);

      const formattedDate = selectedDate ? formatDate(selectedDate) : "";

      const reservationData = {
        userId: user.id,
        comidaIds: [id],
        fechaReserva: formattedDate,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/reservas`,
        reservationData
      );

      if (response.status === 201) {
        alert("Reserva realizada con éxito");
        blockDatesFromEndpoint();
      } else {
        alert("No se pudo realizar la reserva");
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al realizar la reserva");
    } finally {
      setIsReserving(false);
    }
  };

  const handleLeftArrowClick = () => {
    if (detalle.imagenes.length > 1 && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (
      detalle.imagenes.length > 1 &&
      currentImageIndex < detalle.imagenes.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
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
          <div className="row">
            <div className="col-md-8">
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
                  <div className="image-count">
                    Imagen {currentImageIndex + 1}/{detalle.imagenes.length}
                  </div>
                )}
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
              </div>
              <br />
              {detalle.imagenes.length > 1 && (
                <div className="thumbnail-container">
                  {detalle.imagenes.map((imagen, index) => (
                    <img
                      key={index}
                      src={imagen}
                      alt={`Imagen ${index + 1}`}
                      className={`thumbnail ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
              )}
              <br />
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Calendario</h5>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    inline
                    minDate={new Date()}
                    excludeDates={blockedDates}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary"
                style={{ height: "46px" }}
                onClick={handleReserveClick}
                disabled={isReserving}
              >
                {isReserving ? "Reservando..." : "Reservar"}
              </button>
            </div>
          </div>
          <br />
          <p className="description-det">{detalle.descripcion}</p>
          <br />
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default Detalles;
