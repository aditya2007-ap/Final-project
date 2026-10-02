import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

const Error = () => {
  return (
    <div className="container py-5 text-center d-flex flex-column align-items-center justify-content-center min-vh-75">
      <div className="mb-4" data-aos="zoom-in">
        <img
          src="/err3.webp"
          alt="404 Page Not Found"
          className="img-fluid"
          style={{ maxWidth: '420px', height: 'auto' }}
        />
      </div>
      <h1 className="display-5 fw-bold text-dark mb-2">404 - Page Not Found</h1>
      <p className="text-secondary lead fs-6 mb-4" style={{ maxWidth: '520px' }}>
        Oops! The page you are looking for might have been moved, renamed, or no longer exists on Zentora.
      </p>
      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <Link to="/" className="btn btn-primary px-4 py-2 rounded-pill fw-bold d-inline-flex align-items-center gap-2 shadow-sm">
          <FaHome /> Back to Home
        </Link>
        <Link to="/user-project" className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-2">
          <FaArrowLeft /> Explore Projects
        </Link>
      </div>
    </div>
  );
};

export default Error;

