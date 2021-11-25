import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import { Button, Modal } from 'react-bootstrap';
import Form from '../frontend/raffles/RaffleForm';
import Wave from '../../assets2/img/wave1.png';
import Shop from '../../assets2/img/addtocart.svg';

function RaffleList() {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [rafflelists, setRaffleLists] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    var totalRafflePrice = 0;

    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        swal("Warning", "Login to go to Raffle Page", "error")
    }

    useEffect(() => {

        let isMounted = true;


        axios.post(`/api/rafflelists`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {

                    setRaffleLists(res.data.rafflelists);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    history.push('/raffles');
                    swal("Warning", res.data.message, "error")
                }

            }

        });

        return () => {
            isMounted = false
        };
    }, [history]);

    const deleteListItem = (e, rafflelists_id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Removing";

        axios.delete(`/api/delete-rafflelistitem/${rafflelists_id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", "Raffle Item Removed", "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Remove";
            }
        });
    }

    const handleDecrement = (rafflelists_id) => {
        setRaffleLists(rafflelists =>
            rafflelists.map((item) =>
                rafflelists_id === item.id ? { ...item, ticket_qty: item.ticket_qty - (item.ticket_qty > 1 ? 1 : 0) } : item
            )
        );
        updateRaffleListQuantity(rafflelists_id, "dec");
    }

    const handleIncrement = (rafflelists_id) => {
        setRaffleLists(rafflelists =>
            rafflelists.map((item) =>
                rafflelists_id === item.id ? { ...item, ticket_qty: item.ticket_qty + (item.ticket_qty < 10 ? 1 : 0) } : item
            )
        );
        updateRaffleListQuantity(rafflelists_id, "inc");
    }

    function updateRaffleListQuantity(rafflelists_id, scope) {

        axios.put(`/api/list-updatequantity/${rafflelists_id}/${scope}`).then(res => {
            if (res.data.status === 200) {
                // swal("Success",res.data.message,"success")
            }
        });

    }

    if (loading) {
        return <h4>Loading Raffle Lists...</h4>
    }

    var list_HTML = '';
    if (rafflelists.length > 0) {
        list_HTML = <div>
            <div className="raffle-list">
                <br /><br />
                <div className="container text-white py-1 text-center">
                    <h2 className="display-4">
                        My Raffle List
                    </h2>
                </div>
                <div className="px-4 px-lg-0">
                    <div className="pb-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

                                    {/* SHOPPING CART TABLE */}
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-3 text-uppercase">
                                                            Raffle
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 text-uppercase">
                                                            Ticket Price
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 text-uppercase">
                                                            Quantity
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 text-uppercase">
                                                            Total Price
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 text-uppercase">
                                                            Remove
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rafflelists.map((item, idx) => {
                                                    totalRafflePrice += item.raffle.ticket * item.ticket_qty;
                                                    return (
                                                        <tr>
                                                            <th scope="row" className="border-0">
                                                                <div className="p-2">
                                                                    <img src={`http://localhost:8000/${item.raffle.image}`} alt={item.raffle.prize_name} width="70" className="img-fluid rounded shadow-sm" />
                                                                    <div className="ml-3 d-inline-block align-middle">
                                                                        <div className="p-4">
                                                                            <h5 className="mb-1">
                                                                                <Link to="#" className="text-dark d-inline-block align-middle">
                                                                                    {item.raffle.prize_name}
                                                                                </Link>
                                                                            </h5>
                                                                            <span className="text-muted font-weight-normal font-italic">Category:</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <td className="border-0 align-middle">
                                                                <strong>{item.raffle.ticket}</strong>
                                                            </td>
                                                            <td className="border-0 align-middle">
                                                                <div className="input-group">
                                                                    <button type="button" onClick={() => { handleDecrement(item.id) }}
                                                                        className="input-group-text">-</button>
                                                                    <div className="form-control text-center">{item.ticket_qty}</div>
                                                                    <button type="button" onClick={() => { handleIncrement(item.id) }}
                                                                        className="input-group-text">+</button>
                                                                </div>
                                                            </td>
                                                            <td className="border-0 align-middle">
                                                                <strong>{item.raffle.ticket * item.ticket_qty}</strong>
                                                            </td>
                                                            <td className="border-0 align-middle">
                                                                <Link to="#" className="text-dark" >
                                                                    <i className='bx bxs-trash' onClick={(e) => deleteListItem(e, item.id)}></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-5 p-4 bg-white rounded shadow-sm">
                                <div className="col-lg-6">
                                    <div className="imggift">
                                        <img src={Shop} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                                    <div className="p-4">
                                        {/* <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p> */}
                                        <ul className="list-unstyled mb-4">
                                            {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>$390.00</strong></li>                              */}
                                            <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                                <h5 className="font-weight-bold">{totalRafflePrice}</h5>
                                            </li>
                                        </ul>
                                        <Button onClick={() => setLgShow(true)} className="btn btn-dark rounded-pill py-2 btn-block">Proceed to checkout</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={Wave} alt="" className="buttom-img" />
            </div>
        </div >

    }
    else {
        list_HTML = <div>
            <div className="rafflelists rafflelists-body py-5 text-center shadow-sm">
                <h4>Your Raffle Lists is Empty</h4>
            </div>
        </div>
    }

    return (
        <div>
            {list_HTML}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h1>Raffle Ticket Form</h1>
                        <h6 className="text-secondary">Please fill this form to enter the raffle. Your Raffle Tickets costs <b className="text-dark">₱{totalRafflePrice}</b>.</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form />
                </Modal.Body>
            </Modal>
        </div>


    )
}

export default RaffleList;
