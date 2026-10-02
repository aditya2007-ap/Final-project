import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import Swal from 'sweetalert2';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      Swal.fire({
        title: 'Newsletter',
        text: 'Please enter a valid email address.',
        icon: 'warning'
      });
      return;
    }
    Swal.fire({
      title: 'Subscribed! 🎉',
      text: 'Thank you for subscribing to the Zentora weekly talent digest.',
      icon: 'success'
    });
    setNewsletterEmail('');
  };

  return (
    <>
      <div className="row footer bg-dark mx-0">
        <div className="col-sm-3 footercol py-5" data-aos="fade-up" data-aos-delay="100">
          <Link to='/'><img src="/logo-white.svg" alt="Zentora Logo" /></Link>
          <p className="mt-3">
            Zentora — Where talent meets opportunity. The premier freelance marketplace for global collaboration, verified expertise, and secure escrow contracts.
          </p>
          <p className="mb-1"><b>Location:</b> Lucknow, India</p>
          <p className="mb-1"><b>Support Phone:</b> +91 7266057178</p>
          <p className="mb-0"><b>Email:</b> support@zentora.com</p>
        </div>

        <div className="col-sm-3 py-5" data-aos="fade-up" data-aos-delay="200">
          <h5 className="text-white mb-3">Our Platform</h5>
          <ul className="footerlists list-unstyled">
            <li className="mb-2"><Link to="/about-us" className="text-decoration-none text-light opacity-75">About Us</Link></li>
            <li className="mb-2"><Link to="/user-project" className="text-decoration-none text-light opacity-75">Browse Projects</Link></li>
            <li className="mb-2"><Link to="/client-post-project" className="text-decoration-none text-light opacity-75">Post a Project</Link></li>
            <li className="mb-2"><Link to="/pricing" className="text-decoration-none text-light opacity-75">Freelancer Credit Plans</Link></li>
            <li className="mb-2"><Link to="/services" className="text-decoration-none text-light opacity-75">Marketplace Services</Link></li>
          </ul>
        </div>

        <div className="col-sm-3 py-5" data-aos="fade-up" data-aos-delay="300">
          <h5 className="text-white mb-3">Quick Links</h5>
          <div className="d-flex flex-column gap-2 footerlinks">
            <Link to='/' className="footerlinks">Home</Link>
            <Link to='/services' className="footerlinks">Services</Link>
            <Link to='/pricing' className="footerlinks">Pricing</Link>
            <Link to='/contact-us' className="footerlinks">Contact Us</Link>
            <Link to='/login' className="footerlinks">Sign In</Link>
            <Link to='/register' className="footerlinks">Create Account</Link>
          </div>
        </div>

        <div className="col-sm-3 pt-5" data-aos="fade-up" data-aos-delay="400">
          <h5 className="text-white mb-3">Newsletter</h5>
          <p>Subscribe to our newsletter for featured freelance projects, client hiring tips, and platform updates.</p>
          <form onSubmit={handleNewsletterSubmit} className="d-flex gap-2 p-1 mb-3">
            <input
              type="email"
              className='form-control'
              placeholder='Your Email'
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
            />
            <button type="submit" className='btn btn-warning footerbtn fw-bold px-3'>
              Join
            </button>
          </form>

          <div className="d-flex gap-3 fs-5 mt-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-danger" title="Instagram"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-primary" title="Facebook"><FaFacebook /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-primary" title="LinkedIn"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-light" title="GitHub"><IoLogoGithub /></a>
          </div>
        </div>

        <div className='copyrightbar text-center py-3 border-top border-secondary border-opacity-25 w-100'>
          Copyright &copy; {new Date().getFullYear()} <b className='text-warning'>Zentora</b> Hire-Work. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
