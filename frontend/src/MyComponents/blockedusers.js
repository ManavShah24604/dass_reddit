import { useState, useEffect } from 'react';
import "./Dashboard.css"
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './MySubgNavBar'
import Countdown from 'react-countdown';
import { SouthAmerica } from '@mui/icons-material';

export default function Blockedusers() {

    const [data, setData] = useState([]);
    var myobj = JSON.parse(localStorage.getItem('mysubg'));

    const [myvar, setmyvar] = useState();
    useEffect(() => {
        console.log(' lsjflsj bhjdlfj fgfefd ');
        axios.post('http://localhost:7000/api/Blockedusers', { _id: myobj._id})
            .then((res) => {
                console.log('this is res. ', res.data);
                // console.log(Math.ceil((new Date().getTime() - data[0].date.getTime()) / 1000))
                // res.data.tosome = res.data.like.length-res.data.dislike.length;
                setData(res.data);
            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })
    }, []);
    // const [ok, setOk] = useState(0);

    
    
    

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
                                BLOCKED USERS 
                            </li>
                            {data.map(index =>
                                // console.log(index.date.getTime());
                                // Math.ceil((new Date().getTime() - new index.date.getTime()/(1000*60))) > 1 &&    
                                // 1 ===1 &&
                                
                                < li href="#" className="list-group-item text-left" >
                                    {/* <label className="name22">
                                        Name : {index.name}<br />
                                    </label> */}
                                    {/* <button >lsmklmdslm</button> */}
                                  
                                    <div className="break"></div>
                                    {/* <p>Reported by : {index.reportedby}</p> */}
                                    <p>BLOCKED: {index}</p>
                                    {/* <p>Concern : {index.concern}</p> */}
                                    {/* <p>Text : {index.text}</p> */}
                                </li>

                                // : <p>Sorry </p>

                            )}
                        </ul>
                    </div>
                </div>
            </div >
        </div >

    );


};