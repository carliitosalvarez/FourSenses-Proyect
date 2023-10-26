// eslint-disable-next-line no-unused-vars
import React from "react";
import "../Footer.css";
import logo from "../assets/copyright.png"; // Ruta de tu imagen
import imagen1 from "../assets/instagram.png"; // Ruta de la imagen 1
import imagen2 from "../assets/email.png"; // Ruta de la imagen 2
import imagen3 from "../assets/ubicacion.png"; // Ruta de la imagen 3
import imagen4 from "../assets/telefono.png"; // Ruta de la imagen 4

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left-content">
        <img src={logo} alt="Logo" className="logo" />
        <p>2023 FourSenses</p>
      </div>
      <div className="right-content">
        <img src={imagen1} alt="Imagen 1" className="footer-img" />
        <img src={imagen2} alt="Imagen 2" className="footer-img" />
        <img src={imagen3} alt="Imagen 3" className="footer-img" />
        <img src={imagen4} alt="Imagen 4" className="footer-img" />
      </div>
    </footer>
  );
};

export default Footer;
