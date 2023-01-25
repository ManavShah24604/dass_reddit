// import { Children } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
const ProtectedLogin = ({ children }) => {
    var temp = localStorage.getItem('myvar');
    if (temp === 'false') {
        console.log(children)
        return children;
    }
    else {
        // console.log('hello');
        return (
                <Navigate to="/dashboard"></Navigate>);
    }
}

export default ProtectedLogin;