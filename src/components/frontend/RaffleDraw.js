import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Wheel } from 'react-custom-roulette'
import axios from 'axios';
import swal from 'sweetalert'
import Wave from '../../assets2/img/wave1.png';
import { Button, Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';


function RaffleDraw(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [raffles, setRaffles] = useState([]);
    const [lgShow, setLgShow] = useState(false);

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const [data, setData] = useState([]);
    const [winner, setWinner] = useState([]);

    const [checkoutInput, setCheckoutInput] = useState({
        raffle_id: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
    });

    const [error, setError] = useState([]);


    useEffect(() => {

        let isMounted = true;

        const raffles_prize_name = props.match.params.prize_name;
        axios.get(`/api/drawparticipants/${raffles_prize_name}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    let options = []
                    res.data.tickets_data.tickets.forEach(element => {

                        options.push({
                            'option': element.tracking_no,
                        })

                    });

                    setData(options);
                    setTickets(res.data.tickets_data.tickets);
                    setRaffles(res.data.tickets_data.raffles);
                    setLoading(false);
                }
                else if (res.data.status === 400) {
                    swal("Warning", res.data.message, "");
                }
                else if (res.data.status === 404) {
                    history.push('/raffles');
                    swal("Warning", res.data.message, "error");
                }

            }

        });

        return () => {
            isMounted = false
        };


    }, [props.match.params.prize_name, history]);

    const handleSpin = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }


    const ticketsCount = tickets.length;


    var ticketinfo_data = {
        raffle_id: raffles.id,
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        email: checkoutInput.email,
        phone: checkoutInput.phone,
        payment_mode: 'Paid by Paypal',
        payment_id: '',

    }

    //PayPal Integration

    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM, });
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "PHP",
                        value: raffles.ticket,
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            console.log(details);
            ticketinfo_data.payment_id = details.id;

            axios.post(`/api/place-ticket`, ticketinfo_data).then(res => {
                if (res.data.status === 200) {
                    swal("Ticket Placed Successfully", res.data.message, "success");
                    setError([]);
                    history.goBack();
                }
                else if (res.data.status === 422) {
                    swal("All Fields are Mandatory", "", "error");
                    setError(res.data.errors);
                }

            });
        });
    };
    //End PayPal

    if (loading) {
        return <h4>Loading...</h4>
    }

    else {
        var view_raffle = "";
        if (ticketsCount) {
            return (
                <div className="raffle-draw">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 ">
                                <h3 className="title-style">
                                    Grand Prize: {raffles.prize_name}
                                </h3>

                                <>
                                    <Wheel
                                        mustStartSpinning={mustSpin}
                                        prizeNumber={prizeNumber}
                                        data={data}
                                        backgroundColors={["#ff8f43", "#70bbe0", "#0b3351", "#f9dd50"]}
                                        textColors={["white"]}
                                        outerBorderColor={"#eeeeee"}
                                        outerBorderWidth={10}
                                        innerBorderColor={"#30261a"}
                                        innerBorderWidth={0}
                                        innerRadius={0}
                                        radiusLineColor={"#eeeeee"}
                                        radiusLineWidth={8}
                                        fontSize={17}
                                        textDistance={60}
                                        onStopSpinning={() => {
                                            setMustSpin(false)
                                            setWinner(data[prizeNumber].option)
                                        }}
                                    />

                                </>
                            </div>
                            <div className="col-md-6 py-3">
                                <h3 className="subtitle-style">
                                    Ticket Price: {raffles.ticket} <Button onClick={() => setLgShow(true)} className="btn btn-dark rounded-pill py-2 btn-block">Buy Tickets</Button>
                                </h3>
                                <div className="card card-content">
                                    <h2>Winner: {winner}</h2>
                                </div>
                                <br />
                                <div className="card card-content">
                                    <h3>Participants</h3>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12 bg-white rounded shadow-sm mb-5">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="border-0 bg-light">
                                                                    <div className="p-2 text-uppercase">
                                                                        Ticket No.
                                                                    </div>
                                                                </th>
                                                                <th scope="col" className="border-0 bg-light">
                                                                    <div className="p-2 text-uppercase">
                                                                        Name
                                                                    </div>
                                                                </th>
                                                                <th scope="col" className="border-0 bg-light">
                                                                    <div className="p-2 text-uppercase">
                                                                        Email
                                                                    </div>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                tickets.map((item) => {
                                                                    return (
                                                                        <tr key={item.id}>
                                                                            <td className="bg-white text-dark">{item.tracking_no}</td>
                                                                            <td className="bg-white text-dark">{item.firstname} {item.lastname}</td>
                                                                            <td className="bg-white text-dark">{item.email}</td>
                                                                        </tr>
                                                                    )

                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={Wave} alt="" className="buttom-img" />
                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                <h1>Raffle Ticket Form</h1>
                                <h6 className="text-secondary">Please fill this form to enter the raffle. Raffle Ticket costs <b className="text-dark">{raffles.ticket}</b>.</h6>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <label><h5>Name</h5></label>

                                <div className="col-md-6 mb-3">
                                    <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" placeholder="First name" required />
                                    <small className="text-danger">{error.firstname}</small>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" placeholder="Last name" required />
                                    <small className="text-danger">{error.lastname}</small>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label><h5>Email</h5></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupPrepend2">@</span>
                                        </div>
                                        <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" id="validationDefaultUsername" placeholder="Email" aria-describedby="inputGroupPrepend2" required />
                                    </div>
                                    <small className="text-danger">{error.email}</small>
                                </div>

                                <div className="col-md-6 mb-5">
                                    <label><h5>Phone Number</h5></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupPrepend2">+63</span>
                                        </div>
                                        <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" id="validationDefaultUsername" placeholder="(000)-000-0000" aria-describedby="inputGroupPrepend2" required />

                                    </div>
                                    <small className="text-danger">{error.phone}</small>
                                </div>

                            </div>
                            <PayPalButton style={{
                                shape: 'rect',
                                color: 'silver',
                                layout: 'horizontal',
                                label: 'paypal',
                            }}
                                createOrder={(data, actions) => createOrder(data, actions)}
                                onApprove={(data, actions) => onApprove(data, actions)}
                            />
                        </Modal.Body>
                    </Modal>
                </div>
            )
        }

        else {
            view_raffle =
                <div className="raffle-draw">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 ">
                                <h3 className="title-style">
                                    Grand Prize: {raffles.prize_name}
                                </h3>

                                <h1>Buy Tickets Now!</h1>
                            </div>
                            <div className="col-md-6 py-3">
                                <h3 className="subtitle-style">
                                    Ticket Price: {raffles.ticket} <Button onClick={() => setLgShow(true)} className="btn btn-dark rounded-pill py-2 btn-block">Buy Tickets</Button>
                                </h3>

                                <div className="card card-content">
                                    <h2>Winner: {winner}</h2>
                                </div>
                                <br />
                                <div className="card card-content">
                                    <h3>Participants</h3>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12 bg-white rounded shadow-sm mb-5">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="border-0 bg-light">
                                                                    <div className="p-2 text-uppercase">
                                                                        Ticket No.
                                                                    </div>
                                                                </th>
                                                                <th scope="col" className="border-0 bg-light">
                                                                    <div className="p-2 text-uppercase">
                                                                        Name
                                                                    </div>
                                                                </th>
                                                                <th scope="col" className="border-0 bg-light">
                                                                    <div className="p-2 text-uppercase">
                                                                        Email
                                                                    </div>
                                                                </th>
                                                                <th scope="col" className="border-0 bg-light">
                                                                    <div className="p-2 text-uppercase">
                                                                        Ticket Qty
                                                                    </div>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <h6>No Participants</h6>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={Wave} alt="" className="buttom-img" />
                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                <h1>Raffle Ticket Form</h1>
                                <h6 className="text-secondary">Please fill this form to enter the raffle. Raffle Ticket costs <b className="text-dark">{raffles.ticket}</b>.</h6>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <label><h5>Name</h5></label>

                                <div className="col-md-6 mb-3">
                                    <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" placeholder="First name" required />
                                    <small className="text-danger">{error.firstname}</small>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" placeholder="Last name" required />
                                    <small className="text-danger">{error.lastname}</small>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label><h5>Email</h5></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupPrepend2">@</span>
                                        </div>
                                        <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" id="validationDefaultUsername" placeholder="Email" aria-describedby="inputGroupPrepend2" required />
                                    </div>
                                    <small className="text-danger">{error.email}</small>
                                </div>

                                <div className="col-md-6 mb-5">
                                    <label><h5>Phone Number</h5></label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="inputGroupPrepend2">+63</span>
                                        </div>
                                        <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" id="validationDefaultUsername" placeholder="(000)-000-0000" aria-describedby="inputGroupPrepend2" required />

                                    </div>
                                    <small className="text-danger">{error.phone}</small>
                                </div>

                            </div>
                            <PayPalButton style={{
                                shape: 'rect',
                                color: 'silver',
                                layout: 'horizontal',
                                label: 'paypal',
                            }}
                                createOrder={(data, actions) => createOrder(data, actions)}
                                onApprove={(data, actions) => onApprove(data, actions)}
                            />
                        </Modal.Body>
                    </Modal>
                </div>
        }
    }



    return (
        <div>
            {view_raffle}
        </div>

    )
}

export default RaffleDraw
