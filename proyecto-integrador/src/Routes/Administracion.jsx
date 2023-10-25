// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Administracion = () => {
  return (
    <div className="admin-menu">
      <h2 style={{ color: 'white' }}>Panel de Administración</h2>
      <ul>
        <li>
          <Link to="/alta">Agregar Producto</Link>
        </li>
        <li>
          <Link to="/eliminar-producto">Eliminar Producto</Link>
        </li>
        <li>
          <Link to="/listar-productos">Listar Productos</Link>
        </li>
      </ul>
    </div>
  );
}

export default Administracion;
