import axios from 'axios';
import React, { useEffect, useState } from 'react'
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
                        <td className="border-0 align-middle">{item.id}</td>
                        <td className="border-0 align-middle">{item.firstname} {item.lastname}</td>
                        <td className="border-0 align-middle">{item.email}</td>
                        <td className="border-0 align-middle">{item.phone}</td>
                        <td className="border-0 align-middle">
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
            <div className="container">
                <div className="px-4 px-lg-0">
                    <div className="pb-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 text-uppercase">
                                                            Id
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-5 text-uppercase">
                                                            Full Name
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 text-uppercase">
                                                            Email
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 text-uppercase">
                                                            Phone
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 text-uppercase">
                                                            Actions
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {display_Participantsdata}
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

    )

}


export default Participants
