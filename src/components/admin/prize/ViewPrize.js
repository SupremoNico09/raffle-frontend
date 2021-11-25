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
        return <h4>Loading Categories...</h4>
    }
    else {
        viewprizes_HTMLTABLE =
            prizelist.map((item) => {
                return (
                    <tr key={item.id}>
                        <td className="border-0 align-middle">{item.id}</td>
                        <td className="border-0 align-middle px-5">{item.type}</td>
                        <td className="border-0 align-middle">{item.availability}</td>
                        <td className="border-0 align-middle">
                            <Link to={`edit-prize/${item.id}`} className="btn btn-success btn-sm">Edit</Link> &nbsp;
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
                    <h2 className="title-style">Categories</h2>
                </div>
                <div className="container">
                    <div className="px-4 px-lg-0">
                        <div className="pb-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="border-0 bg-light">
                                                            <div className="p-2 text-uppercase">
                                                                Id
                                                            </div>
                                                        </th>
                                                        <th scope="col" className="border-0 bg-light">
                                                            <div className="p-2 px-5 text-uppercase">
                                                                Type
                                                            </div>
                                                        </th>
                                                        <th scope="col" className="border-0 bg-light">
                                                            <div className="p-2 text-uppercase">
                                                                Availability
                                                            </div>
                                                        </th>
                                                        <th scope="col" className="border-0 bg-light">
                                                            <div className="p-2 text-uppercase">
                                                                Actions
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {viewprizes_HTMLTABLE}
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
        </div>
    )
}

export default ViewPrize
