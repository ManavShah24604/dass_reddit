// import { Children } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import DashboardNavbar from "./Dashboard_navbar"
import Login from "./Login";
import Following from "./Following";

const ProtectedFollowing = ({ children }) => {
    var temp = localStorage.getItem('myvar');
    if (temp == 'false') {
        console.log(temp);
        return (
            <Navigate to='/login'></Navigate>
        );
    }
    else {
        console.log('hello');
        return (
            <div>
                <DashboardNavbar/>
                <Following />
            </div>
        );
    }
}

export default ProtectedFollowing;