
// eslint-disable-next-line no-unused-vars
import React from "react";
import "../Footer.css";
import logo from "./tu_ruta_de_imagen.jpg"; // Ruta de tu imagen

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left-content">
        <img src={logo} alt="Logo" className="logo" />
        <p>2023 FourSenses</p>
      </div>
    </footer>
  );
};

export default Footer;
