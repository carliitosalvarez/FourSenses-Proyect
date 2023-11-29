// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import { useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/reserva.css';
import axios from "axios";


const formatDate = (date) => {
  if (!date) {
    return ""; 
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


const MyForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    ciudad: '',
  });

  const [dates, setDates] = useState({
    start: null,
    end: null,
    excludeDates: [parseISO(new Date().toISOString()) + 2],
  });

  const [detalleInfo, setDetalleInfo] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    imagenes: [],
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setFormData({
      id: storedUser.id,
      nombre: storedUser.name,
      apellido: storedUser.surName,
      correo: storedUser.email,
    });

    const detalleFromState = location.state?.detalle;
    const selectedDates = location.state?.selectedDates;

    if (detalleFromState && selectedDates) {
      setDates({
        start: selectedDates.startDate,
        end: selectedDates.endDate,
        excludeDates: [parseISO(new Date().toISOString()) + 2],
      });

      setDetalleInfo(detalleFromState);
    }
  }, [location.state]);

  const handleCalendarChange = (date) => {
    setDates({
      start: date[0],
      end: date[1],
      excludeDates: [parseISO(new Date().toISOString()) + 2],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isConfirmed = window.confirm("¿Confirmar la reserva?");
    if (isConfirmed) {
      try {
        const reservationData = {
          userId: formData.id,
          comidaIds: [detalleInfo.id],
          fechaInicio: formatDate(dates.start),
          fechaFin: formatDate(dates.end),
        };
  
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_SERVER_URL}/reservas`,
          reservationData
        );
  
      alert("Reserva realizada con exito!")
      } catch (error) {
        alert("No se pudo realizar la reserva!")
        console.error(error);
      }
    }
  };
  

  return (
    <div className="container row">
      <div className="col-md-9">
        <h2>Completa estos datos</h2>
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-inline">
              <div className="col">
                <div className="form-group">
                  <label>Nombre:&nbsp;</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={formData.nombre}
                    placeholder="Ingresa tu nombre"
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Apellido:&nbsp;</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    value={formData.apellido}
                    placeholder="Ingresa tu apellido"
                    readOnly
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>Correo:&nbsp;</label>
                  <input
                    type="email"
                    className="form-control"
                    name="correo"
                    value={formData.correo}
                    placeholder="Ingresa tu correo"
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Ciudad:&nbsp;</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ciudad"
                    value={formData.ciudad}
                    placeholder="Ingresa tu ciudad"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <h2>Calendario Doble</h2>
            <div className="d-flex justify-content-center">
              <DatePicker
                selected={parseISO(new Date().toISOString())}
                onChange={handleCalendarChange}
                startDate={dates.start}
                endDate={dates.end}
                inline
                monthsShown={2}
                selectsRange
                minDate={parseISO(new Date().toISOString())}
                excludeDates={dates.excludeDates}
              />
            </div>

            <button type="submit">Confirmar Reserva</button>
          </form>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card">
          <div className="title">Detalle de Reserva</div>
          <img src={detalleInfo.imagenes[0]} alt="Imagen de producto" />
          <div className="subtitle">{detalleInfo.nombre}</div>
          <div className="dates">Fecha de inicio: {formatDate(dates.start)}</div>
          <div className="dates">Fecha de finalización: {formatDate(dates.end)}</div>
        </div>
      </div>
    </div>
  );
};
//<button className="confirm-btn">Confirmar Reserva</button>

export default MyForm;
