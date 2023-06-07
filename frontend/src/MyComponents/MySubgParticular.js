import React from "react";
import './MySubgparticular.css'
import Header from './SubgparticularNavbar'
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from 'react';



const Navbar = () => {

    const handleKeyPress = useCallback((event) => {
        console.log(`Key pressed: ${event.key}`);
        if (event.key == 'U') {
            users();
        }
        else if (event.key == 'J')
            join()
        else if (event.key == 'B')
            blocked()
        else if (event.key == 'R')
            report();
        else if(event.key=='S') stats();

    }, []);

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);


    const navigate = useNavigate();
    function join() {
        const nav = () => navigate('/joiningpage');
        nav();
    }
    function users() {
        const nav = () => navigate('/users');
        nav();
    }
    function blocked() {
        const nav = () => navigate('/blockedusers');
        nav();
    }
    function report() {
        const nav = () => navigate('/report');
        nav();
    }
    function stats() {
        const nav = () => navigate('/stats');
        nav();
    }
    return (
        <div>
            <Header />
            <br />
            <nav className="nav-cls2">
                <button className="nav-btn2" onClick={join}>JOINING REQUSTS</button>
                <button className="nav-btn2" onClick={users}>USERS</button>
                <button className="nav-btn2" onClick={blocked}>BLOCKED USERS</button>
                <button className="nav-btn2" onClick={report}>REPORT</button>
                <button className="nav-btn2" onClick={stats}>Stats</button>
            </nav>
        </div>
    );
};

export default Navbar;
