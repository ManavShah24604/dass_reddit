// import { Children } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
const ProtectedRoute = ({ children }) => {
    var temp = localStorage.getItem('myvar');
    if (temp === 'false') {
        return (
            <Navigate to="/login"></Navigate>);

    }
    else {
        // console.log('hello');
        console.log(children)
        return children;
    }
}

export default ProtectedRoute;