// import { useState } from 'react';
import './Followers.css'
import axios from 'axios';
import Header from './MySubgNavBar';
import React, { useEffect, useState, useReducer } from 'react';
import { StorefrontSharp } from '@mui/icons-material';

export default function Following() {
    const url = 'http://localhost:7000/api/following'




    var arr = JSON.parse(localStorage.getItem('myobj')).following
    console.log(arr);

    const [followingrarr, setFollowing] = useState([]);
    useEffect(() => {

        var email = JSON.parse(localStorage.getItem('myobj')).email
        axios.post('http://localhost:7000/api/getFollowing', { 'email': email })
            .then((res) => {
                console.log('this is res. ', res.data);
                // res.data.tosome = res.data.like.length-res.data.dislike.length;
                setFollowing(res.data);
            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })
    }, []);


    async function deleteData(e, i) {
        e.preventDefault();

        console.log(i)
        var farr = [];
        for (var j = 0; j < followingrarr.length; j++) {
            if (followingrarr[j] !== i) farr.push(followingrarr[j])
        }
        setFollowing((followingrarr) => followingrarr.filter((_, index) => followingrarr[index] != i));
        var tempobj = {
            name: i,
            email: JSON.parse(localStorage.getItem('myobj')).email,
            farr: farr
        }
        // var forlocal = {};
        var forlocal = JSON.parse(localStorage.getItem('myobj'));
        forlocal.following = farr;

        console.log(farr);
        const res = await axios.post(url, tempobj);
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
            <Header/>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'yellow', backgroundColor: 'Black', text: 'sans-serif' }}>Following</h1>
                <ol className="olcards" style={{ position: 'center' }}>
                    {/* <div className="content">
        //                 <div className="icon">😀</div>
        //                 <div className="title">Lorem Ipsum</div>
        //                 <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatem.</div>
        //             </div>
        //         </li>
        //         <li>
        //             <div className="content">
        //                 <div className="icon">😁</div>
        //                 <div className="title">Lorem Ipsum</div>
        //                 <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatem.</div>
        //             </div>
        //         </li>
        //         <li>
        //             <div className="content">
        //                 <div className="icon">😉</div>
        //                 <div className="title">Lorem Ipsum</div>
        //                 <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatem.</div>
        //             </div>
        //         </li>
        //         <li>
        //             <div className="content">
        //                 <div className="icon">😜</div>
        //                 <div className="title">Lorem Ipsum</div>
        //                 <div className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, voluptatem.</div>
        //             </div> */}
                    <ul>
                        {
                            followingrarr.map((index) =>
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
                    {/* <ul> <div onClick={deleteData} dangerouslySetInnerHTML={{ __html: followingrarr }} /></ul> */}
                </ol>

            </div>
        </div>
    );
};
