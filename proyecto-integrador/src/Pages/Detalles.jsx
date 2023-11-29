// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentDate = new Date();
  const [blockedDates, setBlockedDates] = useState([]);
  const { user } = useAuth();
  const [isReserving, setIsReserving] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchDetalle();
  }, [id]);

  useEffect(() => {
    blockDatesFromEndpoint();
  }, [id]);

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

  const blockDatesFromEndpoint = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/reservas/${id}`
      );
      const blockedDatesFromEndpoint = response.data.map((dateString) =>
        parseISO(dateString)
      );
      setBlockedDates(blockedDatesFromEndpoint);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReserveClick = async () => {
    try {
      // const response = await axios.post(
      //   `${import.meta.env.VITE_BASE_SERVER_URL}/reservas`,
      //   reservationData
      // );

      // Redirige a /reservas
      navigate('/reservas', {
        state: {
          detalle: {
            id: detalle.id,
            nombre: detalle.nombre,
            descripcion: detalle.descripcion,
            imagenes: detalle.imagenes,
          },
          selectedDates: {
            startDate: startDate,
            endDate: endDate,
          },
        },
      });

    } catch (error) {
      console.error(error);
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

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
            <div className="col-md-12">
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
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Calendario</h5>
                  <DatePicker
                    selected={null}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    inline
                    monthsShown={2}
                    selectsRange
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
