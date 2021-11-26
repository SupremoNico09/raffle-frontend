import axios from 'axios';
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


function RaffleForm() {



    const history = useHistory();
    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        swal("Warning", "Login to go to Raffle Page", "error")
    }
    const [loading, setLoading] = useState(true);
    const [rafflelists, setRaffleLists] = useState([]);
    var totalRafflePrice = 0;


    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        street: '',
        house: '',
        city: '',
        zipcode: '',
    });

    const [error, setError] = useState([]);

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

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    }

    var ticketinfo_data = {
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        email: checkoutInput.email,
        phone: checkoutInput.phone,
        street: checkoutInput.street,
        house: checkoutInput.house,
        city: checkoutInput.city,
        zipcode: checkoutInput.zipcode,
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
                        value: totalRafflePrice,
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
                    history.push('/raffledrawlists');
                }
                else if (res.data.status === 422) {
                    swal("All Fields are Mandatory", "", "error");
                    setError(res.data.errors);
                }

            });
        });
    };
    //End PayPal

    const submitTicket = (e, payment_mode) => {
        e.preventDefault();

        var data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            email: checkoutInput.email,
            phone: checkoutInput.phone,
            street: checkoutInput.street,
            house: checkoutInput.house,
            city: checkoutInput.city,
            zipcode: checkoutInput.zipcode,
            payment_mode: payment_mode

        }



        switch (payment_mode) {
            case 'paypal':
                axios.post(`/api/validate-ticket`, data).then(res => {
                    if (res.data.status === 200) {

                        setError([]);
                        var myModal = new window.bootstrap.Modal(document.getElementById('paypalModal'));
                        myModal.show();
                    }
                    else if (res.data.status === 422) {
                        swal("All Fields are Mandatory", "", "error");
                        setError(res.data.errors);
                    }
                });
                break;

            default:
                break;
        }
    }


    if (loading) {
        return <h4>Loading Raffle Form...</h4>
    }




    return (

        <form>
            {rafflelists.map((item) => {
                totalRafflePrice += item.raffle.ticket * item.ticket_qty;
                return(
                    <div></div>
                )
            })}
            
            <div class="modal fade" id="paypalModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">PayPal Payment</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <PayPalButton style={{
                                shape: 'rect',
                                color: 'silver',
                                layout: 'horizontal',
                                label: 'paypal',
                            }}
                                createOrder={(data, actions) => createOrder(data, actions)}
                                onApprove={(data, actions) => onApprove(data, actions)}
                            />
                        </div>
                    </div>
                </div>
            </div>

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



            <div className="row">
                <label><h5>Address</h5></label>
                <div className="col-md-8 mb-3">
                    <label >Street</label>
                    <input type="text" name="street" onChange={handleInput} value={checkoutInput.street} className="form-control" id="validationDefault03" placeholder="Street" required />
                    <small className="text-danger">{error.street}</small>
                </div>
                <div className="col-md-4 mb-3">
                    <label>House No.</label>
                    <input type="text" name="house" onChange={handleInput} value={checkoutInput.house} className="form-control" id="validationDefault04" placeholder="House No." required />
                    <small className="text-danger">{error.house}</small>
                </div>
                <div className="col-md-9 mb-3">
                    <label >City</label>
                    <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" id="validationDefault03" placeholder="City" required />
                    <small className="text-danger">{error.city}</small>
                </div>
                <div className="col-md-3 mb-5">
                    <label>Zip Code</label>
                    <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" id="validationDefault05" placeholder="Zip" required />
                    <small className="text-danger">{error.zipcode}</small>
                </div>


                <label><h5>Payment Mode</h5></label>
                <div className="mb-4">
                    <div className="form-group">
                        <paypal type="button" className="btn btn-warning" onClick={(e) => submitTicket(e, 'paypal')}>PayPal</paypal>
                    </div>
                </div>
            </div>


            <div className="form-group">
                <div className="form-check mb-3 ">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                    <label className="form-check-label">
                        Agree to terms and conditions
                    </label>
                </div>
            </div>
        </form>

    )

}

export default RaffleForm
