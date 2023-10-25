/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/comidas");
        if (!response.ok) {
          throw new Error("Error al cargar las comidas");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5 home-container">
      <div className="row">
        {loading ? (
          <div className="col">Cargando...</div>
        ) : (
          data.slice(0, 10).map((producto) => (
            <div key={producto.id} className="col-md-6 mb-4">
              <div className="card">
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  className="card-img-top w-100 h-100"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detalles/${producto.id}`} className="link">
                      {producto.nombre}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
