// import { Children } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
const ProtectedRoute = ({ children }) => {
    var temp = localStorage.getItem('myvar');
    if (temp === 'true') {
        console.log(children)
        return children;
    }
    else {
        // console.log('hello');
        return (
                <Navigate to="/login"></Navigate>);
    }
}

export default ProtectedRoute;