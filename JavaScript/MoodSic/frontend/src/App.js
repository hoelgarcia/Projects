import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState} from "react";
import './App.css';
import Dashboard from './views/Dashboard';
import Home from './views/Home';
import {Switch,Route,useHistory} from "react-router-dom";

function App() {
    const [token, setToken] = useState("")
    const history = useHistory();


    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
        history.push("/")
    }

return (
    <div>

        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/dashboard">
                <Dashboard/>
            </Route>
        </Switch>

    </div>

);
}

export default App;
