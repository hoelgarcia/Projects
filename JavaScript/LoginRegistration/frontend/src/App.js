import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import './App.css';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import {Switch,Route} from "react-router-dom";

function App() {
  return (
    <div>
        <Switch>
            <Route exact path="/">
                <SignIn/>
            </Route>
            <Route exact path="/dashboard">
                <Dashboard/>
            </Route>
        </Switch>
    </div>
  );
}

export default App;
