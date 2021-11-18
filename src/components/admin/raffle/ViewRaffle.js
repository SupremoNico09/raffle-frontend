import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

function ViewRaffle() {

    const [loading, setLoading] = useState(true);
    const [viewRaffle, setRaffle] = useState([]);

    const raffleCount = viewRaffle.length;


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
                            <img src={`http://localhost:8000/${item.image}`} height="200px" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.prize_name}</h5>
                                <p className="card-text">{item.description}</p>
                            </div>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Prize Category: {item.prizes.type}</li>
                                <li className="list-group-item">Ticket Price: ₱{item.ticket}</li>
                                <li className="list-group-item">Number of Participant: {item.participant} <Link to='/admin/view-participants' className="btn btn-primary me-md-2 float-start">View</Link></li>
                            </ul>
                            <div className="card-body ">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Link to='/admin/raffle-draw' className="btn btn-primary me-md-2 float-start">Draw</Link>
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
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Raffle Lists
                        <Link to="/admin/add-raffle" className="btn btn-primary btn-sm float-end">Add Raffle</Link>
                    </h4>
                </div>


                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {display_Raffledata}
                </div>




            </div>
        </div>
    )
}

export default ViewRaffle
