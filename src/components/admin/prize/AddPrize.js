import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function AddPrize() {

    const history = useHistory();
    const [prizeInput, setPrize] = useState({
        type: '',
        prize_name: '',
        description: '',
        availability: 'Yes',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setPrize({ ...prizeInput, [e.target.name]: e.target.value })
    }

    const submitPrize = (e) => {
        e.preventDefault();

        const data = {
            type: prizeInput.type,
            prize_name: prizeInput.prize_name,
            description: prizeInput.description,
            availability: prizeInput.availability,

        }

        axios.post('/api/store-prize', data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                document.getElementById('PRIZE_FORM').reset();
                history.push('/admin/view-prize');
            }
            else if (res.data.status === 400) {
                setPrize({ ...prizeInput, error_list: res.data.errors });
            }
        });

    }


    return (


        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>
                        Add Prizes
                        <Link to="/admin/view-prize" className="btn btn-primary btn-sm float-end">View Prizes</Link>
                    </h4>
                </div>

                <div className="card-body">
                    <form onSubmit={submitPrize} id="PRIZE_FORM">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-3 form-group mb-3">
                                    <label>Prize Type</label>
                                    <input type="text" name="type" onChange={handleInput} value={prizeInput.type} className="form-control" />
                                    <span className="text-danger">{prizeInput.error_list.type}</span>
                                </div>
                                <div className="col-md-3 form-group mb-3">
                                    <label>Enter Prize</label>
                                    <input type="text" name="prize_name" onChange={handleInput} value={prizeInput.prize_name} className="form-control" />
                                    <span className="text-danger">{prizeInput.error_list.prize_name}</span>
                                </div>
                                <div className="col-md-3 form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={prizeInput.description} className="form-control" />
                                </div>

                            </div>
                        </div>

                        <button type="submit" className="btn btn-success px-4 float-end">Add Prize</button>
                    </form>
                </div>


            </div>
        </div>


    )
}

export default AddPrize
