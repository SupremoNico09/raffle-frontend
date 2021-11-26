import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Wave from '../../../assets2/img/wave1.png';


function Prizes() {

    const [loading, setLoading] = useState(true);
    const [prizes, setPrizes] = useState([]);
    useEffect(() => {

        axios.get(`/api/getPrizes`).then(res => {
            if (res.data.status === 200) {
                setPrizes(res.data.prizes);
                setLoading(false);
            }
        });
    }, []);

    if (loading) {

        return (
            <h4>Loading Prizes...</h4>
        )

    }
    else {
        var showPrizesCategory = '';
        showPrizesCategory = prizes.map((item, idx) => {
            return (
                <div className="col-md-4" key={idx}>
                    <div className="card card-blog">
                        <div className="card-image">
                            <img className="w-100" alt="" src="https://mdbootstrap.com/img/new/standard/nature/111.jpg" />
                            <div className="ripple-cont"></div>
                        </div>
                        <div className="table">
                            <h4 className="card-caption">
                                <Link to={`raffles/${item.type}`}>
                                    <h5>{item.type}</h5>
                                </Link>
                            </h4>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className="buy-raffle">
                <div className="py-3">
                    <div className="container">
                        <h2 className="title-style">Prize Categories</h2>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">
                            {showPrizesCategory}
                        </div>
                    </div>
                </div>
                <img src={Wave} alt="" className="buttom-img" />
            </div>
        </div>
    )
}

export default Prizes
