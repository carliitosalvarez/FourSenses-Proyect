import React from "react";
import {Link} from "react-router-dom";


const Header = () =>{
    return(
    <header>
        <Link to="">
        <img src="./assets/FourSenses-Logo.png" alt="logo"/>
        <p>lema de la empresa</p>
        </Link>
        <nav>
            <ul>
                <li><Link to="">"crear cuenta"</Link></li>
                <li><Link to="">"iniciar sesion"</Link></li>
            </ul>
        </nav>
    </header>
    );
}

export default Header;