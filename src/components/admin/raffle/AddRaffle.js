import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import DateTimePicker from 'react-datetime-picker'


function AddRaffle() {

    const history = useHistory();
    const [prizelist, setPrizelist] = useState([]);
    const [raffleInput, setRaffle] = useState({
        prize_id: '',
        prize_name: '',
        ticket: '',
        participant: '',
        description: '',
    });

    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);
    



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

    }, []);

    const submitRaffle = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('prize_id', raffleInput.prize_id);
        formData.append('prize_name', raffleInput.prize_name);
        formData.append('ticket', raffleInput.ticket);
        formData.append('participant', raffleInput.participant);
        formData.append('description', raffleInput.description);

        axios.post(`/api/store-raffle`, formData).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setRaffle({
                    ...raffleInput,
                    prize_id: '',
                    prize_name: '',
                    ticket: '',
                    participant: '',
                    description: '',
                });
                setError([]);
                history.push('/admin/view-raffle');
            }
            else if (res.data.status === 422) {
                swal("All Fields are Mandatory", "", "error");
                setError(res.data.errors);
            }
        });
    }

    

    return (



        <div>
            <form onSubmit={submitRaffle} encType="multipart/form-data">
                <div className="form-group">
                    <div className="row">



                        <div className="mb-3">
                            <h4>
                                Prize Info
                            </h4>

                            <div className="row">
                                <div className="col-md-12">
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
                                <div className="col-md-12 form-group mb-3">
                                    <label>Enter Prize:</label>
                                    <input type="text" name="prize_name" onChange={handleInput} value={raffleInput.prize_name} className="form-control" />
                                    <span className="text-danger"></span>
                                    <small className="text-danger">{errorlist.prize_name}</small>
                                </div>


                                <label>Add Image:</label>
                                <div className="input-group mb-3">
                                    <input type="file" name="image" onChange={handleImage} className="form-control" />
                                </div>
                                <small className="text-danger">{errorlist.image}</small>
                            </div>
                        </div>


                        <hr></hr>

                        <h4>
                            Tickets and Participants Info
                        </h4>


                        <div className="col-md-6 form-group mb-3">
                            <label>Ticket Price</label>
                            <input type="text" name="ticket" onChange={handleInput} value={raffleInput.ticket} className="form-control" />
                            <small className="text-danger">{errorlist.ticket}</small>
                        </div>
                        <div className="col-md-6 form-group mb-3">
                            <label>Max No. of Participants</label>
                            <input type="text" name="participant" onChange={handleInput} value={raffleInput.participant} className="form-control" />
                            <small className="text-danger">{errorlist.participant}</small>
                        </div>
                        <div className="input-group mb-4">
                            <label>Set Date and Time to start Raffle</label>
                            <DateTimePicker
                                name="activate"
                                // onChange={handleActivate}
                                // value={activate}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Add Description</span>
                            <textarea type="text" name="description" onChange={handleInput} value={raffleInput.description} className="form-control" aria-label="With textarea"></textarea>
                        </div>



                    </div>
                </div>

                <button type="submit" className="btn btn-success px-4 float-end">Create Raffle</button>
            </form>
        </div>
    )
}

export default AddRaffle
