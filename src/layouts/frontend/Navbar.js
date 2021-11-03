
import React from 'react'
import { Link} from 'react-router-dom';
import '../../assets/frontend/css/homepage.css'


function Navbar() {

    return (
        <nav id="home_nav" className="navbar navbar-expand-lg sticky-top p-4">
            <div className="container  text-uppercase">
                <Link className="navbar-brand text-dark" to="#">Raffle Draw</Link>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-dark" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/contact">Contact</Link>
                        </li>



                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
