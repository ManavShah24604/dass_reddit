
import { loadConfig } from '@babel/core/lib/config/files';
import './joiningpage.css'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './MySubgNavBar'
export default function Users() {
    var myobj = "invalid";
    myobj = JSON.parse(localStorage.getItem('mysubg'));
    // console.log('this is printing', myobj)

    const [data, setData] = useState([]);


    useEffect(() => {
        axios.post('http://localhost:7000/api/permanent', { _id: myobj._id })
            .then((res) => {
                console.log('coming herr ', res.data)
                setData(res.data);

            })
    }, []);


    return (
        <div>

            <Header togo={'musubg'} />
            <div className='handlemargin'>
                <div className="container bootstrap snippets bootdey">

                    <div className="header">
                        <h3 className="text-muted prj-name">
                            <span className="fa fa-users fa-2x principal-title"></span>
                            USERS
                        </h3>
                    </div>

                    <div className="jumbotron list-content">
                        <ul className="list-group">
                            <li href="#" className="list-group-item title">
                                USERS
                            </li>
                            {data.map(index =>

                                <li href="#" className="list-group-item text-left">
                                    {/* <label className="name22">
                                        Name : {index.name}<br />
                                    </label> */}

                                    <div className="break"></div>
                                    <p>Email : {index}</p>
                                    {/* <p>Age : {index.age}</p>
                                    <p>Phone : {index.phone}</p> */}


                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};