import React from 'react'


export const Footer = () => { 
    return (
        <div style={{
            position:'relative',
            left: '0px',
            // bottom: '0px',
            width: '100%',
            outerHeight : '10%',
            top:'92vh'
            // background-color: red;
            // color: white;
        }}>
        <footer className="bg-dark text-light py-3" >
            <p className="text-center">
            Copyright &copy; G-Reddit
            </p>
        </footer>
        </div>
    )
}
