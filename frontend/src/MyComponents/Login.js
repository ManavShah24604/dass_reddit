import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Register from "./register";
// import {View} from 'react-native';
import React, { useRef } from "react";
import Header from "./Header";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";
import './Login.css'
import axios from 'axios';
import { Audio } from 'react-loader-spinner'
import Loader from './Loader';

// export {mydata};
var myobj = "invalid";
const mystyle = {
    // display: "flex",
    backgroundColor: "DodgerBlue",
    //   float:'left',
    //   flex : 10
};



export default function Login() {
    const [isLoading, setLoading] = useState(false);
    const url = 'http://localhost:7000/api/login'
    const ServicesRef = useRef(null);
    // console.log();
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

    const submit = async (e) => {
        e.preventDefault();
        // console.log(data);
        setLoading(true)
        if (data.email === '') {
            alert('Please enter email');
        }
        else if (data.password === '')
            alert('Please enter password');
        else {

            const res = await axios.post(url, data);
            console.log(res.data);
            console.log('data, ', res.data);
            if (res.data == 'email not valid') {
                alert('Please enter email properly ')

            }
            else if (res.data.length == 0) {
                alert('Please enter details properly ')
            }
            else {
                console.log('succesful');
                // e.preventDefault();
                // myobj = res.data[0];
                console.log(res)
                localStorage.setItem('token', res.data.token);
                var tempobj = {
                    name: res.data.data.name,
                    email: res.data.data.email,
                    age: res.data.data.age,
                    phone: res.data.data.phone,
                    followers: res.data.data.followers,
                    following: res.data.data.following
                }
                localStorage.setItem('myvar', 'true');
                // console.log('this is herer lwejfwj ');
                // console
                var newobj = JSON.stringify(tempobj);
                console.log(newobj)
                localStorage.setItem('myobj', newobj);
                setLoading(true);
                const nav = () => navigate('/dashboard');
                nav();
            }

        }
        setLoading(false);
        // console.log(response.data);
    };
    function check() {
        if (data.email == undefined || data.email == '' || data.password == undefined || data.password == '') {
            return 1;
        }
        else {
            return 0;
        }
        // return 1;
    }

    return (
        <div>
            <Header />
            <div className="loagingcls">
                {/* {  <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                />} */}
                {
                    isLoading && <Loader />
                }
            </div>
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
                                                        Email address
                                                    </Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={updateData} />
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
                                                    <Button disabled={check()} variant="primary" type="submit" style={{ fontSize: '25px', color: 'red', backgroundColor: 'blue' }}>
                                                        <p>Login  <i className="fa fa-sign-in" >  </i> </p>
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
export { myobj };
