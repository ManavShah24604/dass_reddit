import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mysubg.css'
import { useNavigate } from "react-router-dom";
import './MysubGreddit.css'
import Header from './MySubgNavBar'
import { LocalLaundryService } from '@mui/icons-material';
export default function Subg() {
    const navigate = useNavigate();
    function handlesubmit() {
        const nav = () => navigate('/mysubgform');
        nav();
    }

    async function handleDelete(e, ind) {
        e.preventDefault();
        const res = axios.post('http://localhost:7000/api/mysubgDelete', ind);
        setData((data) => data.filter((_, index) => data[index] != ind));

    }
    async function handleOpen(e, ind) {
        localStorage.setItem('mysubg', JSON.stringify(ind));
        const nav = () => navigate('/mysubgparticular');
        nav();
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        var email = JSON.parse(localStorage.getItem('myobj')).email
        axios.post('http://localhost:7000/api/mysubgdata', { email: email })
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
        // }
        // fetchData();
    }, []);

   
    return (
        <div>
            <Header />
            <center style={{ marginTop: '2%' }}>
                <button type="button" class="btn btn-primary btn-lg" onClick={handlesubmit}>Create New My Sub-Greddit</button>
                {/* <button type="text" className="submit" >Make New Sub-Greddit</button> */}
            </center>

            {data.map((index) =>
                <div className="box22" >
                    <table className='table22'>
                        <tr>
                            <td className='headcls'>Name : {index.name}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Description : {index.description}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Banned Keywords : {index.bannedKeywords}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Number of people : {index.people}</td>
                        </tr>
                        <tr>
                            <td className='tdcls'>Number of Posts : {index.posts}</td>
                        </tr>
                    </table>
                    <button onClick={(event) => { handleOpen(event, index) }} type="button" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '5%' }}>OPEN</button>
                    <button onClick={(event) => { handleDelete(event, index) }} type="button" className="btn btn-primary" style={{ marginTop: '5%' }}>DELETE</button>
                </div >
            )}

        </div>

    );
};