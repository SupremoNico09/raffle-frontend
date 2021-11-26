
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../../assets/frontend/css/homepage.css'
import Image from '../../assets2/img/navbarlogo.png';
import axios from 'axios';
import swal from 'sweetalert';


function Navbar() {

    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('api/logout').then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_firstname');
                swal("Success", res.data.message, "success");
                history.push('/raffles');
            }
        });
    }


    var AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {

        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )
    }
    else {
        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="">{localStorage.getItem('auth_firstname')}</Link>
                </li>
                <li className="nav-item">
                    <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white" to="/login">Logout</button>
                </li>
            </ul>

        )
    }



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={Image} alt="logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className='bx bx-menu'></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/raffles">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/raffledrawlists">Raffle Draw</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/rafflelists">My Raffle Lists</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                            {AuthButtons}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
