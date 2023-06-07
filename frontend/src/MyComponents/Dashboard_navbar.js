import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { hover } from '@testing-library/user-event/dist/hover';
import { NavLink } from 'react-router-dom';
// import { Redirect } from 'react-router';
import { useNavigate } from "react-router-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import "./Dashboard_navbar.css"
import Login from './Login';


export default function Header(props) {
    const navigate = useNavigate();
    const submit = e => {
        // e.preventDefault();
        localStorage.setItem('myvar', 'false');
        const nav = () => navigate('/login');
        nav();

        // console.log(response.data);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* <Link className="navbar-brand" to="/">{props.title}</Link> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i class="fa fa-angle-double-down"></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className='newclsnavbar'>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link" to="/login">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/savedPosts">Saved Posts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/followers">Followers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/following">Following</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/mysubg">My-Subg</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/subg">Subg</Link>
                            </li>

                        </ul>
                    </div>
                    <div className='logoutcls'>

                    <button className="cls" type="submit" onClick={submit}><i className="fa fa-sign-in" title='Logout' style={{ fontSize: '25px' }}></i></button>
                    </div>

                </div>
            </div>
        </nav>
    )
}
Header.defaultProps = {
    title: "Your Title Here",
    searchBar: true
}

Header.propTypes = {
    title: PropTypes.string,
    searchBar: PropTypes.bool.isRequired
}