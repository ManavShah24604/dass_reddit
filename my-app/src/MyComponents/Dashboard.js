import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Dashboard.css"
import DashboardNavbar from './Dashboard_navbar';
// import Header from "./Header";


export default function Dashboard() {
    return (
        <div>
            <DashboardNavbar />
            <div className="container mt-5 mb-5">
                <div className="row no-gutters">
                    <div className="col-md-4 col-lg-4"><img src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg" /></div>
                    <div className="col-md-8 col-lg-8">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                                <h3 className="display-5">Admin </h3>
                                {/* <table className='tablecls'>
                                    <tr >
                                        <td style={{ border: 'solid 2px' }}>Username</td>
                                        <td style={{ border: 'solid 2px' }}>E-mail</td>
                                        <td style={{ border: 'solid 2px' }}>Age</td>
                                        <td style={{ border: 'solid 2px' }}>Contact No.</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: 'solid 2px' }}>Admin</td>
                                        <td style={{ border: 'solid 2px' }}>admin@gmail.com</td>
                                        <td style={{ border: 'solid 2px' }}>11</td>
                                        <td style={{ border: 'solid 2px' }}>1234567890</td>
                                    </tr>
                                </table> */}
                                <form className='formcls'>
                                    <label for="fname">Name :</label>
                                    <input type="text" id="name" name="name" placeholder="Admin" />
                                    <label for="email">E-mail</label>
                                    <input type="email" id="email" name="e-mail" placeholder="admin@gmail.com" />
                                    <label for="age">Age</label>
                                    <input type="number" id="age" name="age" placeholder="18" />
                                    <label for="phone">Phone</label>
                                    <input type="number" id="phone" name="phone" placeholder="1234567890" />
                                    <input type="submit" value="Submit" />

                                </form>


                                {/* <i className="fa fa-google"></i><i className="fa fa-youtube-play"></i><i className="fa fa-dribbble"></i><i className="fa fa-linkedin"></i> */}
                            </div>
                            <div className="p-3 bg-black text-white">
                                <h6>Web designer &amp; Developer</h6>
                            </div>
                            <div className="d-flex flex-row text-white">
                                <div className="p-4 bg-primary text-center skill-block">
                                    <h4>100</h4>
                                    <h6>Followers</h6>
                                </div>
                                <div className="p-3 bg-success text-center skill-block">
                                    <h4>70</h4>
                                    <h6>Following</h6>
                                </div>
                                <div className="p-3 bg-warning text-center skill-block">
                                    <h4>8</h4>
                                    <h6>Requests</h6>
                                </div>
                                <div className="p-3 bg-danger text-center skill-block">
                                    <h4>7</h4>
                                    <h6>Myposts</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


