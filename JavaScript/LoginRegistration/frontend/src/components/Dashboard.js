import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import dateFormat from 'dateformat';


const Dashboard = (props) => {
    const history = useHistory();
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials: true})
        .then(res => {
            console.log("res when getting logged in user", res)
            if(res.data.results){
                setLoggedInUser(res.data.results)
            }
        })
        .catch(err => {
            console.log("err when getting logged in user", err)
            history.push("/")
        })
    }, [])

    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
            .then(res => {
                history.push("/")
            })
            .catch(err => {
                console.log("errr logging out", err)
            })
    }

    return (
            <div class="card container w-50" >
                <div class="card-body">
                    <h5 class="card-title">{loggedInUser.firstName} {loggedInUser.lastName}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Birthday: {dateFormat(loggedInUser.birthday, "mmmm dS, yyyy")}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Created account on: {dateFormat(loggedInUser.createdAt, "mmmm dS, yyyy")}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Last updated on: {dateFormat(loggedInUser.updatedAt, "mmmm dS, yyyy")}</h6>
                    <img class="card-text" src={loggedInUser.profilePicture} alt="" height={200} width={200}/>
                    <br />
                    <a href="#" class="card-link">Edit Account Info</a>
                    <button onClick={logout} className="btn btn-danger d-flex ">Logout</button>
                </div>
            </div>
    );
};

export default Dashboard;