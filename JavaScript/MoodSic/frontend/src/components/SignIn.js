import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const SignIn = () => {
    return(
        <div className="container w-50">
            <h2>Welcome to</h2> <br />
            <h1>Moodsic</h1>
            <div className="row">
                <div className="col">
                    <RegistrationForm/>
                </div>
                <div className="col">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
};

export default SignIn;