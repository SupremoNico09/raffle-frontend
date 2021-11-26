import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Wheel } from 'react-custom-roulette'
import axios from 'axios';
import swal from 'sweetalert'
import Countdown from 'react-countdown';
import Wave from '../../assets2/img/wave1.png';


function RaffleDraw(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [ticketitems, setTicketitems] = useState([]);
    const [raffles, setRaffles] = useState([]);

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const [data, setData] = useState([]);
    const [winner, setWinner] = useState([]);




    useEffect(() => {

        let isMounted = true;

        const raffles_prize_name = props.match.params.prize_name;
        axios.get(`/api/fetchparticipants/${raffles_prize_name}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    let options = []
                    res.data.ticketitems_data.ticketitems.forEach(element => {
                        options.push({
                            'option': element.tickets.tracking_no.repeat(element.qty),
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


    const ticketitemsCount = ticketitems.length;



    if (loading) {
        return <h4>Loading...</h4>
    }

    else {
        var view_raffle = "";
        if (ticketitemsCount) {
            return (
                <div className="raffle-draw">
                    <div className="container">
                        <h2 className="title-style">
                            Raffle Draw for {raffles.prize_name}
                        </h2>
                        <div className="row">
                            <div className="col-md-6">
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
                            <div className="col-md-6">
                                <h3 className="subtitle-style">
                                    Raffle Starts in: <Countdown date={raffles.activate} onComplete={handleSpin}>
                                    </Countdown>
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
                                                            {
                                                                ticketitems.map((item) => {
                                                                    return (
                                                                        <tr key={item.id}>
                                                                            <td className="bg-white text-dark">{item.tickets.tracking_no}</td>
                                                                            <td className="bg-white text-dark">{item.tickets.firstname} {item.tickets.lastname}</td>
                                                                            <td className="bg-white text-dark">{item.tickets.email}</td>
                                                                            <td className="bg-white text-dark">{item.qty}</td>
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
                </div>
            )
        }

        else {
            view_raffle =
                <div className="col-md-12">
                    <h4>There are no Participants for {raffles.prize_name}</h4>
                </div>
        }
    }



    return (
        { view_raffle }
    )
}

export default RaffleDraw
