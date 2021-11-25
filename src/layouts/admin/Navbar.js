import React from 'react'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {DropdownButton, Dropdown } from 'react-bootstrap';


const Navbar = () => {

    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('api/logout').then(res => {
            if (res.data.status === 200) 
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success");
                history.push('/login');
            }
        });
    }

    return (
        <div>
            <nav>
                <div className="sidebar-button">
                    <i className='bx bx-menu sidebarBtn'></i>
                </div>
                <div className="profile-details">
                    <img src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt=""/>
                    <span className ="admin_name">Admin</span>
                    <DropdownButton id="dropdown-item-button" title="">
                    <Dropdown.Item as="button" id="drop-hover" onClick={logoutSubmit}>Logout</Dropdown.Item>
                    </DropdownButton>
                </div>
            </nav>
        </div>
    );  
}

export default Navbar

