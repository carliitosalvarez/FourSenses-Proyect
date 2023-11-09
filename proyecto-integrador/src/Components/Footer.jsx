// Footer.js
import React from "react";
import "../Styles/footer.css";
import logo from "../images/copyright.png";
import imagen1 from "../images/instagram.png";
import imagen2 from "../images/email.png";
import imagen3 from "../images/ubicacion.png";
import imagen4 from "../images/telefono.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left-content">
      <p>
        <img src={logo} alt="Logo" className="logo" />
        2023 FourSenses
      </p>
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
