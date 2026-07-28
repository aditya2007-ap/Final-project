import { Link } from 'react-router-dom'
import { FaBolt, FaFolderOpen, FaGavel, FaCheckCircle, FaSearch } from 'react-icons/fa'

const UserDashboard = () => {


  return (
    <div className="container py-5">
      {/* Welcome Banner */}
      <div className="p-4 p-md-5 mb-4 rounded-4 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #198754 100%)' }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <span className="badge bg-white text-dark mb-2 font-monospace text-uppercase">Freelancer Portal</span>
            <h1 className="fw-bold mb-1 text-white">Welcome back, Freelancer!</h1>
            <p className="m-0 text-white-50">Browse available client projects, submit competitive bids, and manage your credit balance.</p>
          </div>
          <div className="bg-white text-dark px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2">
            <FaBolt className="text-warning fs-4" />
            <div>
              <small className="text-muted d-block lh-1">Available Credits</small>
              <strong className="fs-5 " >10 Credits</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}

     <div className="row g-4 mb-5">
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
            <FaFolderOpen className="text-primary fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1">15</h3>
            <span className="text-muted small fw-semibold">Available Jobs</span>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
            <FaGavel className="text-warning fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1">4</h3>
            <span className="text-muted small fw-semibold">Active Bids</span>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
            <FaCheckCircle className="text-success fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1">2</h3>
            <span className="text-muted small fw-semibold">Won Contracts</span>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
            <FaBolt className="text-danger fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1">10</h3>
            <span className="text-muted small fw-semibold">Bidding Credits</span>
          </div>
        </div>
      </div>

      {/* Navigation Quick Links */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2">Browse Projects</h5>
            <p className="text-muted small mb-4">Discover live project postings from client employers and place your bids.</p>
            <Link to="/user-project" className="btn btn-outline-primary w-100 mt-auto fw-semibold d-inline-flex align-items-center justify-content-center gap-2">
              <FaSearch /> Explore Jobs
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 rou">
            <h5 className="fw-bold mb-2">My Submitted Bids</h5>
            <p className="text-muted small mb-4">Track the status of your active proposals and contract approvals.</p>
            <Link to="/user-bids" className="btn btn-outline-primary w-100 mt-auto fw-semibold d-inline-flex align-items-center justify-content-center gap-2">
              <FaGavel /> View My Bids
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2">Buy Bidding Credits</h5>
            <p className="text-muted small mb-4">Purchase monthly credit packs (Starter, Pro, Elite) to bid on more projects.</p>
            <Link to="/user-plans" className="btn btn-outline-primary w-100 mt-auto fw-semibold d-inline-flex align-items-center justify-content-center gap-2">
              < FaGavel/> Buy Credit Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
 
  )}


export default UserDashboard
