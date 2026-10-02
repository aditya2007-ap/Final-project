import { Link } from 'react-router-dom'
import { FaBolt, FaFolderOpen, FaGavel, FaCheckCircle, FaSearch, FaCoins, FaBan } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserDashboard = () => {
  const [data, setData] = useState(null)
  const [info, setInfo] = useState(null)
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('info'))
    setInfo(user)
    if (user?._id) {
      fetchData(user._id)
    }
  }, [])

  const fetchData = async (userId) => {
    try {
      // 1. Fetch user stats
      const res = await axios.get(`http://localhost:9000/user-stats?userId=${userId}`)
      if (res?.data?.success) {
        setData(res.data.result)
      }

      // 2. Fetch fresh profile status to check if blocked by admin
      const profileRes = await axios.get(`http://localhost:9000/get-profile?userId=${userId}`)
      if (profileRes?.data?.success && profileRes.data.result) {
        const u = profileRes.data.result
        const blocked = u.status === 'blocked' || u.status === false || u.status === 'false'
        setIsBlocked(blocked)
        if (blocked) {
          Swal.fire({
            title: 'Blocked by Admin',
            html: `
              <div style="text-align: left; padding: 6px 0;">
                <p style="color: #b91c1c; font-weight: 700; font-size: 1rem; margin-bottom: 8px;">
                  ⚠️ Your Freelancer Account Has Been Suspended
                </p>
                <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin-bottom: 0;">
                  Your account has been blocked by the admin. You are restricted from placing bids on projects. Please contact administrator support for assistance.
                </p>
              </div>
            `,
            icon: 'error',
            confirmButtonText: 'I Understand',
            confirmButtonColor: '#dc2626',
            allowOutsideClick: false
          })
        }
      }
    } catch (err) {
      console.error('Error fetching user stats:', err)
    }
  }

  return (
    <div className="container py-5">
      {/* Blocked by Admin Alert Banner */}
      {isBlocked && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm mb-4 border-danger" data-aos="fade-down">
          <div className="d-flex align-items-center gap-3">
            <FaBan className="fs-2 text-danger flex-shrink-0" />
            <div>
              <h6 className="alert-heading fw-bold mb-1 text-danger">Account Blocked by Admin</h6>
              <p className="small mb-0 text-dark">
                Your freelancer account has been restricted by the administration. You cannot place bids on any client projects.
              </p>
            </div>
          </div>
          <span className="badge bg-danger text-white px-3 py-2 rounded-pill fw-bold">BLOCKED</span>
        </div>
      )}

      {/* Welcome Banner */}
      <div 
        className="p-4 p-md-5 mb-4 rounded-4 text-white shadow-sm position-relative overflow-hidden" 
        style={{ background: isBlocked ? 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)' : 'linear-gradient(135deg, #0d6efd 0%, #198754 100%)' }}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 position-relative z-1">
          <div>
            <span className="badge bg-white text-dark mb-2 font-monospace text-uppercase fw-bold">Freelancer Portal</span>
            <h1 className="fw-bold mb-1 text-white">Welcome back, {info?.name || 'Freelancer'}!</h1>
            <p className="m-0 text-white-50">Browse available client projects, submit competitive bids, and manage your credit balance.</p>
          </div>
          <div className="bg-white text-dark px-4 py-3 rounded-4 shadow d-flex align-items-center gap-3">
            <FaBolt className="text-warning fs-3" />
            <div>
              <small className="text-muted d-block lh-1 fw-semibold">Available Credits</small>
              <strong className="fs-5 text-dark">{data?.credits ?? info?.credit ?? 0} Credits</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="100">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center h-100 kpi-card">
            <FaCoins className="text-warning fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1 text-dark">{data?.credits ?? 0}</h3>
            <span className="text-muted small fw-semibold">Bidding Credits</span>
          </div>
        </div>
        <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="200">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center h-100 kpi-card">
            <FaGavel className="text-primary fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1 text-dark">{data?.totalBids ?? 0}</h3>
            <span className="text-muted small fw-semibold">Total Bids Placed</span>
          </div>
        </div>
        <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="300">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center h-100 kpi-card">
            <FaCheckCircle className="text-success fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1 text-dark">{data?.acceptedBids ?? 0}</h3>
            <span className="text-muted small fw-semibold">Accepted Bids</span>
          </div>
        </div>
        <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="400">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center h-100 kpi-card">
            <FaBolt className="text-danger fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1 text-dark">₹{data?.Earning ?? 0}</h3>
            <span className="text-muted small fw-semibold">Total Earnings</span>
          </div>
        </div>
      </div>

      {/* Navigation Quick Links */}
      <div className="row g-4">
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2 text-dark">Browse Projects</h5>
            <p className="text-muted small mb-4">Discover live project postings from client employers and place your bids.</p>
            <Link to="/user-project" className="btn btn-outline-danger w-100 mt-auto fw-semibold d-inline-flex align-items-center justify-content-center gap-2">
              <FaSearch /> Explore Jobs
            </Link>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2 text-dark">My Submitted Bids</h5>
            <p className="text-muted small mb-4">Track the status of your active proposals and contract approvals.</p>
            <Link to="/user-bids" className="btn btn-outline-danger w-100 mt-auto fw-semibold d-inline-flex align-items-center justify-content-center gap-2">
              <FaGavel /> View My Bids
            </Link>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2 text-dark">Buy Bidding Credits</h5>
            <p className="text-muted small mb-4">Purchase monthly credit packs (Starter, Pro, Elite) to bid on more projects.</p>
            <Link to="/user-plans" className="btn btn-outline-danger w-100 mt-auto fw-semibold d-inline-flex align-items-center justify-content-center gap-2">
              <FaGavel /> Buy Credit Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
