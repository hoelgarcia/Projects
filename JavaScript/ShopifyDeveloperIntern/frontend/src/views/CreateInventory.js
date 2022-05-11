import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const CreateInventory = (props) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        units: null
    })
    const [error, setError] = useState({});
    const history = useHistory();
    const onChangeHandler =  (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/inventory/create", form)
            .then(res=>{
                console.log(res)
                history.push("/")
            })
            .catch(err=>{
                // console.log(err.response.data.err.errors)
                setError(err.response.data.err.errors)
            })

    }
    return(
        <div>
            <h1>Add a new Inventory Item</h1>
            <form className='w-75 mx-auto' onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="title">Item Name:</label>
                    <input onChange={onChangeHandler} type="text" name='title' className='input-control'/>
                    <br />
                    <span className='alert-danger'>{error.title && error.title.message}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Item Name:</label>
                    <textarea onChange={onChangeHandler} name='description' className='input-control'/>
                    <br />
                    <span className='alert-danger'>{error.description && error.description.message}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="units">Units Available:</label>
                    <input onChange={onChangeHandler} type="number" name='units' className='input-control'/>
                    <br />
                    <span className='alert-danger'>{error.units && error.units.message}</span>
                </div>
                <input type="submit" className='btn btn-primary' />
                <Link className='btn btn-success' to={`/`}>All Inventory</Link>
            </form>
        </div>
    )
}

export default CreateInventory;