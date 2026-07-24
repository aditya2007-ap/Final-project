import React from 'react'
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <div className="row footer bg-dark">
        <div className="col-sm-3 footercol py-5">
          <Link to='/'><img src="logo-white.svg" alt="" /></Link>
          <p>Zentora - Where Talent meets <br />
            opportunity . the future of <br />
            increasing is here. correct <br />
            collaboration fan</p>
          <p ><b>Add:</b> Lucknow</p>
          <p><b>Call:</b>7266057178</p>
          <p><b>Email:</b>ap8703465@gmail.com</p>
        </div>
        <div className="col-sm-3 py-5">
          <h5>Our Platform</h5>
          <ol className=' footerlists'>
            <li>About</li>
            <li>Browse Projects</li>
            <li>Find Freelancers</li>
            <li>Post a project</li>
            <li>Have it Works</li>
            <li>Success Stories</li>
          </ol>
        </div>
        <div className="col-sm-3 py-5">
          <h6>Links</h6>
          <div className="row footerlinks py-4">
            <Link to='/contact ' className=' footerlinks'>Contact Us</Link>
            <Link to='/home' className=' footerlinks'>Gallery</Link>
            <Link to='/login' className=' footerlinks'>Home</Link>
            <Link to='/' className=' footerlinks' >sign In / Registration </Link>
            <Link to='/' className=' footerlinks'>coming soon</Link>
          </div>
        </div>
        <div className="col-sm-3 pt-5">
          <h6 >Contact Us</h6>
          <p>Enter your email address to register to our newsletter subscription</p>
          <div className="row p-3">
            <input type="email" className='form-control w-50' placeholder='Your Email' />
            <input type="submit" className='btn btn-warning footerbtn w-25' />

          </div>
          <FaInstagram className='text-danger'/>
          <FaFacebook className='text-primary'/>
          <FaLinkedin className='text-primary'/>
          <IoLogoGithub className='text-light'/>

        </div>
        <div className='copyrightbar text-center '>CopyRight 2026 <b className='text-warning'>Zentora</b> Hire-Work all the right reserved</div>
      </div>
    </>
  )
}

export default Footer
