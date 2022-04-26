import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginErrors, setLoginErrors] = useState("");
    const history = useHistory();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const formInfo = { email, password }
        axios.post("http://localhost:8000/api/users/login", formInfo, {withCredentials: true})
            .then(res =>{
                console.log("response when logging in!", res)
                if(res.data.error){
                    setLoginErrors(res.data.error)
                }else{
                    history.push("/dashboard")
                }
            })
            .catch(err => console.log("err when logging in: ", err))
    }


    return(
        <div>
                <form onSubmit={onSubmitHandler} className="w-75">
                    <h3>Login Here</h3>
                    <div className="form-group">
                        <label htmlFor="" className="form-label">Email:</label>
                        <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="form-label">Password:</label>
                        <input type="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <p className="text-danger">{loginErrors}</p>

                    <input type="submit" value="Login" className="btn btn-secondary mt-3" />
                </form>
        </div>
    );
};

export default LoginForm;