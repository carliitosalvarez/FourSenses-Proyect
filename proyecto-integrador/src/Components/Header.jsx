// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Header = () => {
    return (
        <Navbar className="nav">
            <Link to="/">
                <img src="../images/FourSenses-Logo.png" alt=""/>
            </Link>
            <div className="buttons">
                <Button className="bt-nav" variant="danger" type="submit">Iniciar Sesion</Button>{" "}
                <Button className="bt-nav" variant="danger" type="submit">Crear Cuenta</Button>{" "}
            </div>
        </Navbar>
    );
}

export default Header;
