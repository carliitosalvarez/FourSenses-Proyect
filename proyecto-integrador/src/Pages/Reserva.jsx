import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/reserva.css";

const MyForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    ciudad: '',
  });

  const [ dates, setDates ] = useState({ start: null, end: null, excludeDates: [ new Date() + 2 ] });
  const today = new Date();
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    setFormData({
      nombre: storedUser.name,
      apellido: storedUser.surName,
      correo: storedUser.email,
    })

    // Get excludeDates from Back
    // setDates({})    
  }, [])

  const handleCalendarChange = (date) => {
    // Manejar cambios en el calendario si es necesario
    console.log(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if(formData.nombre.trim() != "") {
    // }

    try {
      // let res = await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/reservas`, formData);
    } catch(e) {
      // Tirar mensajito de error
    }

    console.log('Datos del formulario:', formData);
  };

  return <div className="container row">
      <div className='col-md-9'>
        <h2>Completa estos datos</h2>
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
          <form onSubmit={handleSubmit}>

            <div className='form-inline'>
              <div className='col'>
                <div className="form-group">
                  <input type="text" className="form-control" name='nombre' value={formData.nombre} placeholder="Enter nombre" readOnly/>
                </div>

                <div className="form-group">
                  <input type="text" className="form-control" name='apellido' value={formData.apellido} placeholder="Enter apellido" readOnly />
                </div>
              </div>

              <div className='col'>
                <div className="form-group">
                  <input type="email" className="form-control" name='correo' value={formData.correo} placeholder="Enter correo" readOnly/>
                </div>

                <div className="form-group">
                  <input type="text" className="form-control" name='ciudad' value={formData.ciudad} placeholder="Enter ciudad" readOnly/>
                </div>
              </div>
            </div>
           
            <h2>Calendario Doble</h2>
            <div className='d-flex justify-content-center'>
              <DatePicker
                  selected={today}
                  onChange={handleCalendarChange}
                  startDate={dates.start}
                  endDate={dates.end}
                  inline
                  monthsShown={2}
                  selectsRange
                  minDate={today}
                  excludeDates={dates.excludeDates}
                />
            </div>

            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>

      <div className='col-md-3'>
        <div className="card">
          <div className="title">Detalle de Reserva</div>
          <img src="ruta_de_la_imagen.jpg" alt="Imagen de producto" />
          <div className="subtitle">Nombre del Producto</div>
          <div className="dates">Fecha de inicio: 01/01/2023</div>
          <div className="dates">Fecha de finalización: 05/01/2023</div>
          <button className="confirm-btn">Confirmar Reserva</button>
        </div>
      </div>
    </div>
};

export default MyForm;
