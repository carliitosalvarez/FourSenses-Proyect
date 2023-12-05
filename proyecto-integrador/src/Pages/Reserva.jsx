// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';
import { useLocation } from 'react-router-dom';
//import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
//import '../Styles/datapicker.css';
import { useNavigate } from 'react-router-dom';


const formatDate = (date) => {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Reserva = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    ciudad: '',
  });

  const [blockedRanges, setBlockedRanges] = useState([]);
  const [dates, setDates] = useState({
    start: null,
    end: null,
  });

  const [detalleInfo, setDetalleInfo] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    imagenes: [],
  });

  const [initialDate, setInitialDate] = useState(new Date());

  useEffect(() => {
    if (dates.start) {
      setInitialDate(dates.start);
    }
  }, [dates.start]);

  useEffect(() => {
    if (location.state) {
      const { blockedDates } = location.state;
      setBlockedRanges(blockedDates);
    }
  }, [location.state]);

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
      });

      setDetalleInfo(detalleFromState);
    }
  }, [location.state]);

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
  




  const handleCalendarChange = (date) => {
    for (
      let currentDate = new Date(date[0]);
      currentDate <= date[1];
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      if (
        blockedRanges.some(
          (range) => currentDate >= range.startDate && currentDate <= range.endDate
        )
      ) {
        showModal('Esa fecha ya se encuentra reservada');
        setDates({
          start: null,
          end: null,
        });
        return;
      }
    }

    setDates({
      start: date[0],
      end: date[1],
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    confirmModal('¿Confirmar la reserva?').then(async (isConfirmed) => {
      if (isConfirmed) {
        try {
          for (
            let currentDate = new Date(dates.start);
            currentDate <= dates.end;
            currentDate.setDate(currentDate.getDate() + 1)
          ) {
            if (
              blockedRanges.some(
                (range) => currentDate >= range.startDate && currentDate <= range.endDate
              )
            ) {
              showModal('Esa reserva contiene dias ya reservados');
              return;
            }
          }
  
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
  
          showModal('Reserva realizada con exito!');
            navigate('/');
                 } catch (error) {
          showModal('La reserva debe ser superior a 48 horas');
          console.error(error);
        }
      }
    });
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

              </div>
            </div>

            <h2>Fechas de Reserva</h2>
            <div className="d-flex justify-content-center">
  <div className="calendar-container">
    <DatePicker
      selected={initialDate}
      onChange={handleCalendarChange}
      startDate={dates.start}
      endDate={dates.end}
      inline
      monthsShown={2}
      selectsRange
      minDate={parseISO(new Date().toISOString())}
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



            <button type="submit">Confirmar Reserva</button>
          </form>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card">
          <div className="title">Detalle de Reserva</div>
          <img src={detalleInfo.imagenes[0]} alt="Imagen de producto" />
          <div className="subtitle">{detalleInfo.nombre}</div>
          <div className="dates">Fecha inicio: {formatDate(dates.start)}</div>
          <div className="dates">Fecha fin: {formatDate(dates.end)}</div>
        </div>
      </div>
    </div>
  );
};

export default Reserva;
