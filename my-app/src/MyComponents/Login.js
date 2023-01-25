import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Register from "./register";
// import {View} from 'react-native';
import React, { useRef } from "react";
import Header from "./Header";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";
import './Login.css'



const mystyle = {
    // display: "flex",
    backgroundColor: "DodgerBlue",
    //   float:'left',
    //   flex : 10
};




export default function Login(flag) {
    const ServicesRef = useRef(null);
    console.log(flag);
    const navigate = useNavigate();
    const handleClickScroll = () => {
        const element = document.getElementById('unique');
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const gotoServices = () =>
        window.scrollTo({
            top: ServicesRef.current.offsetTop,
            behavior: "smooth",
            // You can also assign value "auto"
            // to the behavior parameter.
        });


    const [data, setData] = useState({})
    const updateData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submit = e => {
        e.preventDefault();
        console.log(data);
        if (data.email === '') {
            alert('Please enter email');
        }
        else if (data.password === '')
            alert('Please enter password');
        else {
            if (data.email == 'admin' && data.password == 'admin') {
                localStorage.setItem("myvar", 'true')
                const nav = () => navigate('/dashboard');
                nav();
            }
            else {
                const nav = () => navigate('/login');
                nav();
            }
        }
        // console.log(response.data);
    };

    return (
        <div>
            <Header />
            <div style={mystyle} id="first">
                <Container>
                    <Row className="vh-100 d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <div className="border border-3 border-primary"></div>
                            <Card className="shadow">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-uppercase ">G-Reddit</h2>
                                        <p className=" mb-5">Please enter your login and password!</p>
                                        <div className="mb-3">
                                            <Form onSubmit={submit}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        Username
                                                    </Form.Label>
                                                    <Form.Control type="text" placeholder="Enter email" name="email" onChange={updateData} />
                                                </Form.Group>

                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" name="password" onChange={updateData} />
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"
                                                >
                                                    <p className="small">
                                                        <a className="text-primary" href="#!">
                                                            Forgot password?
                                                        </a>
                                                    </p>
                                                </Form.Group>
                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit" style={{ fontSize: '25px', color: 'red', backgroundColor: 'blue' }}>
                                                        <p>login  <i className="fa fa-sign-in" >  </i> </p>
                                                    </Button>
                                                </div>
                                            </Form>
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Don't have an account?{" "}
                                                    {/* <a href="#unique" className="text-primary fw-bold">
                                                        Sign Up
                                                    </a> */}
                                                    <button onClick={handleClickScroll} className="btn2">Sign Up</button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <br /><br />
            </div>
            <div id="unique">

                <Register></Register>
            </div>
        </div>
    );
}