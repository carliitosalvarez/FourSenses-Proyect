// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/historial.css';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';


const Historial = () => {
  const [historialData, setHistorialData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_SERVER_URL}/reservas/historial/${user.id}`
          );         
          const historialData = response.data;
          setHistorialData(historialData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHistorial();
  }, [user]); 


  const opcionesFechaHora = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  
  

  return (
    <div>
      <h1>Historial de Reservas</h1>
      <form>
        <table className="historial-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Día de Reserva</th>
            </tr>
          </thead>
          <tbody>
            {historialData.map((reserva, index) => (
         <tr key={index}>
         <td>
           <Link to={`/detalles/${reserva[0]}`}>{reserva[1]}</Link>
         </td>
         <td>{reserva[2]}</td>
         <td>{reserva[3]}</td>
         <td>{new Date(reserva[4]).toLocaleString(undefined, opcionesFechaHora)}</td>
       </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Historial;
