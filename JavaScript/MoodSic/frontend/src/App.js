import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState} from "react";
import './App.css';
import Dashboard from './views/Dashboard';
import Home from './views/Home';
import {Switch,Route,useHistory} from "react-router-dom";


function App() {
return (
    <div>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/dashboard">
                <Dashboard/>
            </Route>
        </Switch>
    </div>
);
}

export default App;