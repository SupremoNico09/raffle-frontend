import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useHistory } from 'react-router-dom'
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
            if(isMounted)
            {
                if (res.data.status === 200) {
                    setRaffles(res.data.participants_data.raffles);
                    setTicketitems(res.data.participants_data.ticketitems);
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

    if (loading) {
        return <h4>Loading...</h4>
    }

    return (
        <div>
            <div className="py-3">
                <div className="container">
                    <h6>Participants</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewParticipants
