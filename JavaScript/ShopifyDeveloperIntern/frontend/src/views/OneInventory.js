import React, { useEffect,useState } from 'react';
import axios from "axios";
import { Link, useHistory, useParams } from 'react-router-dom';


const OneInventory = (props) => {
    const [inventory, setInventory] = useState({});
    const {_id} = useParams();
    const history = useHistory();

    useEffect(()=>{
        axios.get("http://localhost:8000/inventory/" + _id)
            .then(res=>{
                // console.log(res);
                setInventory(res.data)
            })
            .catch(err=>{
                console.log(err.response);
            })
    },[_id])

    const onDeleteHandler = () => {
        if (window.confirm("Are you sure you want to remove this from inventory?")){
            axios.delete(`http://localhost:8000/inventory/${_id}`)
            .then(res=>{
                // console.log(res)
                history.push("/");
            })
            .catch(err=>
                console.log(err.response)
            )
        }
    }

    return(
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{inventory.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Units Available: {inventory.units}</h6>
                <p className="card-text">Item Description: {inventory.description}</p>
                <Link className='btn btn-primary' to={`/inventory/update/${_id}`}>Edit</Link>
                <Link className='btn btn-danger' onClick={onDeleteHandler}>Delete</Link>
                <Link className='btn btn-success' to={`/`}>All Inventory</Link>
            </div>
        </div>
    )
}

export default OneInventory;