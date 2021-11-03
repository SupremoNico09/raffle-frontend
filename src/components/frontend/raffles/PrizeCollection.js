import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PrizeCollection() {

    const [loading, setLoading] = useState(true);
    const [prize, setPrize] = useState([]);
    useEffect(() => {

        axios.get(`/api/getPrize`).then(res => {
            if (res.data.status === 200) {
                // console.log(res.data.prize);
                setPrize(res.data.prize);
                setLoading(false);
            }
        });

    }, [])

    if (loading) {
        return <h4>Loading Prizes...</h4>
    }
    else {
        var showPrizeList = '';
        showPrizeList = prize.map((item, idx) => {
            return (
                <div className="col-md-4" key={idx}>
                    <div className="card">
                        <Link to="">
                            <img src={`http://localhost:8000/${item.image}`} height="200px" className="w-100" alt={item.prize_name} />
                        </Link>
                        <div className="card-body">
                            <Link to={`raffles/${item.prize_name}`}>
                                <h5>{item.prize_name}</h5>
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
                    <h6>Prizes Page</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showPrizeList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrizeCollection
