import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo-details">
                <i className='bx bxs-coupon'></i>
                <span className="logo_name">Tombola</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/admin/dashboard" >
                        <i className='bx bx-grid-alt' ></i>
                        <span className="links_name">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/view-raffle">
                        <i className='bx bxs-coupon' ></i>
                        <span className="links_name">Raffles</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/participants">
                        <i className='bx bxs-group' ></i>
                        <span className="links_name">Participants</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/view-prize">
                        <i className='bx bxs-gift' ></i>
                        <span className="links_name">Prizes</span>
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        <i className='bx bx-history' ></i>
                        <span className="links_name">History</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;