import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';

function EditRaffle(props) 
{
    const history = useHistory();
    const [prizelist, setPrizelist] = useState([]);
    const [raffleInput, setRaffle] = useState({
        raffle_prize: '',
        ticket: '',
        participant: '',
        description: '',
    });

    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setRaffle({ ...raffleInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }

    useEffect(() => {

        axios.get(`/api/all-prize`).then(res => {
            if (res.data.status === 200) {
                setPrizelist(res.data.prize);
            }
        });

        const raffle_id = props.match.params.id
        axios.get(`api/edit-raffle/${raffle_id}`).then(res => {
            if(res.data.status === 200)
            {
                setRaffle(res.data.raffle);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/admin/view-raffle');
            }
            setLoading(false);
        })
    }, [props.match.params.id, history]);

    const updateRaffle = (e) => {
        e.preventDefault();

        const raffle_id = props.match.params.id
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('raffle_prize', raffleInput.raffle_prize);
        formData.append('ticket', raffleInput.ticket);
        formData.append('participant', raffleInput.participant);
        formData.append('description', raffleInput.description);

        axios.post(`/api/update-raffle/${raffle_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
            }
            else if (res.data.status === 422) {
                swal("All Fields are Mandatory", "", "error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("All Fields are Mandatory",res.data.message, "error");
                history.push('/admin/view-raffle');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading...</h4>
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Edit Raffle
                        <Link to="/admin/view-raffle" className="btn btn-primary btn-sm float-end">View Raffle</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateRaffle} encType="multipart/form-data">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-4 form-group mb-3">
                                    <label>Select Prizes</label>
                                    <select name="raffle_prize" onChange={handleInput} value={raffleInput.raffle_prize} className="form-control" >
                                        {
                                            prizelist.map((item) => {
                                                return (
                                                    <option value={item.prize_name} key={item.id}>{item.prize_name}</option>
                                                )
                                            })
                                        }

                                    </select>
                                    <small className="text-danger">{errorlist.raffle_prize}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Ticket Price</label>
                                    <input type="text" name="ticket" onChange={handleInput} value={raffleInput.ticket} className="form-control" />
                                    <small className="text-danger">{errorlist.ticket}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Max No. of Participants</label>
                                    <input type="text" name="participant" onChange={handleInput} value={raffleInput.participant} className="form-control" />
                                    <small className="text-danger">{errorlist.participant}</small>
                                </div>
                                <div className="col-md-4 form-group mb-3">
                                    <label>Add Description</label>
                                    <input type="text" name="description" onChange={handleInput} value={raffleInput.description} className="form-control" />
                                </div>
                                <div className="col-md-8 form-group mb-3">
                                    <label>Add Image</label>
                                    <input type="file" name="image" onChange={handleImage} className="form-control" />
                                    <img src={`http://localhost:8000/${raffleInput.image}`} width="50px" alt="changeImg" />
                                    <small className="text-danger">{errorlist.image}</small>
                                    
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success px-4 float-end">Update Raffle</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default EditRaffle
