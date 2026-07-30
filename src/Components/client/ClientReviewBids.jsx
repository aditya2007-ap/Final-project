import { FaGavel, FaStar, FaBriefcase, FaClock, FaRupeeSign, FaMapMarkerAlt, FaTrophy, FaCheckCircle, FaTimesCircle, FaHeart, FaFileAlt } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const ClientReviewBids = () => {
  const location = useLocation()
  return (
    <div className="crb-page">
      <div className="container py-5">

        {/* ========== HEADER ========== */}
        <div className="text-center mb-5">
          <span className="crb-eyebrow">Zentora Client</span>
          <h2 className="crb-main-title">
            Review <span className="crb-highlight">Proposals</span> &amp; Bids
          </h2>
          <p className="crb-subtitle">Evaluate top talent and pick the best freelancer for your project.</p>
        </div>

        {/* ========== STATS ROW ========== */}
        <div className="row g-3 mb-5">

        {/* Total Bids */}
        <div className="col-6 col-md-3">
          <div className="crb-stat-card crb-stat-card-teal">
            <div className="crb-stat-icon"><FaGavel /></div>
            <div className="crb-stat-num">12</div>
            <div className="crb-stat-label">Total Bids</div>
          </div>
        </div>

        {/* Avg Rating */}
        <div className="col-6 col-md-3">
          <div className="crb-stat-card crb-stat-card-amber">
            <div className="crb-stat-icon"><FaStar /></div>
            <div className="crb-stat-num">4.8</div>
            <div className="crb-stat-label">Avg Rating</div>
          </div>
        </div>

        {/* Freelancers */}
        <div className="col-6 col-md-3">
          <div className="crb-stat-card crb-stat-card-blue">
            <div className="crb-stat-icon"><FaBriefcase /></div>
            <div className="crb-stat-num">47</div>
            <div className="crb-stat-label">Freelancers</div>
          </div>
        </div>

        {/* Avg Response */}
        <div className="col-6 col-md-3">
          <div className="crb-stat-card crb-stat-card-purple">
            <div className="crb-stat-icon"><FaClock /></div>
            <div className="crb-stat-num">3d</div>
            <div className="crb-stat-label">Avg Response</div>
          </div>
        </div>
      </div>

        {/* ========== SINGLE BID CARD ========== */}
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            <div className="crb-bid-card">

              {/* Ribbon badge */}
              <div className="crb-bid-ribbon">Top Rated</div>

              {/* Freelancer profile header */}
              <div className="crb-bid-header">
                <div className="crb-avatar">RS</div>
                <div className="crb-header-info">
                  <span className="crb-bid-project">E-Commerce Website</span>
                  <h4 className="crb-bid-name">Rahul Sharma</h4>
                  <span className="crb-bid-role">Full-Stack Developer</span>
                </div>
                <div className="crb-bid-price-box">
                  <span className="crb-bid-amount">
                    <FaRupeeSign className="crb-rupee-icon" />45,000
                  </span>
                  <span className="crb-bid-delivery">
                    <FaClock /> 25 days
                  </span>
                </div>
              </div>

              {/* Proposal section */}
              <div className="crb-proposal-box">
                <div className="crb-proposal-header">
                  <FaFileAlt className="crb-proposal-icon" />
                  <span className="crb-proposal-label">Cover Letter</span>
                </div>
                <p className="crb-proposal-text">
                  I will build a fully responsive e-commerce platform with secure payment gateway, admin panel, and SEO optimization. I bring 4 years of professional experience in the MERN stack and have delivered 47+ projects successfully.
                </p>
              </div>

              {/* Skills tags */}
              <div className="crb-skills-row">
                <span className="crb-skill-tag">React</span>
                <span className="crb-skill-tag">Node.js</span>
                <span className="crb-skill-tag">MongoDB</span>
                <span className="crb-skill-tag">Express</span>
                <span className="crb-skill-tag">REST API</span>
              </div>

              {/* Footer: stats + actions */}
              <div className="crb-bid-footer">
                <div className="crb-bid-footer-info">
                  <span className="crb-info-chip" title="Rating">
                    <FaStar className="text-warning" /> 4.9 (128)
                  </span>
                  <span className="crb-info-chip" title="Location">
                    <FaMapMarkerAlt /> Mumbai, IN
                  </span>
                  <span className="crb-info-chip" title="Completed Projects">
                    <FaTrophy /> 47 jobs
                  </span>
                </div>
                <div className="crb-bid-footer-actions">
                  <button className="crb-btn-accept" title="Hire immediately">
                    <FaCheckCircle /> Accept &amp; Hire
                  </button>
                  <button className="crb-btn-decline" title="Decline bid">
                    <FaTimesCircle /> Decline
                  </button>
                  <button className="crb-btn-save" title="Save to shortlist">
                    <FaHeart />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div >
  )
}

export default ClientReviewBids
