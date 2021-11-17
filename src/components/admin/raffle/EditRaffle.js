import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';

function EditRaffle(props) 
{
    const history = useHistory();
    const [prizelist, setPrizelist] = useState([]);
    const [raffleInput, setRaffle] = useState({
        prize_id:'',
        prize_name: '',
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
        formData.append('prize_id', raffleInput.prize_id);
        formData.append('prize_name', raffleInput.prize_name);
        formData.append('ticket', raffleInput.ticket);
        formData.append('participant', raffleInput.participant);
        formData.append('description', raffleInput.description);

        axios.post(`/api/update-raffle/${raffle_id}`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                history.goBack();
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
                <div className="card-header text-warning">
                    <h4>
                        Edit Raffle
                        <Link to="/admin/dashboard" className="btn btn-danger btn-sm float-end">Cancel</Link>
                    </h4>
                </div>

                <div className="card-body">
                    <form onSubmit={updateRaffle} encType="multipart/form-data">
                        <div className="form-group">
                            <div className="row">



                                <div className="mb-3">
                                    <h4>
                                        Prize Info
                                    </h4>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Select Prizes Category:</label>
                                            <div className="input-group mb-3">
                                                <select name="prize_id" onChange={handleInput} value={raffleInput.prize_id} className="form-select" id="inputGroupSelect01">
                                                    <option>Choose Prize Types...</option>
                                                    {
                                                        prizelist.map((item) => {
                                                            return (
                                                                <option value={item.id} key={item.id}>{item.type}</option>
                                                            )
                                                        })
                                                    }


                                                </select>
                                                <small className="text-danger">{errorlist.prize_id}</small>
                                                <Link to="/admin/add-prize" className="btn btn-primary">Add Category</Link>
                                            </div>

                                        </div>
                                        <div className="col-md-6 form-group mb-3">
                                            <label>Enter Prize:</label>
                                            <input type="text" name="prize_name" onChange={handleInput} value={raffleInput.prize_name} className="form-control" />
                                            <span className="text-danger"></span>
                                            <small className="text-danger">{errorlist.prize_name}</small>
                                        </div>


                                        <label>Change Image: <img src={`http://localhost:8000/${raffleInput.image}`}height="35px"  width="45px" alt="changeImg" /></label>
                                        <div className="input-group mb-3">
                                            <input type="file" name="image" onChange={handleImage} className="form-control" />
                                            <label className="input-group-text">Upload Prize Image</label>
                                            
                                        </div>
                                        
                                        <small className="text-danger">{errorlist.image}</small>
                                    </div>
                                </div>


                                <hr></hr>

                                <h4>
                                    Tickets and Participants Info
                                </h4>


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
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Add Description</span>
                                    <textarea type="text" name="description" onChange={handleInput} value={raffleInput.description} className="form-control" aria-label="With textarea"></textarea>
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
