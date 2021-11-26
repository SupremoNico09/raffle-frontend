import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Countdown from 'react-countdown';


function RaffleDrawList() {


    const [loading, setLoading] = useState(true);
    const [viewRaffle, setRaffle] = useState([]);

    const raffleCount = viewRaffle.length;

    const Completionist = () => <span>Raffle Starting!</span>;


    useEffect(() => {

        axios.get(`/api/view-raffle`).then(res => {
            if (res.data.status === 200) {
                setRaffle(res.data.raffles);
                setLoading(false);
            }
        });

    }, []);





    if (loading) {
        return <h4>Loading...</h4>
    }
    else {
        var display_Raffledata = "";
        if (raffleCount) {
            display_Raffledata = viewRaffle.map((item) => {
                return (

                    <div className="col" key={item.id}>

                        <div className="card h-100" >
                            <img src={`http://localhost:8000/${item.image}`} height="230px" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.prize_name}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Prize Category: {item.prizes.type}</li>
                                <li className="list-group-item">Raffle Starts in: <Countdown date={item.activate}>
                                    <Completionist />
                                </Countdown></li>
                            </ul>
                            <div className="card-body ">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <Link to={`/raffle-draw/${item.prize_name}`} className="btn btn-primary me-md-2 float-start">Enter Raffle</Link>
                                </div>
                            </div>
                        </div>
                    </div>


                )
            });
        }
        else {
            display_Raffledata =
                <div className="col-md-12">
                    <div>
                        <h6>No Raffles Created...</h6>
                    </div>

                </div>
        }
    }


    return (
        <div>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-3 mt-3">
                    {display_Raffledata}
                </div>
            </div>
        </div>
    )
}

export default RaffleDrawList
