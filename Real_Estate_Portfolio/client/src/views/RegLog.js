import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import LoginRegHeader from "../components/LoginRegHeader";


const RegLog = () => {

    return (
        <div style={{textAlign: "center"}}>
        <LoginRegHeader />
            <div className="reglog">
            <Register />
            </div>
            <div className="reglog">
            <Login />
            </div>
        </div>
    );
};

export default RegLog;