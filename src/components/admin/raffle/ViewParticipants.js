import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'

function ViewParticipants(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [ticketitems, setTicketitems] = useState([]);
    const [raffles, setRaffles] = useState([]);




    useEffect(() => {

        let isMounted = true;

        const raffles_prize_name = props.match.params.prize_name;
        axios.get(`/api/fetchparticipants/${raffles_prize_name}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setTicketitems(res.data.ticketitems_data.ticketitems);
                    setRaffles(res.data.ticketitems_data.raffles);
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


    const ticketitemsCount = ticketitems.length;

    if (loading) {
        return <h4>Loading...</h4>
    }
    else {
        var view_participants = "";
        if (ticketitemsCount) {


            view_participants = ticketitems.map((item) => {

                return (

                    <tr key={item.id}>
                        <td>{item.tickets.tracking_no}</td>
                        <td>{item.tickets.firstname} {item.tickets.lastname}</td>
                        <td>{item.ticket_id}</td>
                        <td>{item.qty}</td>
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
            <div className="py-3">
                <div className="container">
                    <h3>Participants in {raffles.prize_name}</h3>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Ticket No.</th>
                            <th>Name</th>
                            <th>Ticket Id</th>
                            <th>Ticket Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {view_participants}
                    </tbody>
                </table>

            </div>
        </div>
    )



}

export default ViewParticipants
