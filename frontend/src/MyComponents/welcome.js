import React from 'react';
import './welcome.css';
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
    const navigate = useNavigate();
    function handle() {
        const nav = () => navigate('/login');
        nav();
    }
    return (
        <div className="container2">
            <div className="content2">
                <h1 className="title2">Welcome to Greddit!</h1>
                <p className="description2">We're glad you're here. </p>
                <div className="cta-container2">
                    <button className="cta-button2" onClick={handle}>Login</button>
                </div>
            </div>
        </div>
    );
};


