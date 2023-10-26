// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import "./ListarProductos.css";

const ListarProductos = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Hacer el fetch a tu endpoint
    fetch('http://localhost:8080/comidas')
      .then(response => response.json())
      .then(data => setDatos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="lista-de-datos listar-productos">
      <h2 style={{ color: 'black' }}>Lista de Datos</h2>
      <table>
        <thead>
          <tr>
            <th style={{ color: 'black' }}>Id</th>
            <th style={{ color: 'black' }}>Nombre</th>
            <th style={{ color: 'black' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(item => (
            <tr key={item.id}>
              <td style={{ color: 'black' }}>{item.id}</td>
              <td style={{ color: 'black' }}>{item.nombre}</td>
              <td>
                <button onClick={() => handleEliminar(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  function handleEliminar(id) {
    const confirmar = window.confirm('¿Estás seguro de que quieres eliminar este elemento?');
  
    if (confirmar) {
      fetch(`http://localhost:8080/comidas/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al eliminar el elemento con ID ${id}`);
        }
        return response.json(); // Devolver la respuesta JSON para usarla en la siguiente promesa
      })
      .then(() => {
        // Hacer el fetch nuevamente para obtener la lista actualizada
        fetch('http://localhost:8080/comidas')
          .then(response => response.json())
          .then(data => setDatos(data))
          .catch(error => console.error('Error:', error));
      })
      .catch(error => console.error('Error:', error));
    }
  }
  
  
}

export default ListarProductos;
