/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import "../Alta.css";

function Alta() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('Desayunos y Brunch');
  const [imagenes, setImagenes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nombre,
      descripcion,
      categoria,
      imagenes: imagenes.split(',').map(img => img.trim())
    };

    try {
      const response = await fetch('http://localhost:8080/comidas/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        alert('Nombre de comida ya esta en uso');
        throw new Error('Error al guardar la comida');
      }

      alert('Comida guardada exitosamente');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-7" style={{ backgroundColor: 'black', padding: '10px', borderRadius: '3px' }}>
          <h3>Agregar Comida</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripcion:</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categoria:</label>
              <select
                className="form-control"
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="Desayunos y Brunch">Desayunos y Brunch</option>
                <option value="Cenas">Cenas</option>
                <option value="Postres">Postres</option>
                <option value="Buffets">Buffets</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="imagenes">Imagenes (separadas por comas):</label>
              <input
                type="text"
                className="form-control"
                id="imagenes"
                value={imagenes}
                onChange={(e) => setImagenes(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-danger" id="btn-add-new-comida">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Alta;
