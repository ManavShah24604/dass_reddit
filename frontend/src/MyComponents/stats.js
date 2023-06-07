import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from 'react';
import axios from 'axios';


import './stats.css'

// const data = {
//     labels: [],
//     datasets: [],
// };



export default function LineChart2() {
    const [labels, setLabels] = useState([]);
    const [datasets, setDatasets] = useState([]);

    const [labels2, setLabels2] = useState([]);
    const [datasets2, setDatasets2] = useState([]);

    const [labels3, setLabels3] = useState([]);
    const [datasets3, setDatasets3] = useState([]);

    const [labels4, setLabels4] = useState([]);
    const [datasets4, setDatasets4] = useState([]);

    const [data, setData] = useState({});
    useEffect(() => {

        axios.post('http://localhost:7000/api/firstchart', { subgid: JSON.parse(localStorage.getItem('mysubg'))._id })
            .then((res) => {
                console.log('this is res. ', res.data);

                setLabels(res.data.labels)
                setDatasets(res.data.datasets)

            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })

        axios.post('http://localhost:7000/api/secondchart', { subgid: JSON.parse(localStorage.getItem('mysubg'))._id })
            .then((res) => {
                console.log('this is res. ', res.data);

                setLabels2(res.data.labels)
                setDatasets2(res.data.datasets)

            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })

        axios.post('http://localhost:7000/api/fourthchart', { subgid: JSON.parse(localStorage.getItem('mysubg'))._id })
            .then((res) => {
                console.log('this is res. ', res.data);

                setLabels4(res.data.labels)
                setDatasets4(res.data.datasets)

            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })
        
            axios.post('http://localhost:7000/api/thirdchart', { subgid: JSON.parse(localStorage.getItem('mysubg'))._id })
            .then((res) => {
                console.log('this is res. ', res.data);

                setLabels3(res.data.labels)
                setDatasets3(res.data.datasets)

            })
            .catch((err) => {
                console.log("errrrrrrrr");
            })
    }, []);


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className="first22">
                <Line data={{
                    labels: labels, datasets: [{
                        label: "Number of users with time ",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: datasets,
                    }]
                }} />
            </div>
            <div className="first22">
                <Line data={{
                    labels: labels2, datasets: [{
                        label: "POSTS VS DATA",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: datasets2,
                    }]
                }} />
            </div>
            <div className="first22">
                <Line data={{
                    labels: labels3, datasets: [{
                        label: "REPORTS VS DELETE POSTS ",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: datasets3,
                    }]
                }} />
            </div>

            <div className="first22">
                <Line data={{
                    labels: labels4, datasets: [{
                        label: "DAILY VISITORS VS DATE ",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: datasets4,
                    }]
                }} />
            </div>
        </div>
    );
};

// export default LineChart2;