import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import Wave from '../../../assets2/img/wave1.png';



function RaffleDetail(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [raffle, setRaffle] = useState([]);




    useEffect(() => {

        let isMounted = true;

        const prizes_type = props.match.params.prizes;
        const raffles_prize_name = props.match.params.raffles;
        axios.get(`/api/view-raffle/${prizes_type}/${raffles_prize_name}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setRaffle(res.data.raffles);
                    setLoading(false);
                }
                else if (res.data.status === 404) {
                    history.push('/raffles');
                    swal("Warning", res.data.message, "error")
                }

            }

        });

        return () => {
            isMounted = false
        };
    }, [props.match.params.prizes, props.match.params.raffles, history]);






    const submitAddtoraffle = (e) => {
        e.preventDefault();

        const data = {
            raffle_id: raffle.id,
            ticket_qty: 1,
        }
        axios.post(`api/add-to-list`, data).then(res => {
            if (res.data.status === 201) {
                swal("Success", res.data.message, "success");
            }
            else if (res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            }
            else if (res.data.status === 401) {
                swal("Error", res.data.message, "error");
            }
            else if (res.data.status === 404) {
                swal("Warning", res.data.message, "warning");
            }
        });
    }



    if (loading) {
        return <h4>Loading Raffle Detail...</h4>
    }
    else {
        return (
            <div>
                <div className="buy-raffle">
                    <div className="container">
                        <h2 className="title-style">Prize Detail</h2>
                        {/* <div className="row">
                                <div className="col-md-4">
                                    <div className="card card-blog">
                                        <div className="card-image">
                                            <img className="img" src={`http://localhost:8000/${raffle.image}`} alt={raffle.prize_name} />
                                            <div className="ripple-cont"></div>
                                        </div>
                                        <div className="table">
                                            <h4 className="card-caption">
                                                <Link to="/prizedetail">Lenovo</Link>
                                            </h4>
                                            <div className="ftr text-center">
                                                <button type="button" className="btn btn-primary btn-sm" onClick={submitAddtoraffle}>Add To Your Raffle List</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="detail">
                                        <div className="text-center">
                                            <span className="badge btn-sm btn-success badge-pil mb-4 ">Available</span>
                                        </div>
                                        <br />
                                        <button type="button" class="btn btn-secondary btn-sm btn-radius">
                                            <i className='bx bxs-coupon' ></i> &nbsp; &nbsp;
                                            <span className="text">Ticket Price:</span>
                                        </button>
                                        <h4>₱{raffle.ticket}</h4>

                                        <button type="button" class="btn btn-secondary btn-sm btn-radius">
                                            <i className='bx bxs-group' ></i> &nbsp; &nbsp;
                                            <span className="text">All Tickets:</span>
                                        </button>
                                        <h4>{raffle.participant}</h4>
                                    </div>
                                </div>
                            </div> */}
                        <div className="row">

                            <div className="col-md-4 border-end">
                                <img src={`http://localhost:8000/${raffle.image}`} alt={raffle.prize_name} height="250px" width="100%" />

                                <div className="text-center">

                                    <div>
                                        <button type="button" className="btn btn-primary w-100" onClick={submitAddtoraffle}>Add To Your Raffle List</button>
                                    </div>

                                </div>

                            </div>
                            <div className="col-md-8">
                                <h2>
                                    {raffle.prize_name}

                                    <Link to="/raffles" type="button" className="btn btn-danger btn-sm float-end">Cancel</Link>
                                </h2>
                                <span className="badge btn-sm btn-success badge-pil mb-4 ">Available</span>
                                <h5 className="mb-3">
                                    Ticket Price: ₱{raffle.ticket}
                                </h5>
                                <p> {raffle.description}</p>
                                <h5 className="mb-3">
                                    All Tickets: {raffle.participant}
                                </h5>
                            </div>

                        </div>
                    </div>
                    <img src={Wave} alt="" className="buttom-img" />
                </div>
            </div>
        )
    }

}

export default RaffleDetail
