import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFolderPlus, FaTasks, FaGavel, FaUserCheck, FaPlus } from 'react-icons/fa'
import axios from 'axios'

const ClientDashboard = () => {
  const [info, setInfo] = useState(null)
  const [projectsCount, setProjectsCount] = useState(0)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('info'))
    setInfo(user)
    if (user?._id) {
      axios.get(`http://localhost:9000/client-project-list?clientId=${user._id}`)
        .then((res) => setProjectsCount(res?.data?.result?.length || 0))
        .catch(() => {})
    }
  }, [])

  return (
    <div className="container py-5">
      {/* Welcome Banner */}
      <div className="p-4 p-md-5 mb-4 rounded-4 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #181818 0%, #ee4a03 100%)' }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <span className="badge bg-white text-dark mb-2 font-monospace text-uppercase">Client Portal</span>
            <h1 className="fw-bold mb-1 text-white">Welcome back, {info?.name || 'Client'}!</h1>
            <p className="m-0 text-white-50">Post projects, review freelancer proposals, and manage hiring contracts.</p>
          </div>
          <Link to="/client-post-project" className="btn btn-light text-dark fw-bold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2">
            <FaPlus /> Post New Project
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
            <FaFolderPlus className="text-danger fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1">{projectsCount}</h3>
            <span className="text-muted small fw-semibold">Posted Projects</span>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
            <FaGavel className="text-primary fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1">12</h3>
            <span className="text-muted small fw-semibold">Active Bids</span>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
            <FaUserCheck className="text-success fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1">3</h3>
            <span className="text-muted small fw-semibold">Hired Freelancers</span>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white text-center">
            <FaTasks className="text-warning fs-2 mx-auto mb-2" />
            <h3 className="fw-bold mb-1">2</h3>
            <span className="text-muted small fw-semibold">Completed Projects</span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2">Post New Project</h5>
            <p className="text-muted small mb-4">Create job scope, budget, and timeline to receive proposals.</p>
            <Link to="/client-post-project" className="btn btn-outline-danger w-100 mt-auto fw-semibold">
              Post Project Now
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2">Manage Projects</h5>
            <p className="text-muted small mb-4">View your live job postings, update parameters or delete posts.</p>
            <Link to="/client-manage-project" className="btn btn-outline-danger w-100 mt-auto fw-semibold">
              Manage Projects
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white h-100">
            <h5 className="fw-bold mb-2">Review Freelancer Bids</h5>
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
