import { useState, useEffect } from 'react';
import "./Dashboard.css"
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './MySubgNavBar'
import Countdown from 'react-countdown';
import { SouthAmerica } from '@mui/icons-material';

export default function ReportData() {

    const [data, setData] = useState([]);
    var myobj = JSON.parse(localStorage.getItem('mysubg'));

    const [myvar, setmyvar] = useState();
    useEffect(() => {
        console.log(' lsjflsj bhjdlfj fgfefd ');
        axios.post('http://localhost:7000/api/ReportData', { subgid: myobj._id })
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

    var date_diff_inseconds = function (date) {
        var dt1 = new Date(date);
        var dt2 = new Date();
        // console.log(dt1,dt2);
        var ans =  Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60*60));
        // console.log('ans is ', ans);
        return ans;
    }

    function block(even, index) {
        console.log(index.date);
        console.log('this is index ', index);
        // myvar = index;
        setmyvar(index);
        // setOk(1);
        var some = index;
        some.state = 2;
        const temp = data.map((c, i) => {
            if (c === index) {
                // Increment the clicked counter
                return some;
            } else {
                // The rest haven't changed
                return c;
            }
        });
        console.log('till here ');
        setData(temp);

    }
    
    function deleteData(event, index) {
        const res = axios.post('http://localhost:7000/api/deletereport', index);
        setData((data) => data.filter((_, ind) => data[ind].postid != index.postid));

    }
    function ignore(event, index) {
        // event.preventdefault();
        console.log('hrer ')
        const res = axios.post('http://localhost:7000/api/ignore', { _id: index._id });
        // index.state=1;
        window.location.reload(false);
    }
    function abort(event, index) {
        window.location.reload(false);
    }
    function checkstate(index) {
        // event.preventdefault();
        console.log('state : ', index.state);
        if (index.state == 1 || index.state==3)
            return 1;
        else
            return 0;
    }
    function check2(index)
    {
        if(index.state==3) return 1;
        else return 0;
    }
    const Completionist = () => <span>USER BLOCKED</span>;


    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            console.log('this is ', myvar);
            // Render a completed state
            const res = axios.post('http://localhost:7000/api/blockuser', myvar);
            window.location.reload(false);
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };

    return (

        <div>

            <Header togo={'musubg'} />
            <div className='handlemargin'>
                <div className="container bootstrap snippets bootdey">

                    <div className="header">
                        <h3 className="text-muted prj-name">
                            <span className="fa fa-users fa-2x principal-title"></span>
                            REPORT PAGE 
                        </h3>
                    </div>

                    <div className="jumbotron list-content">
                        <ul className="list-group">
                            <li href="#" className="list-group-item title">
                                REPORT PAGE
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
                                    < label className="pull-right" >
                                        {
                                            index.state != 2 ? <button disabled={checkstate(index)} className="btn btn-danger" style={{ margin: '2%' }} onClick={(event) => { block(event, index) }}> <i className="fa fa-check-square-o"></i>BLOCK</button> : <button disabled={checkstate(index)} className="btn btn-danger" style={{ margin: '2%' }} onClick={(event) => { abort(event, index) }}>  <Countdown
                                                date={Date.now() + 5000}
                                                renderer={renderer}
                                            />{index.state == 2 && <p>ABORT</p>}</button>
                                        }
                                    </label>
                                    <label className="pull-right">
                                        <button style={{ margin: '2%' }} disabled={checkstate(index)} className="btn btn-danger" onClick={(event) => { deleteData(event, index) }}><i className="fa fa-check-square-o"></i> DELETE POST</button>
                                    </label>
                                    <label className="pull-right">
                                        <button style={{ margin: '2%' }}  disabled={check2(index)} className="btn btn-danger" onClick={(event) => { ignore(event, index) }}><i className="fa fa-check-square-o"></i> IGNORE</button>
                                    </label>
                                    <div className="break"></div>
                                    <p>Reported by : {index.reportedby}</p>
                                    <p>Reported of : {index.reportedof}</p>
                                    <p>Concern : {index.concern}</p>
                                    <p>Text : {index.text}</p>
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