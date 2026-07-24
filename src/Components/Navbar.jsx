import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
<div className='row'>
  <div className="col-sm-2"></div>
  <div className="col-sm-8 menu">
        <nav className="navbar navbar-expand-lg navbar-light ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      FreeLancing <b className='text-color1'>24X7</b>
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about-us">
            About Us
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/services">
            Services
          </Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link" to="/pricing">
            Pricing
          </Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link" to="/contact-us">
            Contact us
          </Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
         <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
       
      </ul>
    </div>
  </div>
</nav>

  </div>
  <div className="col-sm-2"></div>
</div>
    </>
  )
}

export default Navbar
