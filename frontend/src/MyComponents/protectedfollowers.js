// import { Children } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import Followers from "./Followers";
import DashboardNavbar from "./Dashboard_navbar"
import Login from "./Login";

const ProtectedFollow = ({ children }) => {
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
                <Followers />
            </div>
        );
    }
}

export default ProtectedFollow;