import React from 'react';
import { Link } from 'react-router-dom';
import Logobtn from '../../assets2/img/ticketbtn.png';
import Gift from '../../assets2/img/gift2.svg';
import Wave from '../../assets2/img/wave1.png';


function Banner() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p className="promo-title">Try to get your luck today!</p>
                        <h4 className="paragraph">
                            Buy your tickets now and don't miss the chance to win an awesome prizes !
                        </h4>
                        <Link to="/raffles"><img src={Logobtn} alt="" className="ticket-btn" />Buy Ticket</Link>
                    </div>
                    <div className="col-md-6">
                        <img src={Gift} alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <img src={Wave} alt="" className="buttom-img"/>
        </div>
    )
}

export default Banner
