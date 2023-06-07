import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Dashboard.css"
import DashboardNavbar from './Dashboard_navbar';
// import Header from "./Header";
// import { myobj } from './Login';
import { useNavigate } from "react-router-dom";
import Following from './Following';
import { version } from 'react';

localStorage.setItem('reloadvar', 'false');
export default function Dashboard() {
    console.log('this is version ', version);

    // var newvar = false;
    // useEffect(() => {
    //     // console.log(initialData);
    //     console.log(localStorage.getItem('reloadvar'), '  this is newvar ');
    //     console.log('this is data', data);
    //     const handleBackButton = (e) => {
    //         // if (localStorage.getItem('reloadvar') == 'true') {
    //             // e.preventDefault();
    //             alert('You clicked the back button');
    //         // }
    //     };
    //     if (localStorage.getItem('reloadvar') == 'true') {
    //         window.addEventListener('popstate', handleBackButton);
    //     }

    //     // return () => {
    //     //     if (localStorage.getItem('reloadvar') == 'true') {
    //     //         window.removeEventListener('popstate', handleBackButton);
    //     //     }
    //     // };
    // }, []);

    useEffect(() => {
        localStorage.setItem('reloadvar', 'false');
    }, []);

    const navigate = useNavigate();
    const url = 'http://localhost:7000/api/updateData'
    // var myobj = {
    //     name:"null",email:'null',age:3,phone:2
    // };
    // setMyobj("invalid")
    var myobj = JSON.parse(localStorage.getItem('myobj'));
    // const[mail,setEmail]=useState(myobj.email);
    const [initialData, setInitial] = useState(false);
    const [data, setData] = useState(myobj)
    const updateData = e => {
        // localStorage.removeItem('reloadvar');
        console.log('this is update ');
        localStorage.setItem('reloadvar', 'true');
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        // setInitial(true)

        // console.log('iniit ', initialData);
        // newvar = true;
    }
    const submit = async (e) => {
        localStorage.setItem('reloadvar', 'false');
        e.preventDefault();
        console.log('this is post data', data);
        try {

            const res = await axios.post(url, data);
            console.log(res);
            // setEmail(data.email);
            // setData("");
            var newobj = JSON.stringify(data);
            localStorage.removeItem('myobj');
            localStorage.setItem('myobj', newobj);
            console.log(data);
            alert('Updated Sucessfully ')
            setInitial(false);
        }
        catch (err) {
            alert('Something went wrong cannot be updated')
            console.log(err);
        }

    };

    const followers = async (e) => {
        e.preventDefault();
        const nav = () => navigate('/followers');
        nav();
    }
    const following = async (e) => {
        e.preventDefault();
        const nav = () => navigate('/following');
        nav();
    }
    const mysubg = async (e) => {
        e.preventDefault();
        const nav = () => navigate('/mysubg');
        nav();
    }
    const subg = async (e) => {
        e.preventDefault();
        const nav = () => navigate('/subg');
        nav();
    }
    function checkData() {
        // console.log('this is herer lwejfwj ');
        // console.log('this is data', data);
        if (data.name == undefined  || data.age == undefined  || data.phone == undefined) {
            return 1;
        }
        if (data.name == ''  || data.age == '' || data.phone == '') {
            return 1;
        }
        if(data.phone.length!=10) return 1;
        // else if(data.)
        else {
            return 0;
        }
        // return 1;
    }
    // console.log(' in dashboard here ')

    return (
        <div>
            {/* {GetData()} */}
            <DashboardNavbar />
            {/* <div>{myobj} it is here </div> */}
            <div className="container mt-5 mb-5">
                <div className="row no-gutters">
                    <div className="col-md-4 col-lg-4"><img src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg" /></div>
                    <div className="col-md-8 col-lg-8">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                                <h3 className="display-5">{data.name} </h3>
                                <form className='formcls'>
                                    <label htmlFor="fname">Name :</label>
                                    <input type="text" id="name" name="name" value={data.name} onChange={updateData} />
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" id="email" name="e-mail" value={data.email} />
                                    <label htmlFor="age">Age</label>
                                    <input type="number" id="age" name="age" value={data.age} onChange={updateData} />
                                    <label htmlFor="phone">Phone</label>
                                    <input type="number" id="phone" name="phone" value={data.phone} onChange={updateData} />
                                    <input type="submit" disabled={checkData()} value="Reset" onClick={submit} />

                                </form>


                                {/* <i className="fa fa-google"></i><i className="fa fa-youtube-play"></i><i className="fa fa-dribbble"></i><i className="fa fa-linkedin"></i> */}
                            </div>
                            <div className="p-3 bg-black text-white">
                                <h6>Web designer &amp; Developer</h6>
                            </div>
                            <div className="d-flex flex-row text-white">
                                <div className="p-4 bg-primary text-center skill-block">
                                    <h4>Followers</h4>
                                    <button className="btn2" onClick={followers}>{data.followers.length}</button>
                                </div>
                                <div className="p-3 bg-success text-center skill-block">
                                    <h4>Following</h4>
                                    <button className="btn2" onClick={following}>{data.following.length}</button>
                                </div>
                                <div className="p-3 bg-warning text-center skill-block">
                                    <h4>My Sub-Greddits </h4>
                                    <button className="btn2" onClick={mysubg}>Click Me</button>
                                </div>
                                <div className="p-3 bg-danger text-center skill-block">
                                    <h4>Sub-Greddits </h4>
                                    <button className="btn2" onClick={subg}>Click Me</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


