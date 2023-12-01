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
  const [blockedRanges, setBlockedRanges] = useState([]);

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
      const blockedRangesFromEndpoint = response.data.map((dateRange) => ({
        startDate: parseISO(dateRange[0]),
        endDate: parseISO(dateRange[1]),
      }));
      setBlockedRanges(blockedRangesFromEndpoint);
    } catch (error) {
      console.error(error);
    }
  };


  function showModal(message) {
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
  
    let closeButton = document.createElement("button");
    closeButton.innerText = "Cerrar";
    closeButton.style.backgroundColor = "#007BFF";
    closeButton.style.color = "#fff";
    closeButton.style.border = "none";
    closeButton.style.padding = "10px 20px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.onclick = function () {
      document.body.removeChild(modal);
    };
  
    modalContent.appendChild(text);
    modalContent.appendChild(closeButton);
  
    modal.appendChild(modalContent);
  
    document.body.appendChild(modal);
  }
  



  const handleReserveClick = async () => {
    try {
      // Verificar si el usuario está logeado
      if (!user) {
        // Si no está logeado, redirigir a la página de login
        showModal('Para realizar una reserva, es necesario estar registrado');
        navigate("/login");
        return;
      }

      await blockDatesFromEndpoint();

      // Redirige a /reservas
      navigate("/reservas", {
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
          blockedDates: blockedRanges,
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


  function showModal(message) {
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
    modalContent.style.maxHeight = "80%";
    modalContent.style.overflowY = "auto";
  
    let text = document.createElement("p");
    text.innerText = message;
    text.style.marginBottom = "20px";
  
    let closeButton = document.createElement("button");
    closeButton.innerText = "Cerrar";
    closeButton.style.backgroundColor = "#007BFF";
    closeButton.style.color = "#fff";
    closeButton.style.border = "none";
    closeButton.style.padding = "10px 20px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.onclick = function () {
      document.body.removeChild(modal);
    };
  
    modalContent.appendChild(text);
    modalContent.appendChild(closeButton);
  
    modal.appendChild(modalContent);
  
    document.body.appendChild(modal);
  }
  
  





  const handleDateChange = (dates) => {
    const [start, end] = dates;

    for (
      let currentDate = new Date(start);
      currentDate <= end;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      if (blockedDates.includes(currentDate.toISOString())) {
        showModal("Esa fecha ya se encuentra reservada");
        setStartDate(null);
        setEndDate(null);
        return;
      }
    }

    const intersectsWithBlockedRanges = blockedRanges.some((range) => {
      return start <= range.endDate && end >= range.startDate;
    });

    if (intersectsWithBlockedRanges) {
      showModal("La reserva contiene dias ya reservados");
      setStartDate(null);
      setEndDate(null);
      return;
    }

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
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    inline
                    monthsShown={2}
                    selectsRange
                    minDate={new Date()}
                    excludeDates={blockedRanges.flatMap((range) => {
                      const dates = [];
                      let currentDate = new Date(range.startDate);
                      while (currentDate <= range.endDate) {
                        dates.push(new Date(currentDate));
                        currentDate.setDate(currentDate.getDate() + 1);
                      }
                      return dates;
                    })}
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
