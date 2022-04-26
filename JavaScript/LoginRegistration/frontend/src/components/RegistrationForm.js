import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    const [formErrors, setFormErrors] = useState({});
    const history = useHistory();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const formInfo = { email, password, confirm, firstName, lastName, birthday, profilePicture};
        axios.post("http://localhost:8000/api/users/register", formInfo, {withCredentials: true})
        .then(res => {
            console.log("res after registering", res)
            if(res.data.errors){
                setFormErrors(res.data.errors)
            }else{
                history.push("/dashboard")
            }
        })
        .catch(err => {
            console.log("err after register", err)
        })
    }

    return(
    <div className="container w-100">
        <h3>Register</h3>
        <div className="row">
            <div className="col">
                <form onSubmit={onSubmitHandler}>
                    <div className="from-group">
                        <label>First Name:</label>
                        <input type="text" className="form-control" name="firstName" onChange={(e) => setFirstName(e.target.value)}/>
                        <p className="text-danger">{formErrors.firstName?.message}</p>
                    </div>
                    <div className="from-group">
                        <label>Last Name:</label>
                        <input type="text" className="form-control" name="lastName" onChange={(e) => setLastName(e.target.value)}/>
                        <p className="text-danger">{formErrors.lastName?.message}</p>
                    </div>
                    <div className="from-group">
                        <label>DOB:</label>
                        <input type="date" className="form-control" name="birthday" onChange={(e) => setBirthday(e.target.value)}/>
                        <p className="text-danger">{formErrors.birthday?.message}</p>
                    </div>
                    <div className="from-group">
                        <label>Picture:</label>
                        <input type="text" className="form-control" name="profiePicture" placeholder="URL required" onChange={(e) => setProfilePicture(e.target.value)}/>
                        <p className="text-danger">{formErrors.profilePicture?.message}</p>
                    </div>
                    <div className="from-group">
                        <label>Email:</label>
                        <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)}/>
                        <p className="text-danger">{formErrors.email?.message}</p>
                    </div>
                    <div className="from-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)}/>
                        <p className="text-danger">{formErrors.password?.message}</p> 
                    </div>
                    <div className="from-group">
                        <label>Confirm Password:</label>
                        <input type="password" className="form-control" name="confirm" onChange={(e) => setConfirm(e.target.value)}/>
                        <p className="text-danger">{formErrors.confirm?.message}</p> 
                    </div>
                    <input type="submit" value="Register" className="btn btn-secondary mt-3" />
                </form>
            </div>
        </div>
    </div>
    );
};

export default RegistrationForm;