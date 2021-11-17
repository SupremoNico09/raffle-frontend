
import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/frontend/css/homepage.css'
import logo from '../../assets/frontend/assets/ticket.png'


function Navbar() {

    return (
        <nav id="home_nav" className="navbar navbar-expand-lg sticky-top p-4 ">
            <div className="container  text-uppercase ">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <img className="logo" src={logo} alt="logo" />
                        </li>
                        <li className="nav-item">
                            <Link className="navbar-brand text-info fs-4" to="/">Raffle Draw</Link>
                        </li>

                    </ul>
                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-secondary"  to="/raffles">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-secondary"  to="/rafflelists">My Raffle Lists</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-secondary"  to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-secondary" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
