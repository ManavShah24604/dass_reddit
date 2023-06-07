import { useState, useEffect } from 'react';
import "./Dashboard.css"
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function SavedPosts() {

    const [data, setData] = useState([]);
    var myobj = JSON.parse(localStorage.getItem('myobj'));
    useEffect(() => {
        console.log(myobj);
        // var email = JSON.parse(localStorage.getItem('myobj')).email
        axios.post('http://localhost:7000/api/savedPosts', { email: myobj.email })
            .then((res) => {
                console.log('this is res. ', res.data);
                // res.data.tosome = res.data.like.length-res.data.dislike.length;
                setData(res.data);
            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })
    }, []);

    function handleDelete(event, index) {
        axios.post('http://localhost:7000/api/deletePosts', { email: myobj.email, postid: index._id })
            .then((res) => {
                console.log('this is res. ', res.data);
            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })
        setData((data) => data.filter((_, i) => data[i] != index));
    }

    return (

        < div >
            <h1 style={{ color: 'yellow', backgroundColor: 'Black', text: 'sans-serif' }}>Saved Posts </h1>

            {data.map(index =>
                <div key={index} className="box22"  >
                    <table className='table22'>
                        <tr>
                            <td className='tdcls'>Email : {index.email}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Text : {index.text}</td>
                        </tr>
                        {/* <button className='thumbsup' onClick={(event) => { upvote(event, index) }}>
                    <i className="fa fa-thumbs-up" ></i>
                </button>
                <button className='thumbsdown' onClick={(event) => { downvote(event, index) }}>
                    <i className="fa fa-thumbs-down" ></i>

                </button> */}
                        <tr>
                            <td className='tdcls'>Votes : {index.like.length - index.dislike.length}</td>

                            {/* <td className='tdcls'>Votes : {index.dislike}</td> */}

                        </tr>
                        <tr>
                            <td className='tdcls'>Comments : {index.comments}</td>

                        </tr>

                        <div>

                            {/* <button type="button" className="btn btn-primary" style={{ marginTop: '2%' }} onClick={(event) => { addFollower(event, index) }}>FOLLOW</button> */}
                            <Button onClick={(event) => { handleDelete(event, index) }}>DELETE</Button>
                        </div>
                    </table>

                    {/* {index.join == 0 && index.leave == 0 && index.alreadyleft == 0 && <button type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >YOU ARE CREATOR</button>}
        {index.join != 0 && index.alreadyleft == 0 && <button onClick={(event) => { joinSubg(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >JOIN</button>}
        {index.alreadyleft != 0 && <button onClick={(event) => { alertevent(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >SORRY YOU CANNOT JOIN</button>}
        {index.join == 0 && index.leave == 1 && <button onClick={(event) => { leaveSubg(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >LEAVE</button>} */}

                    {/* <button onClick={(event) => { handleDelete(event, index) }} type="button" className="btn btn-primary" style={{ marginTop: '5%' }}>DELETE</button> */}
                </div >
            )
            }
        </div >
    );


};