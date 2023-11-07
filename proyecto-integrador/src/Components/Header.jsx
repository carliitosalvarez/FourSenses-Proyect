import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/AuthContext';
import logo from '../assets/FourSenses-Logo.png'; 
import '../Styles/header.css';
import Modal from './Modal'; 

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleShowData = () => {
    setShowModal(true);
  };

  const initials = user ? `${(user.name?.charAt(0) || '').toUpperCase()}${(user.surName?.charAt(0) || '').toUpperCase()}` : '';

  return (
    <Navbar className="nav fixed-top">
      <Link to="/">
        <img src={logo} alt="Four Senses Logo" />
      </Link>
      <div className="buttons">
        {!user && !location.pathname.includes('/login') && (
          <Link to="/login">
            <Button className="bt-nav" variant="danger" type="submit">
              <FontAwesomeIcon icon={faSignInAlt} /> Iniciar Sesión
            </Button>{" "}
          </Link>
        )}
        {!user && !location.pathname.includes('/signup') && (
          <Link to="/signup">
            <Button className="bt-nav" variant="danger" type="submit">
              <FontAwesomeIcon icon={faUserPlus} /> Crear Cuenta
            </Button>{" "}
          </Link>
        )}
        {user && (
          <div className="user-info" onClick={() => setShowMenu(!showMenu)}>
            <div className="initials-circle">
              <p>{initials}</p>
            </div>
            {showMenu && (
              <div className="menu">
                <p onClick={handleShowData}>Datos</p>
                <p onClick={handleLogout}>Cerrar Sesión</p>
              </div>
            )}
          </div>
        )}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <p>Nombre: {user?.name}</p>
          <p>Apellido: {user?.surName}</p>
          <p>Email: {user?.email}</p>
          <p>Rol: {user?.roles[0].name}</p>
        </Modal>
      )}
    </Navbar>
  );
};

export default Header;
