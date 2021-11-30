import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Wheel } from 'react-custom-roulette'
import axios from 'axios';
import swal from 'sweetalert'


function RaffleDraw(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [raffles, setRaffles] = useState([]);

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const [data, setData] = useState([]);




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

    const [winner, setWinner] = useState([]);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };



    const ticketsCount = tickets.length;






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
                                <h3>
                                    Grand Prize: {raffles.prize_name} <button className="btn btn-warning" onClick={handleSpinClick}>SPIN</button>
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

                                            var winners_data = {
                                                raffle_id: raffles.id,
                                                tracking_no: data[prizeNumber].option,
                                            }

                                            axios.post(`/api/post-winner`, winners_data).then(res => {
                                                if (res.data.status === 200) {

                                                }
                                                else if (res.data.status === 422) {
                                                    swal("No Winners", "", "error");
                                                }
                                            });

                                        }}
                                    />

                                </>
                            </div>
                            <div className="col-md-6">
                                <div className="card card-content">
                                    <h2>Winner: {winner}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                <h3 className="title-style">
                                    No Participants
                                </h3>
                            </div>
                            <div className="col-md-6 py-3">
                                <div className="card card-content">
                                    <h2>Winner: {winner}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
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
