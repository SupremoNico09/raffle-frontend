import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Wheel } from 'react-custom-roulette'
import axios from 'axios';
import swal from 'sweetalert'
import Countdown from 'react-countdown';


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
        var view_raffledraw = "";
        if (ticketitemsCount) {


            view_raffledraw = ticketitems.map((item) => {

                return (

                    <tr key={item.id}>
                        <td className="bg-white text-dark">{(item.tickets.tracking_no)}</td>
                        <td className="bg-white text-dark">{item.tickets.firstname} {item.tickets.lastname}</td>
                        <td className="bg-white text-dark">{item.tickets.email}</td>
                        <td className="bg-white text-dark">{item.qty}</td>
                    </tr>

                )
            });


        }


        else {
            view_raffledraw =
                <div className="col-md-12">
                    <h4>There are no Participants for {raffles.prize_name}</h4>
                </div>
        }
    }



    return (
        <div>
            <div className="py-3" >
                <div className="container">
                    <h3>Raffle Draw for {raffles.prize_name}</h3>
                </div>
                <div className="card-body col-md-6 float-end">

                    <h3>Participants</h3>
                    <table className="table table-bordered table-warning table-sm">

                        <thead>
                            <tr>
                                <th>Ticket No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Ticket Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {view_raffledraw}
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="container">
                <h1>Raffle Starts: <Countdown date={Date.now() + 5000} onComplete={handleSpin}>
                </Countdown>
                </h1>
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
                <div>
                    <h1>Winner: {winner}</h1>
                </div>
            </div>


        </div>

    )
}

export default RaffleDraw
