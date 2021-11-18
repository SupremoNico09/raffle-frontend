import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import { Button, Modal } from 'react-bootstrap';
import Form from './RaffleForm';


function RaffleDetail(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [raffle, setRaffle] = useState([]);
    const [lgShow, setLgShow] = useState(false);



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




    const [quantity, setQuantity] = useState(1);
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }


    }
    const handleIncrement = () => {
        if (quantity < 3) {
            setQuantity(prevCount => prevCount + 1);
        }
    }

    const submitAddtoraffle = (e) => {
        e.preventDefault();

        const data = {
            raffle_id: raffle.id,
            ticket_qty: quantity,
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

    var totalCost = raffle.ticket * quantity;;

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
                                <div className="text-center mt-4">
                                    <button className="btn btn-success btn-lg" type="button" >Enter Raffle</button>
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


                                <div>


                                    <div className="row">



                                        <div className="col-md-3 mt-4">
                                            <h6>How many tickets do you want to purchase?</h6>
                                        </div>
                                        <div className="col-md-2 mt-4 mb-5">
                                            <div className="input-group">
                                                <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                                                <div className="form-control text-center">{quantity}</div>
                                                <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <h4 className="col">
                                            Total Cost: ₱ {totalCost}
                                        </h4>
                                        <div>
                                            <button type="button" className="btn btn-primary w-100" onClick={submitAddtoraffle}>Add To Your Raffle List</button>
                                        </div>



                                    </div>
                                    <div className="col mt-3 float-end">
                                        <Button onClick={() => setLgShow(true)}>Buy Ticket</Button>
                                    </div>



                                </div>

                            </div>

                        </div>
                    </div>
                </div>


                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <h1>Raffle Ticket Form</h1>
                            <h6 className="text-secondary">Please fill this form to enter the raffle. Your ticket costs <b className="text-dark">₱{totalCost}</b>.</h6>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}

export default RaffleDetail
