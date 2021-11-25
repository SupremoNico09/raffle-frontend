import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import { Button, Modal } from 'react-bootstrap';
import Form from '../frontend/raffles/RaffleForm';

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
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Raffle</th>
                                        <th className="text-center">Ticket Price</th>
                                        <th className="text-center">Quantity</th>
                                        <th className="text-center">Total Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rafflelists.map((item, idx) => {
                                        totalRafflePrice += item.raffle.ticket * item.ticket_qty;
                                        return (
                                            <tr key={idx}>
                                                <td width="10%">
                                                    <img src={`http://localhost:8000/${item.raffle.image}`} alt={item.raffle.prize_name} width="50px" height="50px" />
                                                </td>
                                                <td>{item.raffle.prize_name}</td>
                                                <td width="15%" className="text-center">{item.raffle.ticket}</td>
                                                <td width="15%">
                                                    <div className="input-group">
                                                        <button type="button" onClick={() => { handleDecrement(item.id) }} className="input-group-text">-</button>
                                                        <div className="form-control text-center">{item.ticket_qty}</div>
                                                        <button type="button" onClick={() => { handleIncrement(item.id) }} className="input-group-text">+</button>
                                                    </div>
                                                </td>
                                                <td width="15%" className="text-center">{item.raffle.ticket * item.ticket_qty}</td>
                                                <td width="10%">
                                                    <button type="button" onClick={(e) => deleteListItem(e, item.id)} className="btn btn-danger btn-sm">Remove</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-md-8"></div>
                            <div className="col-md-4">
                                <div className="card card-body mt-3">
                                    <h4>Tickets Total:
                                        <span className="float-end">{totalRafflePrice}</span>
                                    </h4>
                                    <hr />
                                    <Button onClick={() => setLgShow(true)}>Buy Ticket</Button>
                                </div>
                            </div>
                        </div>
                </div>

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
            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {list_HTML}
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
