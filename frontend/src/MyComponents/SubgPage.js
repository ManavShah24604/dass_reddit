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
import Modal from 'react-bootstrap/Modal';
import MyVerticallyCenteredModal from './Modal';


export default function SubgPage() {

    const navigate = useNavigate();
    const url = 'http://localhost:7000/api/updateData'
    // var myobj = {
    //     name:"null",email:'null',age:3,phone:2
    // };
    // setMyobj("invalid")
    var myobj = JSON.parse(localStorage.getItem('toopen'));
    // console.log(_id);
    // const[mail,setEmail]=useState(myobj.email);
    const [data, setData] = useState(myobj)
    const [display, setDisplay] = useState([]);
    const [comments, setComments] = useState('');
    const[reports,setReports]=useState('');

    useEffect(() => {
        console.log(myobj);
        // var email = JSON.parse(localStorage.getItem('myobj')).email
        axios.post('http://localhost:7000/api/getPosts', { _id: myobj._id })
            .then((res) => {
                console.log('this is res. ', res.data);
                // res.data.tosome = res.data.like.length-res.data.dislike.length;
                setDisplay(res.data);
            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })
    }, []);


    const updateData = e => {
        setComments({
            ...comments,
            [e.target.name]: e.target.value
        })
    }
    const updateReports = e => {
        setReports({
            ...reports,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async (e, index) => {
        e.preventDefault();
        // console.log(data);
        var myobj = {
            email: JSON.parse(localStorage.getItem('myobj')).email,
            postid: index._id,
        }
        console.log(index);
        const res = axios.post('http://localhost:7000/api/savePosts', myobj);
        // window.location.reload(false);

    }

    const comment = async (e, index) => {
        e.preventDefault();
        console.log(comments);
        const res = axios.post('http://localhost:7000/api/saveComments', { index, comments: comments });
        // setComments('');


        window.location.reload(false);

    }

    const upvote = async (e, index) => {
        e.preventDefault();
        // console.log(data);
        var abcd = JSON.parse(localStorage.getItem('myobj'))
        var myobj = {
            email: abcd.email,
            postid: index._id,
        }
        console.log('this is index ', index);
        const res = axios.post('http://localhost:7000/api/upvote', myobj);
        // var temp = [...display];
        // for(var i=0;i<display.length;i++)
        // {
        //     if(display[i]==index)
        //     {

        //         temp[i].like= [...index.like,abcd.email];
        //     }
        // }
        // setDisplay([...temp])


        window.location.reload(false);

    }

    const addFollower = async (e, index) => {
        e.preventDefault();
        // console.log(data);
        var myobj = {
            follower: JSON.parse(localStorage.getItem('myobj')).email,
            following: index.email
        }
        console.log(index);
        if (JSON.parse(localStorage.getItem('myobj')).email == index.email) {
            alert('You cannot send request to yourself ');
        }
        else {
            const res = axios.post('http://localhost:7000/api/addFollowers', myobj);
        }
        // window.location.reload(false);

    }

    const downvote = async (e, index) => {
        e.preventDefault();
        // console.log(data);
        var myobj = {
            email: JSON.parse(localStorage.getItem('myobj')).email,
            postid: index._id,
        }
        console.log(index);
        const res = axios.post('http://localhost:7000/api/downvote', myobj);
        window.location.reload(false);// window.location.reload(false);

    }

    const report = async (e, index) => {
       
        // var concern = document.getElementById('report').value;
        console.log((reports));
        var toSend = {
            date:new Date(),
            reportedby:JSON.parse(localStorage.getItem('myobj')).email,
            reportedof:index.email,
            concern:reports.report,
            text:index.text,
            subgid:JSON.parse(localStorage.getItem('toopen'))._id,
            postid:index._id,
            state:0
        }
        const res = axios.post('http://localhost:7000/api/report',toSend);

        window.location.reload(false);

    }





    console.log(' in dashboard here ')
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <div className="container mt-5 mb-5">
                <div className="row no-gutters">
                    <div className="col-md-4 col-lg-4"><img src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg" /></div>
                    <div className="col-md-8 col-lg-8">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                                <h3 className="display-5">{data.name} </h3>
                                <form className='formcls'>
                                    <label htmlFor="fname">Name :</label>
                                    <input type="text" id="name" name="name" value={data.name} />
                                    <label htmlFor="email">Description : </label>
                                    <input type="email" id="email" name="e-mail" value={data.email} />
                                    <label htmlFor="age">Tags : </label>
                                    <input type="text" id="age" name="age" value={data.age} />
                                    <label htmlFor="phone">Banned Keywords :</label>
                                    <input type="text" id="phone" name="phone" value={data.bannedKeywords} />

                                </form>


                                {/* <i className="fa fa-google"></i><i className="fa fa-youtube-play"></i><i className="fa fa-dribbble"></i><i className="fa fa-linkedin"></i> */}
                            </div>
                            <div className="p-3 bg-black text-white">
                                <h6>Web designer &amp; Developer</h6>
                            </div>
                            <div className="d-flex flex-row text-white">
                                {/* <div className="p-4 bg-primary text-center skill-block">
                                    <h4>Saved Posts</h4>
                                    <button className="btn2" >Saved Posts</button>
                                </div> */}
                                {/* <div className="p-3 bg-success text-center skill-block">
                                    <h4>POST</h4>
                                    <button className="btn2" >POST</button>
                                </div> */}
                                <div>
                                    <Button className="btn2" style={{ marginTop: '20%' }} onClick={() => setModalShow(true)}>
                                        POST
                                    </Button>

                                    <MyVerticallyCenteredModal
                                        topass={data.bannedKeywords}
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>


                {display.map((index,ind) =>
                    <div key={ind} className="box22"  >
                        <div className='table22'>
                            <div>
                                <p className='tdcls'>Email : {index.email}</p>
                            </div>
                            <div>
                                <p className='tdcls'>Text : {index.text}</p>
                            </div>
                            <button className='thumbsup' onClick={(event) => { upvote(event, index) }}>
                                <i className="fa fa-thumbs-up" ></i>
                            </button>
                            <button className='thumbsdown' onClick={(event) => { downvote(event, index) }}>
                                <i className="fa fa-thumbs-down" ></i>

                            </button>
                            
                                <p className='tdcls'>Votes : {index.like.length - index.dislike.length}</p>
                                {/* <td className='tdcls'>Votes : {index.dislike}</td> */}

                            
                            <div>
                                <label htmlFor="fname">Add comment  :</label>
                                <input type="text" name="comment" className='csscls' onChange={updateData} />
                                <Button onClick={(event) => { comment(event, index) }}>Comment</Button>

                            </div >


                            <div>

                                <button type="button" className="btn btn-primary" style={{ marginTop: '2%', marginRight: '3%' }} onClick={(event) => { addFollower(event, index) }}>FOLLOW</button>
                                <Button onClick={(event) => { handleSave(event, index) }}>SAVE</Button>
                            </div>
                            <div style={{marginTop:'3%'}}>
                                <input type="text" name="report" id='report' className='csscls' placeholder='CONCERN' onChange={updateReports}/>
                                <Button onClick={(event) => { report(event, index) }}>REPORT</Button>
                            </div>
                            <div style={{ marginTop: '3%' }}>
                                <p className='comments'>COMMENTS : </p>
                                {index.comments.map((it) =>
                                    <span style={{ marginTop: '1%' }} key={it}>{it}  , </span>
                                )}
                            </div>

                        </div>

                        {/* {index.join == 0 && index.leave == 0 && index.alreadyleft == 0 && <button type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >YOU ARE CREATOR</button>}
                    {index.join != 0 && index.alreadyleft == 0 && <button onClick={(event) => { joinSubg(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >JOIN</button>}
                    {index.alreadyleft != 0 && <button onClick={(event) => { alertevent(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >SORRY YOU CANNOT JOIN</button>}
                    {index.join == 0 && index.leave == 1 && <button onClick={(event) => { leaveSubg(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >LEAVE</button>} */}

                        {/* <button onClick={(event) => { handleDelete(event, index) }} type="button" className="btn btn-primary" style={{ marginTop: '5%' }}>DELETE</button> */}
                    </div >
                )}


            </div>

        </div>
    );

}


