import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const AllInventory = (props) => {
    const[inventory, setInventory] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/inventory/findAll")
            .then(res=>{
                setInventory(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
    })
    
    const onDeleteHandler = (_id, arrIndex) =>{
        if (window.confirm("Are you sure you want to remove this from inventory?")){
        axios.delete(`http://localhost:8000/inventory/${_id}`)
            .then(res=>{
                // console.log(res)
                const copyState = [...inventory];
                copyState.splice(arrIndex,1)
                setInventory(copyState)
            })
            .catch(err=>
                console.log(err.response)
            )
        }
    }

    return(
        <div className='w-75 mx-auto'>
            <div>
            <Link to="/create/inventory" className="btn btn-dark">Create Inventory Item</Link>
            </div>
            <br />
            <div>
                <table className='table table-dark table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Description</th>
                            <th>Units Available</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inventory.map((item, i )=>{
                                return <tr key={i}>
                                            <td><Link to={`/inventory/${item._id}`}>{item.title}</Link></td>
                                            <td>{item.description}</td>
                                            <td>{item.units}</td>
                                            <td><Link to={`/update/inventory/${item._id}`} className='btn btn-primary'>Edit</Link> | <button className='btn btn-danger' onClick={()=>onDeleteHandler(item._id, i)}>Delete</button></td>
                                        </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllInventory;