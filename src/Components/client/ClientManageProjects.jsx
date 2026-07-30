import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaEye, FaPlus, FaBriefcase, FaClock, FaGavel, FaRupeeSign } from 'react-icons/fa'
import { MdManageAccounts } from "react-icons/md";
import axios from 'axios'

const ClientManageProjects = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const info = JSON.parse(localStorage.getItem('info'));
    const clientId = info?._id || info?.id;
    const res = await axios.get(`http://localhost:9000/client-project-list?clientId=${clientId}`)
    console.log(res?.data?.result)
    setData(res?.data?.result || [])
  }

  return (
    <div className="container py-5">
      {/* Header Banner */}
      <div className="row align-items-center mb-5 g-3">
        <div className="col-md-8">
          <span className="badge bg-primary mb-2 px-3 py-2 rounded-pill fw-bold text-uppercase">
            Zentora Employer Portal
          </span>
          <h2 className="display-6 fw-bold mb-2 text-dark">Your Posted Projects</h2>
          <p className="text-secondary lead fs-6 m-0">
            Manage your live job posts, track incoming freelancer proposals, and review candidate bids.
          </p>
        </div>
        <div className="col-md-4 text-md-end">
          <Link to="/client-post-project" className="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2">
            <FaPlus /> Post New Project
          </Link>
        </div>
      </div>

      {/* Glassmorphic Project Cards Grid */}
      <div className="row g-4">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div className="col-lg-6 col-md-12" key={item?._id || index}>
              <div className="card h-100 border-0 p-4 rounded-4 shadow-sm client-project-glass-card">
                {/* Top Title & Budget Row */}
                <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
                  <div>
                    <span className="badge bg-success-subtle text-success mb-2 px-3 py-1 rounded-pill fw-semibold small">
                      <FaBriefcase className="me-1" /> Active Post
                    </span>
                    <h4 className="fw-bold text-dark mb-1 client-project-title">{item?.title}</h4>
                  </div>
                  <div className="text-end flex-shrink-0">
                    <span className="fs-4 fw-bold text-success d-block">₹{item?.budget}</span>
                    <small className="text-muted fw-semibold">Budget</small>
                  </div>
                </div>

                {/* Description */}
                <p className="text-secondary small mb-4 client-project-desc flex-grow-1">
                  {item?.description || item?.desc || 'No detailed description provided.'}
                </p>

                {/* Meta Badges */}
                <div className="d-flex flex-wrap align-items-center justify-content-between pt-3 border-top gap-3">
                  <div className="d-flex align-items-center gap-3 text-muted small">
                    <span className="d-flex align-items-center gap-1 fw-medium">
                      <FaClock className="text-primary" /> {item?.timeline || item?.duration || 'Flexible'}
                    </span>

                  </div>

                  {/* Actions */}
                  <div className="d-flex align-items-center gap-2">
                    <button
                      onClick={() => {
                        navigate('/client-Review-bids', { state: item })
                      }}
                      type="button"
                      className="btn btn-sm btn-primary fw-bold px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1"
                    >
                      <MdManageAccounts className="fs-5" /> Review Bids
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger fw-semibold px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="p-5 bg-white rounded-4 shadow-sm border">
              <FaBriefcase className="text-muted fs-1 mb-3" />
              <h5 className="text-muted fw-bold">No posted projects yet</h5>
              <p className="text-secondary small mb-4">Click below to create your first project posting and receive freelancer bids.</p>
              <Link to="/client-post-project" className="btn btn-primary fw-bold px-4 py-2 rounded-pill">
                <FaPlus className="me-1" /> Post a Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientManageProjects