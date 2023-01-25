import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const handleClickScroll = () => {
        const element = document.getElementById('first');
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
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
        axios.post("http://localhost:7000", data)
            .then(resp => {
                this.setState({
                    data: resp.data
                });
                console.log("this.state is ", (this.state));
            })
            .catch(err => {
                console.log(err);
            });

        // console.log(response.data);
    };
    return (
        <div style = {{margin:'10%'}} id="manav">
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                        <img src='https://w7.pngwing.com/pngs/521/804/png-transparent-computer-icons-symbol-login-register-button-miscellaneous-logo-online-chat.png' style={{height:'100px',width:'100px'}}/>
                                    </h2>
                                    <div className="mb-3">
                                        <Form onSubmit={submit}>
                                            <Form.Group className="mb-3" controlId="Name">
                                                <Form.Label className="text-center">Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name" name='name2' onChange={updateData} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" name='email' onChange={updateData} />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" name='password' onChange={updateData} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control type="password" placeholder="Confirm Password" name='confirmPassword' onChange={updateData} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control type="number" placeholder="Age" name='age' onChange={updateData} />
                                            </Form.Group> <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Contact Number</Form.Label>
                                                <Form.Control type="number" placeholder="Phone No" name='number2' onChange={updateData} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit" onSubmit={submit}>
                                                    Create Account
                                                </Button>
                                            </div>
                                            {/* console.log(hii) */}
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account??{' '}
                                                <button onClick={handleClickScroll} className="btn2"> Login</button>
                                                {/* <a href="#first" className="text-primary fw-bold">
                                                    Log in
                                                </a> */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}