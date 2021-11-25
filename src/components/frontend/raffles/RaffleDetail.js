import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';



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
                <div className="py-3">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-4 border-end">
                                <img src={`http://localhost:8000/${raffle.image}`} alt={raffle.prize_name} height="250px" width="330px" />
                               
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
                </div>
            </div>
        )
    }

}

export default RaffleDetail
