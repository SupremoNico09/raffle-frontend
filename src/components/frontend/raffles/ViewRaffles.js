import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import Wave from '../../../assets2/img/wave1.png';

function ViewRaffles(props) {


    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [raffle, setRaffle] = useState([]);
    const [prize, setPrize] = useState([]);

    const raffleCount = raffle.length;

    useEffect(() => {

        let isMounted = true;

        const prize_type = props.match.params.type;
        axios.get(`/api/fetchraffles/${prize_type}`).then(res => {
            if(isMounted)
            {
                if (res.data.status === 200) {
                    setRaffle(res.data.raffle_data.raffles);
                    setPrize(res.data.raffle_data.prizes);
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


    }, [props.match.params.type, history]);


    
    if (loading) {
        return <h4>Loading...</h4>
    }
    else {
        var showRafflePrizes = '';
        if (raffleCount) {


            showRafflePrizes = raffle.map((item, idx) => {
                return (
                    <div className="col-md-4" key={idx}>
                        <div className="card ">
                            <Link to={`/raffles/${prize.type}/${item.prize_name}`}>
                                <img src={`http://localhost:8000/${item.image}`} height="250px" className="card-img-top" alt={item.prize_id} />
                            </Link>

                            <div className="card-body">
                                <Link to={`/raffles/${prize.type}/${item.prize_name}`}>
                                    <h5>{item.prize_name}</h5>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                )
            });
        }
        else
        {
            showRafflePrizes = 
            <div className="col-md-12">
                <h4>No Raffles Available for {prize.type}</h4>
            </div>
        }
    }

    return (
        <div>
            <div className="buy-raffle">
                <div className="py-3">
                    <div className="container">
                    <h2 className="title-style">{prize.type}</h2>
                    </div>
                </div>
                <div className="py-3">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {showRafflePrizes}
                        </div>

                    </div>
                </div>
                <img src={Wave} alt="" className="buttom-img" />
            </div>
        </div>
    )
}

export default ViewRaffles
