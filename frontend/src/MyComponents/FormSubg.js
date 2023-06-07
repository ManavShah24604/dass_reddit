import * as React from 'react';
import axios from 'axios';
import './MysubGredditForm.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';


export default function SubgForm() {
    const navigate = useNavigate();

    const [data, setData] = useState({})
    const updateData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        // console.log(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        var email = JSON.parse(localStorage.getItem('myobj')).email;
        console.log(email);
        var myobj = {
            data,
            email: email
        }
        const res = axios.post('http://localhost:7000/api/mysubgform', myobj);
        const nav = () => navigate('/mysubg');
        nav();
        window.location.reload();
    }

    function handleBack() {
        const nav = () => navigate('/mysubg');
        nav();
    }

    function check() {
        console.log('this is herer lwejfwj ');
        if (data.name == undefined || data.name == '' || data.description == undefined || data.description == '' || data.tags == undefined || data.tags == '' || data.bannedKeywords == undefined || data.bannedKeywords == '') {
            console.log('this is data', data);
            return 1;
        }
        else {
            return 0;
        }
        // return 1;
    }
    return (
        <div className='bodyy'>
            <div className="form">
                <div className="title">Create New  Sub-Greddit</div>
                <form>

                    {/* <div className="subtitle">Let's create new sub-greddit</div> */}
                    <div className="input-container ic1">
                        <input id="nameofsubg" className="input" type="text" name='name' placeholder="name" onChange={updateData} />
                        {/* <div className="cut"></div> */}
                        {/* <label for="firstname" className="placeholder">First name</label> */}
                    </div>
                    <div className="input-container ic2">
                        <input id="description" className="input" type="text" placeholder="description" name='description' onChange={updateData} />
                        {/* <div className="cut"></div>
                <label for="lastname" className="placeholder">Last name</label> */}
                    </div>
                    <div className="input-container ic2">
                        <input id="tags" className="input" type="text" placeholder="Tags" name='tags' onChange={updateData} />
                        {/* <div className="cut cut-short"></div>
                <label for="email" className="placeholder">Email</label> */}
                    </div>
                    <div className="input-container ic2">
                        <input id="bannedKeywords" className="input" type="text" placeholder="Banned Keywords " name='bannedKeywords' onChange={updateData} />
                        {/* <div className="cut cut-short"></div>
                <label for="email" className="placeholder">Email</label> */}
                    </div>
                    <Button disabled={check()}  className="submit22" onClick={handleSubmit}>submit</Button>
                    <Button type="text" className="submit22" onClick={handleBack}>Back</Button>
                </form>
            </div>
        </div>
    );
}