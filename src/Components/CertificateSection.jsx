import React from 'react'
import { FaCertificate, FaShieldAlt, FaUserCheck, FaLock } from 'react-icons/fa'

const CertificateSection = () => {
  return (
    <div className="certificate-section py-5 bg-white border-top border-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right" data-aos-duration="900">
            <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">Verified &amp; Certified</span>
            <h2 className="fw-bold mb-3">Guaranteed Quality &amp; Verified Skill Certifications</h2>
            <p className="text-muted mb-4">
              Zentora evaluates and certifies freelancers through technical skill assessments, background verification, and project history checks so you can hire with total confidence.
            </p>
            <div className="row g-3">
              <div className="col-sm-6" data-aos="fade-up" data-aos-delay="200">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                  <FaUserCheck className="text-success fs-3" />
                  <div>
                    <h6 className="fw-bold mb-0">ID Verified</h6>
                    <small className="text-muted">Government Identity Check</small>
                  </div>
                </div>
              </div>
              <div className="col-sm-6" data-aos="fade-up" data-aos-delay="300">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                  <FaCertificate className="text-warning fs-3" />
                  <div>
                    <h6 className="fw-bold mb-0">Skill Certified</h6>
                    <small className="text-muted">Proved Coding &amp; Design Skills</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200" data-aos-duration="900">
            <div className="p-4 p-md-5 bg-dark text-white rounded-4 shadow">
              <div className="d-flex align-items-center gap-3 mb-3">
                <FaLock className="text-warning fs-2" />
                <h4 className="fw-bold mb-0 text-white">Payment Escrow Protection</h4>
              </div>
              <p className="text-white-50">
                Your project budget is safely held in escrow and only released when you approve completed project deliverables. Zero financial risk for client hires.
              </p>
              <hr className="border-secondary my-4" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="small text-white-50">100% Money-Back Guarantee</span>
                <span className="badge bg-success px-3 py-2">Protected Contract</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateSection
