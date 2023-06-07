
import { loadConfig } from '@babel/core/lib/config/files';
import './joiningpage.css'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './MySubgNavBar'
export default function JoiningPage() {
    var myobj = "invalid";
    myobj = JSON.parse(localStorage.getItem('mysubg'));


    const [data, setData] = useState([]);


    useEffect(() => {
        console.log('coming in log ');
        axios.post('http://localhost:7000/api/joiningpageinitial', { subgid: JSON.parse(localStorage.getItem('mysubg'))._id })
            .then((res) => {
                myobj = res.data


                if (myobj.followers == undefined) {
                    console.log('herer in if ');
                    setData(null);
                }
                else {
                    for (var j = 0; j < myobj.followers.length; j++) {
                        axios.post('http://localhost:7000/api/joiningpage', { email: myobj.followers[j] })
                            .then((res) => {
                                console.log('coming herr ', res.data)
                                setData(data => [...data, res.data[0]]);

                            })
                    }
                }

            })



    }, []);

    async function accept(e, index) {
        e.preventDefault();
        // console.log(index);
        var subgdataid = JSON.parse(localStorage.getItem('mysubg'))._id
        var toSend = {
            _id: subgdataid,
            email: index.email
        }
        // console.log(toSend);
        console.log('ti is index', index);
        var myarr = [];
        for (var i = 0; i < data.length; i++) {
            myarr.push(data[i].email);
        }
        myarr.filter((_, ind) => myarr[ind] != index);
        myobj.followers = myarr;
        const res = axios.post('http://localhost:7000/api/accept', toSend);
        if (myarr.length == 0) {
            console.log('hre in len=0');
            myobj.tempdata = 'some';
            localStorage.removeItem('mysubg');
            localStorage.setItem('mysubg', JSON.stringify(myobj));
            setData(null)
        }
        else {
            myobj.followers = myarr;
            localStorage.removeItem('mysubg');
            localStorage.setItem('mysubg', JSON.stringify(myobj));
            setData((data) => data.filter((_, ind) => data[ind] != index));
        }
        // alert('Request Accepted');
    }

    async function reject(e, index) {
        e.preventDefault();
        var subgdataid = JSON.parse(localStorage.getItem('mysubg'))._id
        var toSend = {
            _id: subgdataid,
            email: index.email
        }

        var myarr = [];
        for (var i = 0; i < data.length; i++) {
            myarr.push(data[i].email);
        }
        myarr.filter((_, ind) => myarr[ind] != index);
        const res = axios.post('http://localhost:7000/api/reject', toSend);
        console.log(myarr);
        if (myarr.length == 0) {
            myobj.followers = 'some';
            localStorage.setItem('mysubg', JSON.stringify(myobj));
            setData(null)
        }
        else {
            myobj.followers = myarr;
            localStorage.removeItem('mysubg');
            localStorage.setItem('mysubg', JSON.stringify(myobj));
            setData((data) => data.filter((_, ind) => data[ind] != index));
        }
        // alert('Request Rejected');
    }


    // console.log('this is data ', myarr);

    return (
        <div>

            <Header togo={'musubg'} />
            <div className='handlemargin'>
                <div className="container bootstrap snippets bootdey">

                    <div className="header">
                        <h3 className="text-muted prj-name">
                            <span className="fa fa-users fa-2x principal-title"></span>
                            Joining Page
                        </h3>
                    </div>

                    <div className="jumbotron list-content">
                        <ul className="list-group">
                            <li href="#" className="list-group-item title">
                                Joining Requests
                            </li>
                            {data.map(index =>

                                <li href="#" className="list-group-item text-left">
                                    <label className="name22">
                                        Name : {index.name}<br />
                                    </label>
                                    <label className="pull-right">

                                        <button className="btnforjoining2" onClick={(event) => { reject(event, index) }}><i className="fa fa-close"></i> Close</button>
                                    </label>
                                    <label className="pull-right">
                                        <button className="btnforjoining" onClick={(event) => { accept(event, index) }}><i className="fa fa-check-square-o"></i> Accept</button>
                                    </label>

                                    <div className="break"></div>
                                    <p>Email : {index.email}</p>
                                    <p>Age : {index.age}</p>
                                    <p>Phone : {index.phone}</p>


                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};