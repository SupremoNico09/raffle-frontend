import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


function Participants() {

    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);

    const participantsCount = tickets.length;

    useEffect(() => {

        axios.get(`/api/view-participants`).then(res => {
            if (res.data.status === 200) {
                setTickets(res.data.tickets);
                setLoading(false);
            }
        })

    }, []);

    const deleteParticipant = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-participant/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
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
        var display_Participantsdata = "";
        if (participantsCount) {
            display_Participantsdata = tickets.map((item) => {

                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.firstname} {item.lastname}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.city} {item.street}</td>
                        <td>
                            <Link to="" className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                            <button type="button" onClick={(e) => deleteParticipant(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>


                )
            });
        }
        else {
            display_Participantsdata =
                <div className="col-md-12">
                    <div>
                        <h6>There Are No Participants...</h6>
                    </div>

                </div>
        }
    }

    return (
        <div>
            <div className="bgcolor participant">
                <h2 className="title-style">Participants</h2>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-secondary">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display_Participantsdata}
                    </tbody>
                </table>
            </div>
        </div>

    )

}


export default Participants
