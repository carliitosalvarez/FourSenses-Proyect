import React from "react";
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';




const Header = () =>{
    

    return (
        <Navbar className="nav">
                <img src="../images/FourSenses-Logo.png" alt=""/>
                <div className="buttons">
                <Button className="bt-nav" variant="danger" type="submit">Iniciar Sesion</Button>{" "}
                <Button className="bt-nav" variant="danger" type="submit">Crear Cuenta</Button>{" "}
                </div>
        </Navbar>
      );


    // return(
    // <header>
    //     <Link to="">
    //     <img src="./assets/FourSenses-Logo.png" alt="logo"/>
    //     <p>lema de la empresa</p>
    //     </Link>
    //     <nav>
    //         <ul>
    //             <li><Link to="">"crear cuenta"</Link></li>
    //             <li><Link to="">"iniciar sesion"</Link></li>
    //         </ul>
    //     </nav>
    // </header>
    // );
}

export default Header;