import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


function ViewPrize() {

    const [loading, setLoading] = useState(true);
    const [prizelist, setPrizelist] = useState([]);

    useEffect(() => {

        axios.get('/api/view-prize').then(res => {
            // console.log(res.data.category);
            if (res.status === 200) {
                setPrizelist(res.data.prize)
            }
            setLoading(false);

        });


    }, []);


    const deletePrize = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-prize/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Success", res.data.message, "success");
                thisClicked.innerText = "Delete";
            }
        });

    }

    var viewprizes_HTMLTABLE = "";
    if (loading) {
        return <h4>Loading Prizes...</h4>
    }
    else {
        viewprizes_HTMLTABLE =
            prizelist.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.type}</td>
                        <td>{item.availability}</td>
                        <td>
                            <Link to={`edit-prize/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                        </td>
                        <td>
                            <button type="button" onClick={(e) => deletePrize(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                )
            });
    }


    return (
        <div>
            <div>
                <div className="bgcolor prize">
                    <h2 className="title-style">Prizes</h2>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Availability</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewprizes_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewPrize
