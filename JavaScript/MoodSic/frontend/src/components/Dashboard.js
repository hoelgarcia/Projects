import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


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
        <div>
            <div>
            <h1>Welcome {loggedInUser.firstName} {loggedInUser.firstName}, you're in the dashboard! congratz on being a registered user!</h1>
            <button onClick={logout} className="btn btn-info">Logout</button>
            </div>
        <div>
            <a className="btn btn-dark" href="/genres">Genres</a>
            <a className="btn btn-dark" href="/moods">Moods</a>
        </div>

        </div>
    );
};

export default Dashboard;