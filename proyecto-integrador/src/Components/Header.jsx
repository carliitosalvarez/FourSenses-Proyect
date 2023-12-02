import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faUsers, faUtensils, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../Context/AuthContext';
import logo from '../images/FourSenses-Logo.png'; 
import '../Styles/header.css';
import Modal from './Modal'; 
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); 

  const handleLogout = () => {
    logout();
    window.location.href = '/'; 
  };

  const handleShowData = () => {
    setShowModal(true);
  };

  const navigate = useNavigate();


  const handleHistorial = () => {
    navigate('/historial');
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
                <p onClick={handleHistorial}>Historial</p>
                <p onClick={handleLogout}>Cerrar Sesión</p>
                <div 
                  className={`dropdown ${showDropdown ? 'show' : ''}`}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
               {isAdmin() && (
                  <>
                  <span className="dropdown-toggle" role="button">
                    Menú
                  </span>
                  <div className={`dropdown-menu ${showDropdown ? 'show' : ''} left-menu`}>
                    <Link to="/users" className="dropdown-item">
                      <FontAwesomeIcon icon={faUsers} /> Usuarios
                    </Link>
                    <Link to="/productos" className="dropdown-item">
                      <FontAwesomeIcon icon={faShoppingCart} /> Productos
                    </Link>
                  </div>
                  </>
                    )
                  }
                </div>
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
