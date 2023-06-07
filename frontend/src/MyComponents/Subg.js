import React, { useEffect, useState, useReducer, useMemo } from 'react';
import axios from 'axios';
// import './Mysubg.css'
import { Link } from "react-router-dom";
import Fuse from 'fuse.js';

import { useNavigate } from "react-router-dom";
import './Subg.css'
import Header from './MySubgNavBar'
import { WindowSharp } from '@mui/icons-material';
import { render } from '@testing-library/react';
import { loadConfig } from '@babel/core/lib/config/files';
// import { query } from 'express';
// import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';

export default function Subg() {


    var keeptrack = [];
    const [check, setCheck] = useState(0);
    var email = JSON.parse(localStorage.getItem('myobj')).email;
    const navigate = useNavigate();
    function handlesubmit() {
        const nav = () => navigate('/mysubgform');
        nav();
    }
    const [data, setData] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [tags, setTags] = useState("");

    async function handleDelete(e, ind) {
        e.preventDefault();
        const res = axios.post('http://localhost:7000/api/mysubgDelete', ind);
        setData((data) => data.filter((_, index) => data[index] != ind));
        keeptrack = data;
    }
    async function handleOpen(e, ind) {

    }
    function ascending(event) {
        event.preventDefault();
        var temparr = data;
        const temparr2 = temparr.sort((a, b) => (a.name < b.name) ? -1 : 1);
        setCheck(1);
        setData(temparr2.filter((ele) => {
            return 1;
        }));
        console.log('this is ', data);
        forceUpdate()
    }
    function descending() {
        var temparr = data;
        temparr.sort((a, b) => a.name.localeCompare(b.name))
        temparr.reverse();
        setCheck(1);
        setData(temparr);
        console.log('this is ', data);
        forceUpdate()
    }
    function peopledesc() {
        console.log('this is data ', data);
        console.log('ot do ');
        var temparr = data;
        temparr.sort((a, b) => {
            if (a.permanent.length > b.permanent.length) {
                return -1;
            }
            return 1;
        })
        setData(temparr);
        forceUpdate();

    }
    function historydesc() {
        setCheck(1);
        axios.post('http://localhost:7000/api/subgdata', {})
            .then((res) => {
                // console.log(res.data);
                var temparr = res.data;
                temparr.reverse();
                setData(temparr);
            })
    }

    const updateTags = e => {
        setTags({
            ...tags,
            [e.target.name]: e.target.value
        })

        // console.log(data)
    }

    const handleTags = e => {

        e.preventDefault();
        // console.log(JSON.stringify(tags))
        var tempstr = tags.tagName;
        console.log(tempstr)
        if (tags == '') {
            return;
        }
        var tagarr = tempstr.split(',');
        console.log(tagarr);
        var finalarr = [];
        for (var i = 0; i < tagarr.length; i++) {
            console.log(tagarr[i]);
            for (var j = 0; j < data.length; j++) {
                if (data[j].tags == undefined) {
                    continue
                }
                var datatagarr = JSON.stringify(data[j].tags).split(',');
                for (var k = 0; k < datatagarr.length; k++) {
                    // console.log(datatagarr[k], " ", tagarr[i]);
                    var tempstrfordata = '';


                    for (var t = 0; t < datatagarr[k].length; t++) {
                        // if(t==datatagarr[k].length-1 && datatagarr)
                        if (datatagarr[k][t] == '"') {
                            continue
                        }
                        tempstrfordata += (datatagarr[k][t]);
                    }

                    console.log('tempstrdata  ', tempstrfordata);
                    if (tempstrfordata == tagarr[i]) {
                        console.log('her ');
                        finalarr.push(data[j]);
                        break;
                    }
                }
            }
        }
        console.log('finally ', finalarr);
        const distinctarr = [...new Set(finalarr)];
        // console.log(distinctarr);
        setData(distinctarr);
    }

    async function joinSubg(e, index) {
        e.preventDefault();
        console.log(index);
        var toSend = {
            email: JSON.parse(localStorage.getItem('myobj')).email,
            _id: index._id
        }
        console.log(toSend);
        const res = await axios.post('http://localhost:7000/api/joinsubg', toSend);
        alert('Join Request Sent');
        window.location.reload(false);
    }
    async function alertevent(e, index) {
        e.preventDefault();

        alert('Sorry, you cannot join as you alread left');
        window.location.reload(false);

    }
    const [tempcpy, setCopy] = useState();
    useEffect(() => {
        // var email = JSON.parse(localStorage.getItem('myobj')).email
        axios.post('http://localhost:7000/api/subgdata', {})
            .then((res) => {
                console.log('this is ', res.data);
                keeptrack = res.data
                setCopy(res.data);
                setData(res.data);
            })
        // }
        // fetchData();
    }, []);

    // useMemo(() => data.slice().sort((a, b) => {
    //     if (a.join == 0 && a.leave == 0 && a.alreadyleft == 0) {
    //         return 1;
    //     }
    //     return (a.leave - b.leave > 0) ? -1 : 1
    // }), [data]);


    // useEffect(() => {
    //     // var email = JSON.parse(localStorage.getItem('myobj')).email
    //     var someobj = [...data];
    //     someobj.sort((a, b) => {

    //     });
    //     console.log('this is some obj ', someobj);
    //     setData(someobj);

    // }, []);

    const [query, setQuery] = useState({});
    const handleSearch = e => {
        const fuse = new Fuse(tempcpy, {

            includeScore: true,
            keys: [
                'name',
            ],
        });

        console.log(e.target.value);
        var tempstr = e.target.value;
        // console.log(query);
        if (tempstr.length == 0) {
            axios.post('http://localhost:7000/api/subgdata', {})
                .then((res) => {
                    // console.log(res.data);
                    keeptrack = res.data
                    setCopy(res.data);
                    // console.log(' in ', );
                    setData(res.data);
                })

        }
        else {
            const result = fuse.search(tempstr);
            console.log(tempstr, "  hi ", result)
            const characterResult = result.map(result => result.item);
            console.log(characterResult);
            setData(characterResult);
            forceUpdate();
            // console.log('hii here', characterResult, " ")
        }
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        });
    }


    var email = JSON.parse(localStorage.getItem('myobj')).email;
    for (var i = 0; i < data.length; i++) {
        data[i].join = 1;
        data[i].leave = 0;
        data[i].alreadyleft = 0;
        data[i].requestSent = 0;
        if (data[i].email == email) {
            data[i].join = 0;
            data[i].alreadyleft = 0;
            data[i].leave = 0;
            continue;
        }
        else {
            for (var j = 0; j < data[i].permanent.length; j++) {
                if (email == data[i].permanent[j]) {
                    data[i].join = 0;
                    data[i].leave = 1;
                    data[i].alreadyleft = 0;
                    break;
                }
            }
            for (var j = 0; j < data[i].followers.length; j++) {
                if (email == data[i].followers[j]) {
                    data[i].join = 0;
                    data[i].leave = 1;
                    data[i].alreadyleft = 0;
                    data[i].requestSent = 1;

                    break;
                }
            }
            for (var j = 0; j < data[i].left.length; j++) {
                if (email == data[i].left[j]) {
                    data[i].join = 0;
                    data[i].leave = 0;
                    data[i].alreadyleft = 1;
                    break;
                }
            }


        }




    }
    console.log('this is added ', data);


    async function openNew(e, index) {
        if (index.requestSent == 1) {
            return;
        }
        else if ((index.join == 0 && index.leave == 0 && index.alreadyleft == 0) || (index.join == 0 && index.leave == 1)) {
            e.preventDefault();
            console.log('hi working ', index);
            localStorage.setItem('toopen', JSON.stringify(index));
            const nav = () => navigate('/subgpage');
            nav();
        }
    }



    async function leaveSubg(e, index) {
        e.stopPropagation()
        e.preventDefault();
        console.log(index);
        var toSend = {
            email: JSON.parse(localStorage.getItem('myobj')).email,
            _id: index._id
        }
        console.log(toSend);
        const res = await axios.post('http://localhost:7000/api/leavesubg', toSend);
        window.location.reload(false);
    }
    const cmpfunc = (a, b) => {
        if (check == 1) {
            return -1;
        }
        if (a.join == 0 && a.leave == 0 && a.alreadyleft == 0) {
            return -1;
        }
        return (a.leave - b.leave > 0) ? -1 : 1
    }



    return (
        <div>
            <Header />
            <div style={{ positon: 'fixed' }}>
                <nav>
                    <div className="container-fluid">


                        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                        <div className='somerandom'>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button type="button" className="btn btn-primary" onClick={ascending} style={{ marginRight: '3%' }}>Sort Ascending by name</button>
                                    <button type="button" className="btn btn-primary" onClick={descending} style={{ marginRight: '3%' }}>Sort descending by name</button>
                                    <button type="button" className="btn btn-primary" onClick={peopledesc} style={{ marginRight: '3%' }}>Sort descending by followers</button>
                                    <button type="button" className="btn btn-primary" onClick={historydesc} style={{ marginRight: '3%' }}>sort by creationTime Descending</button>


                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
            <div>

                <div className='divclss'>
                    <center>
                        <label for="tags" className='tagscls'>Tags</label>
                    </center>
                    <input type="text" className="input-box" placeholder='Please enter comma seprated' onChange={updateTags} name='tagName' />
                    <center>
                        <button type="button" className="btn btn-primary" onClick={handleTags}>Submit Tags</button>
                    </center>

                </div>
                <div className='divcls23'>
                    <input name='search' className="form-control me-2" type="search" placeholder="Fuzzy-Search" aria-label="Search" onChange={handleSearch} value={query.search} />
                </div>
            </div>



            {data.sort(cmpfunc).map(index =>
                <div key={index} className="box22" onClick={(event) => { openNew(event, index) }}>
                    <table className='table22'>
                        <tr>
                            <td className='headcls'>Name : {index.name}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Description : {index.description}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Tags : {index.tags}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Banned Keywords : {index.bannedKeywords}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Number of people : {index.permanent.length}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Number of Posts : {index.posts}</td>
                        </tr>
                        {/* <tr>
                            <td className='tdcls'>Number of Posts : {index.posts}</td>
                        </tr> */}
                    </table>

                    {index.requestSent == 0 && index.join == 0 && index.leave == 0 && index.alreadyleft == 0 && <button type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >YOU ARE CREATOR</button>}
                    {index.requestSent == 0 && index.join != 0 && index.alreadyleft == 0 && <button onClick={(event) => { joinSubg(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >JOIN</button>}
                    {index.requestSent == 0 && index.alreadyleft != 0 && <button onClick={(event) => { alertevent(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >SORRY YOU CANNOT JOIN</button>}
                    {index.requestSent == 0 && index.join == 0 && index.leave == 1 && <button onClick={(event) => { leaveSubg(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >LEAVE</button>}
                    {index.requestSent == 1 && <button type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }} >REQUEST ALREADY SENT</button>}
                    {/* <button onClick={(event) => { handleDelete(event, index) }} type="button" className="btn btn-primary" style={{ marginTop: '5%' }}>DELETE</button> */}
                </div >
            )}

        </div>

    );

};