import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


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
                <div className="col-md-4 mb-4" key={idx}>
                    <div className="card">
                        <Link to="">
                            <img src="" className="w-100" alt={item.type} />
                        </Link>
                        <div className="card-body">
                            <Link to={`raffles/${item.type}`}>
                                <h5>{item.type}</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className="py-3">
                <div className="container">
                    <h6>Prizes Types</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showPrizesCategory}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Prizes
