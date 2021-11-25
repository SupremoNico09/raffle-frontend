import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Wheel } from 'react-custom-roulette'
import axios from 'axios';
import swal from 'sweetalert'

function RaffleDraw(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [ticketitems, setTicketitems] = useState([]);
    const [raffles, setRaffles] = useState([]);

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const [data, setData] = useState([]);
    const [winner, setWinner] = useState([]);


    // const totalTickets = ticketitems.qty * ticketitems.tickets.tracking_no;

    useEffect(() => {

        let isMounted = true;

        const raffles_prize_name = props.match.params.prize_name;
        axios.get(`/api/fetchparticipants/${raffles_prize_name}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    let options = []
                    res.data.ticketitems_data.ticketitems.forEach(element => {
                        options.push({
                            'option': element.tickets.tracking_no,
                        })
                    });
                    setData(options);
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




    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    if (loading) {
        return <h4>Loading...</h4>
    }



    return (
        <div>
            <div className="py-2" >
                <div className="container">
                    <div>
                        <h3>Raffle Draw for {raffles.prize_name}</h3>
                    </div>


                    <div className="row">
                        <div className="col-md-5">
                            <div className="card h-80" >
                                <img src={`http://localhost:8000/${raffles.image}`} height="330px" className="card-img-top" alt="..." />
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><h2>Winner: {winner}</h2></li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-md-2">
                            <button onClick={handleSpinClick} className="btn btn-primary btn-lg">SPIN</button>
                        </div>

                        <div className="col-md-5">

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






                    </div>



                </div>



            </div>

        </div>
    )


}

export default RaffleDraw
