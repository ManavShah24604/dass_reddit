// import { useState } from 'react';
import './Followers.css'
import axios from 'axios';

import React, { useEffect, useState, useReducer } from 'react';

import Header from './MySubgNavBar'
export default function Followers() {
    const url = 'http://localhost:7000/api/follower'
    var myarr;
    var arr = JSON.parse(localStorage.getItem('myobj')).followers
    console.log(arr);

    const [followerarr, setFollower] = useState([]);
    console.log(followerarr);

    useEffect(() => {

        var email = JSON.parse(localStorage.getItem('myobj')).email
        axios.post('http://localhost:7000/api/getFollower', { 'email': email })
            .then((res) => {
                console.log('this is res. ', res.data);
                // res.data.tosome = res.data.like.length-res.data.dislike.length;
                setFollower(res.data);
            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })
    }, []);


    async function deleteData(e, i) {
        e.preventDefault();

        console.log(i)
        var farr = [];
        for (var j = 0; j < followerarr.length; j++) {
            if (followerarr[j] !== i) farr.push(followerarr[j])
        }
        setFollower((followerarr) => followerarr.filter((_, index) => followerarr[index] != i));
        var tempobj = {
            name: i,
            email: JSON.parse(localStorage.getItem('myobj')).email,
            farr: farr
        }
        const res = await axios.post(url, tempobj);
        var forlocal = JSON.parse(localStorage.getItem('myobj'));
        forlocal.followers = farr;
        localStorage.removeItem('myobj');
        localStorage.setItem('myobj', JSON.stringify(forlocal));
        // var newobj = JSON.stringify(data);
        // localStorage.removeItem('myobj');
        // localStorage.setItem('myobj', newobj);
        // console.log(data);
        alert('Deleted Sucessfully ')

    };

    return (
        <div>
            <Header />
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'yellow', backgroundColor: 'Black', text: 'sans-serif' }}>Followers</h1>
                <ol className="olcards" style={{ position: 'center' }}>
                    <ul>
                        {
                            followerarr.map((index) =>
                                <li>
                                    <div className="content">
                                        <button className="btn3" onClick={(event) => { deleteData(event, index) }}>
                                            <i className="fas fa-trash-alt"></i>Delete</button>
                                        <div className="title2">{index}</div>

                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </ol>

            </div>
        </div>
    );
};
