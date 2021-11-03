import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';

function EditPrize(props) {

    const history = useHistory();
    const [prizeInput, setPrize] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);

    useEffect(() => {

        const prize_id = props.match.params.id;
        axios.get(`/api/edit-prize/${prize_id}`).then(res => {
            if (res.data.status === 200) {
                setPrize(res.data.prize);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-prize');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setPrize({ ...prizeInput, [e.target.name]: e.target.value });
    }

    const updatePrize = (e) => {
        e.preventDefault();

        const prize_id = props.match.params.id;
        const data = prizeInput;
        axios.put(`/api/update-prize/${prize_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                history.goBack();
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandatory", "", "error");
                setError(res.data.errors);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('admin/view-prize');
            }

        });
    }

    if (loading) {
        return <h4>Loading...</h4>
    }

    return (
        <div className="container px-4">
            <div className="container-fluid px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>
                            Edit Prize
                            <Link to="/admin/view-prize" className="btn btn-danger btn-sm float-end">Cancel</Link>
                        </h4>
                    </div>

                    <div className="card-body">
                        <form onSubmit={updatePrize}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-3 form-group mb-3">
                                        <label>Prize Type</label>
                                        <input type="text" name="type" onChange={handleInput} value={prizeInput.type} className="form-control" />
                                        <small className="text-danger">{error.type}</small>
                                    </div>
                                    <div className="col-md-3 form-group mb-3">
                                        <label>Enter Prize</label>
                                        <input type="text" name="prize_name" onChange={handleInput} value={prizeInput.prize_name} className="form-control" />
                                        <small className="text-danger">{error.prize_name}</small>
                                    </div>
                                    <div className="col-md-3 form-group mb-3">
                                        <label>Description</label>
                                        <textarea name="description" onChange={handleInput} value={prizeInput.description} className="form-control" />
                                    </div>
                                    <div className="col-md-1 form-group mb-3">
                                        <label>Availability</label>
                                        <select name="availability" onChange={handleInput} value={prizeInput.availability} className="form-control">
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-success px-4 float-end">Update</button>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default EditPrize
