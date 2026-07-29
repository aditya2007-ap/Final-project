import React from 'react'
import { FaCheckCircle, FaUsers, FaProjectDiagram, FaAward, FaGlobe, FaShieldAlt } from 'react-icons/fa'

const AboutUs = () => {
  return (
    <div className="about-page py-5 bg-light">
      <div className="container">
        {/* Header Section */}
        <div className="row text-center mb-5">
          <div className="col-lg-8 mx-auto">
            <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill fw-bold text-uppercase mb-3">About Zentora</span>
            <h1 className="display-5 fw-bold mb-3">Where Top Talent Meets Global Opportunity</h1>
            <p className="lead text-muted">
              Zentora is a premier freelance marketplace connecting ambitious companies with vetted freelancers, digital creators, and tech experts worldwide.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <div className="icon-wrapper mb-3 text-primary display-5">
                <FaGlobe />
              </div>
              <h4 className="fw-bold mb-2">Global Network</h4>
              <p className="text-muted">
                Connect with talented professionals across 150+ countries delivering high-quality work on tight deadlines.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <div className="icon-wrapper mb-3 text-success display-5">
                <FaShieldAlt />
              </div>
              <h4 className="fw-bold mb-2">Secure Transactions</h4>
              <p className="text-muted">
                Our credit system and milestone payments protect both clients and freelancers every step of the project.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <div className="icon-wrapper mb-3 text-warning display-5">
                <FaAward />
              </div>
              <h4 className="fw-bold mb-2">Vetted Quality</h4>
              <p className="text-muted">
                Every freelancer profile is verified with rating reviews, skill badges, and past client feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="row align-items-center mb-5 bg-white p-4 p-md-5 rounded-4 shadow-sm">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <span className="text-danger fw-bold text-uppercase small">Our Mission</span>
            <h2 className="fw-bold mb-3">Empowering the Future of Remote &amp; Freelance Work</h2>
            <p className="text-muted mb-4">
              We build tools that simplify hiring, proposal management, and transparent project tracking so businesses can scale quickly and freelancers can grow sustainable careers.
            </p>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaCheckCircle className="text-success" /> Verified client &amp; freelancer profiles
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaCheckCircle className="text-success" /> Transparent credit &amp; bidding marketplace
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaCheckCircle className="text-success" /> 24/7 dedicated support &amp; resolution center
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="row g-3 text-center">
              <div className="col-6">
                <div className="p-4 bg-danger bg-opacity-10 rounded-4">
                  <h2 className="fw-bold text-danger mb-1">10,000+</h2>
                  <p className="text-muted m-0 small fw-semibold">Active Freelancers</p>
                </div>
              </div>
              <div className="col-6">
                <div className="p-4 bg-primary bg-opacity-10 rounded-4">
                  <h2 className="fw-bold text-primary mb-1">5,000+</h2>
                  <p className="text-muted m-0 small fw-semibold">Projects Completed</p>
                </div>
              </div>
              <div className="col-6">
                <div className="p-4 bg-success bg-opacity-10 rounded-4">
                  <h2 className="fw-bold text-success mb-1">98.5%</h2>
                  <p className="text-muted m-0 small fw-semibold">Client Satisfaction</p>
                </div>
              </div>
              <div className="col-6">
                <div className="p-4 bg-warning bg-opacity-10 rounded-4">
                  <h2 className="fw-bold text-warning mb-1">150+</h2>
                  <p className="text-muted m-0 small fw-semibold">Countries Reached</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
