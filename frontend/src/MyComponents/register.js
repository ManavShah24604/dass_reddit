import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loader from './Loader';

export default function Register() {
    const [isLoading,setLoading]=useState(false);
    const navigate = useNavigate();
    const url = 'http://localhost:7000/api/register'
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
        console.log(data);
    }

    const submit = async (e) => {
        e.preventDefault();
        console.log(data);
        setLoading(true)
        try {
            const res = await axios.post(url, data);
            // console.log(res);;
            console.log(res);
            setData({});
            alert('Registered Sucessfully ')
            window.location.reload(false);
            handleClickScroll();
            // const nav = () => navigate('/login');
            // nav();
        }
        catch (err) {
            alert('Something went wrong Please enter details properly')
            setData({});
            window.location.reload(false);
            handleClickScroll();
            console.log(err.res);
        }
        setLoading(false);
    };

    function checkData() {
        // console.log('this is herer lwejfwj ');
        // console.log('this is data', data);
        if (data.name == undefined || data.email == undefined || data.age == undefined || data.password == undefined || data.confirmPassword == undefined || data.phone == undefined) {
            return 1;
        }
        if (data.name == '' || data.email == '' || data.age == '' || data.password == '' || data.confirmPassword == '' || data.phone == '') {
            return 1;
        }
        if(data.phone.length!=10) return 1;

        // else if(data.)
        else {
            return 0;
        }
        // return 1;
    }

    return (
        <div style={{ margin: '10%' }} id="manav">
            {/* {
                 <Loader />
            } */}
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                        <img src='https://w7.pngwing.com/pngs/521/804/png-transparent-computer-icons-symbol-login-register-button-miscellaneous-logo-online-chat.png' style={{ height: '100px', width: '100px' }} />
                                    </h2>
                                    <div className="mb-3">
                                        <Form onSubmit={submit}>
                                            <Form.Group className="mb-3" controlId="Name">
                                                <Form.Label className="text-center">User Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Name" name='name' onChange={updateData} />
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
                                                <Form.Control type="number" placeholder="Phone No" name='phone' onChange={updateData} />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            ></Form.Group>
                                            <div className="d-grid">
                                                <Button disabled={checkData()} variant="primary" type="submit" onClick={submit} >
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