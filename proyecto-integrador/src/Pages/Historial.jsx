// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import '../Styles/historial.css';

const Historial = () => {
  const [historialData, setHistorialData] = useState([]);

  useEffect(() => {
    // Hacer la llamada al endpoint
    fetch('http://localhost:8080/reservas/historial/1')
      .then(response => response.json())
      .then(data => setHistorialData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // La dependencia vacía asegura que se llama solo una vez al montar el componente

  return (
    <div>
      <h1>Historial de Reservas</h1>
      <form>
        <table>
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
                <td>{reserva[1]}</td>
                <td>{reserva[2]}</td>
                <td>{reserva[3]}</td>
                <td>{new Date(reserva[4]).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Historial;
