import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { Check } from '@mui/icons-material';

export default function MyVerticallyCenteredModal(props) {

    console.log('this are prps  ', props);
    const [data, setData] = useState('');
    function equalsIgnoringCase(text, other) {
        return text.localeCompare(other, undefined, { sensitivity: 'base' }) === 0;
    }
    const updateData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

        // console.log(data)
    }

    const handlePost = async e => {
        e.preventDefault();
        var temp = data.fname;
        var topass = props.topass
        if(topass==undefined)
        {
            topass='';
        }
        if(temp==undefined)
        {
            temp='';
        }
        
        var banned = topass.split(',');
        var temparr = temp.split(' ');
        var ok = true;
        for (var i = 0; i < banned.length; i++) {
            for (var j = 0; j < temparr.length; j++) {
                if (equalsIgnoringCase(temparr[j],banned[i])) {
                    ok = false;
                    temparr[j] = '*';
                }
            }
        }
        if(temp=='')
        {
            ok=true;
            temparr = temp.split(' ');
        }
        console.log(temparr,banned);
        var topass = '';
        for(var i=0;i<temparr.length;i++)
        {
            topass+=temparr[i];
            topass+=' ';
        }
        var myobj = {
            text: topass,
            email: JSON.parse(localStorage.getItem('myobj')).email,
            ok: true,
            subgid: JSON.parse(localStorage.getItem('toopen'))._id,
            like: 0,
            dislike: 0
        }

        const res = axios.post('http://localhost:7000/api/postData', myobj);

        if (ok == false) {
            alert('Banned Keyword !!!')
        }
        props.onHide();
        window.location.reload(false);
    }
    function check()
    {
        console.log('this is herer lwejfwj ');
        console.log('this is data', data);
        if(data.fname==undefined || data.fname=='')
        {
            return 1;
        }
        else 
        {
            return 0;
        }
        // return 1;
    }




    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Post </h4>
                <label for="fname">Content :</label>
                <input type="text" id="fname" name="fname" onChange={updateData} />
            </Modal.Body>
            <Modal.Footer>
                <Button  onClick={props.onHide}>Close</Button>
                <Button disabled={check()} onClick={handlePost}>POST</Button>


            </Modal.Footer>
        </Modal>
    );
}