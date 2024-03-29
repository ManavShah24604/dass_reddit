import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header(props) {

  const navigate = useNavigate();
  const submit = e => {
    e.preventDefault();
    // localStorage.setItem('myvar','false');
    if (localStorage.getItem('myvar') == 'false') {
      const nav = () => navigate('/login');
      nav();
    }
    else {
      console.log("her ")
      const nav = () => navigate('/dashboard');
      nav();
    }

    // console.log(response.data);
  };
  return (
    <div style={{ positon: 'fixed' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><i className="fas fa-heart" style={{ fontSize: '36px' }}></i>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i className="fa fa-toggle-down" style={{ fontSize: '36px' }}></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home" title='HOME'><i className="fa fa-home" style={{ fontSize: '35px' }}></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={submit}><i className="fa fa-sign-in" title='Login' style={{ fontSize: '35px' }}></i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login"><i className="fa fa-registered" title='Register' style={{ fontSize: "35px" }}></i>
                </Link>
              </li>
            </ul>
            {props.searchBar ? <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> : ""}
          </div>
        </div>
      </nav>
    </div>
  )
}
Header.defaultProps = {
  title: "G-Reddit",
  searchBar: true
}

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool.isRequired
}