import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function ViewParticipants(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [raffles, setRaffles] = useState([]);




    useEffect(() => {

        let isMounted = true;

        const raffles_prize_name = props.match.params.prize_name;
        axios.get(`/api/fetchparticipants/${raffles_prize_name}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setTickets(res.data.tickets_data.tickets);
                    setRaffles(res.data.tickets_data.raffles);
                    setLoading(false);
                }
                else if (res.data.status === 400) {
                    swal("Warning", res.data.message, "");
                }
                else if (res.data.status === 404) {
                    history.push('/admin/view-raffle');
                    swal("Warning", res.data.message, "error");
                }

            }

        });

        return () => {
            isMounted = false
        };


    }, [props.match.params.prize_name, history]);


    const ticketsCount = tickets.length;

    if (loading) {
        return <h4>Loading...</h4>
    }
    else {
        var view_participants = "";
        if (ticketsCount) {


            view_participants = tickets.map((item) => {

                return (

                    <tr key={item.id}>
                        <td className="border-0 align-middle">{item.tracking_no}</td>
                        <td className="border-0 align-middle">{item.firstname} {item.lastname}</td>
                        <td className="border-0 align-middle">{item.email}</td>
                        <td className="border-0 align-middle">{item.id}</td>
                    </tr>

                )
            });


        }


        else {
            view_participants =
                <div className="col-md-12">
                    <h4>There are no Participants for {raffles.prize_name}</h4>
                </div>
        }
    }



    return (
        <div>
            <div className="bgcolor raffle">
                <h2 className="title-style">Participants in {raffles.prize_name}</h2>
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
                                                {view_participants}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                                    <Link to={`/admin/raffle-draw/${raffles.prize_name}`} className="btn btn-primary me-md-2 float-start">Begin Raffle</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default ViewParticipants
