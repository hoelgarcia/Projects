import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const SignIn = () => {
    return(
        <div className="container w-50">
            <div className="text-center">
                <h2>Welcome to Login and Registration</h2>
            </div>
            <br />
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