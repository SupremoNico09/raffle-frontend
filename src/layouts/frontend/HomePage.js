import React from 'react'
import banner from '../../assets/frontend/assets/rafflebanner.png'
import '../../assets/frontend/css/homepage.css'
import { Link } from 'react-router-dom'

function Homepage() {
    return (
        <div className="background_color">
            <header className="masthead">
                <div className="container px-5 position-absolute top-50 start-50 translate-middle">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="mb-5 mb-lg-0 text-center text-lg-start">
                                <h1 className="banner_text display-4 lh-1 mb-4 fw-bolder">Try to Get Your Luck Today!</h1>
                                <p className="lead fw-normal text-muted mb-4">Buy Your Tickets Now and Don't Miss The Chance To Win An Awesome Prizes.</p>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div id="button_start">
                                    <Link className="effect1" to="/raffles">
                                        Get Started
                                        <span className="bg"></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div>
                                <img className="banner_img " src={banner} alt="bannerImg" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Homepage;
