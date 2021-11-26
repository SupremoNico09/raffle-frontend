import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import '../../../assets2/css/float.css';
import Form from './AddRaffle';
import Countdown from 'react-countdown';



function ViewRaffle(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const deleteRaffle = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-raffle/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest('.col').remove();
            }
            else if (res.data.status === 404) {
                swal("Success", res.data.message, "success");
                thisClicked.innerText = "Delete";
            }
        });

    }
    



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
                                <li className="list-group-item">Raffle Starts in:  <Countdown date={item.activate}>
                                    <Completionist />
                                </Countdown></li>
                                <li className="list-group-item">Ticket Price: ₱{item.ticket}</li>
                                <li className="list-group-item">Number of Tickets: {item.participant} </li>
                            </ul>
                            <div className="card-body ">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Link to={`/admin/view-raffle/${item.prize_name}`} className="btn btn-primary me-md-2 float-start">View</Link>
                                    <Link to={`edit-raffle/${item.id}`} className="btn btn-success me-md-2">Update</Link>
                                    <button className="btn btn-danger" onClick={(e) => deleteRaffle(e, item.id)} type="button">Delete</button>
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
            <div className="bgcolor raffle">
                <h2 className="title-style">Raffle</h2>
            </div>
            <div className="container">
              
                    <div className="row row-cols-1 row-cols-md-3 g-3">
                        {display_Raffledata}
                    </div>

                <Link to="#" onClick={handleShow} className="float">
                    <i className="bx bxs-coupon my-float"></i>
                </Link>
                <div className="label-container">
                    <div className="label-text">Add Raffle</div>
                    <i className="bx bx-play label-arrow"></i>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Raffle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form />
                    </Modal.Body>
                </Modal>
            </div>
        </div>

    )
}

export default ViewRaffle
