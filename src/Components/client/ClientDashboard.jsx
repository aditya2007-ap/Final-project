import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFolderPlus, FaTasks, FaGavel, FaUserCheck, FaPlus, FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'

const ClientDashboard = () => {
  const [info, setInfo] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('info'))
    const clientId = user?._id || user?.id;
    setInfo(user)
    if (clientId) {
      fetchStats(clientId)
    }
  }, [])

  const fetchStats = async (clientId) => {
    try {
      const res = await axios.get(`http://localhost:9000/client-stats?clientId=${clientId}`)
      if (res?.data?.success) {
        setData(res.data.result)
      }
    } catch (err) {
      console.error('Error fetching client stats:', err)
    }
  }

  return (
    <div className="container py-5">
      {/* Welcome Banner */}
      <div 
        className="p-4 p-md-5 mb-4 rounded-4 text-white shadow-sm position-relative overflow-hidden" 
        style={{ background: 'linear-gradient(135deg, #181818 0%, #ee4a03 100%)' }}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 position-relative z-1">
          <div>
            <span className="badge bg-white text-dark mb-2 font-monospace text-uppercase fw-bold">Client Employer Portal</span>
            <h1 className="fw-bold mb-1 text-white">Welcome back, {info?.name || 'Client'}!</h1>
            <p className="m-0 text-white-50">Post projects, review freelancer proposals, and manage hiring contracts.</p>
          </div>
          <Link to="/client-post-project" className="btn btn-light text-dark fw-bold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm">
            <FaPlus /> Post New Project
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="100">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center h-100 kpi-card">
            <FaFolderPlus className="text-danger fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1 text-dark">{data?.totalProjects ?? 0}</h3>
            <span className="text-muted small fw-semibold">Posted Projects</span>
          </div>
        </div>
        <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="200">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center h-100 kpi-card">
            <FaGavel className="text-primary fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1 text-dark">{data?.totalBids ?? 0}</h3>
            <span className="text-muted small fw-semibold">Proposals Received</span>
          </div>
        </div>
        <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="300">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center h-100 kpi-card">
            <FaUserCheck className="text-success fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1 text-dark">{data?.acceptedBids ?? 0}</h3>
            <span className="text-muted small fw-semibold">Contracts Awarded</span>
          </div>
        </div>
        <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="400">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center h-100 kpi-card">
            <FaCheckCircle className="text-warning fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1 text-dark">{data?.totalProjects ?? 0}</h3>
            <span className="text-muted small fw-semibold">Active Listings</span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="row g-4">
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2 text-dark">Post New Project</h5>
            <p className="text-muted small mb-4">Create job scope, budget, and timeline to receive proposals.</p>
            <Link to="/client-post-project" className="btn btn-outline-danger w-100 mt-auto fw-semibold">
              Post Project Now
            </Link>
          </div>
        </div>
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2 text-dark">Manage Projects</h5>
            <p className="text-muted small mb-4">View your live job postings, update parameters or delete posts.</p>
            <Link to="/client-manage-project" className="btn btn-outline-danger w-100 mt-auto fw-semibold">
              Manage Projects
            </Link>
          </div>
        </div>
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2 text-dark">Review Freelancer Bids</h5>
            <p className="text-muted small mb-4">Evaluate freelancer quotes, ratings, and award project contracts.</p>
            <Link to="/client-Review-bids" className="btn btn-outline-danger w-100 mt-auto fw-semibold">
              Review Bids
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard
