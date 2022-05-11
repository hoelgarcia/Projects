import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams, Link} from 'react-router-dom';

const UpdateInventory = (props) => {
    const {_id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [units, setUnits] = useState("");
    const history = useHistory();
    const [error, setError] = useState({});
    useEffect(()=>{
        axios.get("http://localhost:8000/inventory/" + _id)
            .then(res=>{
                setTitle(res.data.title);
                setDescription(res.data.description);
                setUnits(res.data.units);
            })
            .catch(err=>
                console.log(err))
    },[]);
    const onUpdateHandler = (e) => {
        
            e.preventDefault();
            axios.patch("http://localhost:8000/inventory/" + _id,{
                title,
                description,
                units
            })
                .then(res=>{
                    console.log(res);
                    history.push("/")
                })
                .catch(err=>{
                    // console.log(err))
                    setError(err.response.data.err.errors);
                }
        )
    }

    return(
        <div>
            <h1>Update Inventory Item</h1>
            <form className='w-75 mx-auto' onSubmit={onUpdateHandler}>
                <div className="form-group">
                    <label htmlFor="title">Item Name:</label>
                    <input type="text" name='title' value={title} className='input-control' onChange={(e)=>{setTitle(e.target.value)}}/>
                    <br />
                    <span className='alert-danger'>{error.title && error.title.message}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Item Name:</label>
                    <textarea type="text" name='description' value={description} className='input-control' onChange={(e)=>{setDescription(e.target.value)}}/>
                    <br />
                    <span className='alert-danger'>{error.description && error.description.message}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="units">Units Available:</label>
                    <input type="number" value={units} name='units' className='input-control' onChange={(e)=>{setUnits(e.target.value)}}/>
                    <br />
                    <span className='alert-danger'>{error.units && error.units.message}</span>
                </div>
                <input type="submit" className='btn btn-primary' />
                <Link className='btn btn-success' to={`/`}>All Inventory</Link>
            </form>
        </div>
    )
}

export default UpdateInventory;