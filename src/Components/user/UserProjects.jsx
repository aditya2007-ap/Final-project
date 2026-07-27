import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaFolderOpen, FaClock, FaRupeeSign, FaPaperPlane, FaSearch, FaBolt } from 'react-icons/fa'
import Swal from 'sweetalert2'

const UserProjects = () => {
  const [projects, setProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [bidAmount, setBidAmount] = useState('')
  const [deliveryDays, setDeliveryDays] = useState('')
  const [proposal, setProposal] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:9000/admin-project-list')
      setProjects(res?.data?.result || [])
    } catch (err) {
      console.error(err)
    }
  }

  const handlePlaceBid = (e) => {
    e.preventDefault()
    if (!bidAmount || !deliveryDays || !proposal) {
      Swal.fire('Incomplete Form', 'Please enter bid amount, delivery time, and proposal letter.', 'warning')
      return
    }

    const info = JSON.parse(localStorage.getItem('info'))
    if (!info || info.credit <= 0) {
      Swal.fire({
        title: 'Insufficient Credits',
        text: 'You have 0 bidding credits left. Please purchase a credit plan to continue bidding.',
        icon: 'error'
      })
      return
    }

    // Deduct 1 credit
    const updatedInfo = { ...info, credit: (info.credit || 10) - 1 }
    localStorage.setItem('info', JSON.stringify(updatedInfo))

    Swal.fire({
      title: 'Bid Placed!',
      text: `Your proposal of ₹${bidAmount} for "${selectedProject?.title}" was submitted successfully. 1 credit deducted.`,
      icon: 'success'
    })

    setSelectedProject(null)
    setBidAmount('')
    setDeliveryDays('')
    setProposal('')
  }

  const filtered = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <span className="dash-eyebrow">Zentora Jobs</span>
          <h2 className="dash-heading d-flex align-items-center gap-2">
            <FaFolderOpen className="text-primary" /> Browse Live Client Projects
          </h2>
        </div>
        <div className="input-group" style={{ maxWidth: '300px' }}>
          <span className="input-group-text bg-white">
            <FaSearch className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="row g-4">
        {filtered && filtered.length > 0 ? (
          filtered.map((proj, idx) => (
            <div className="col-12" key={proj._id || idx}>
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-2">
                  <div>
                    <h4 className="fw-bold m-0">{proj.title}</h4>
                    <span className="small text-muted">Posted {proj.createdAt ? new Date(proj.createdAt).toLocaleDateString() : 'Recently'}</span>
                  </div>
                  <div className="text-end">
                    <span className="fs-4 fw-bold text-color1">₹{proj.budget}</span>
                    <div className="small text-muted d-flex align-items-center gap-1">
                      <FaClock /> Timeline: {proj.timeline || proj.duration || proj.time || 'Flexible'}
                    </div>
                  </div>
                </div>

                <p className="text-muted small mb-4">{proj.description || proj.desc || 'No description provided.'}</p>

                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <span className="badge bg-light text-dark border">1 Credit Per Bid</span>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(proj)}
                    className="btn btn-primary px-4 py-2 fw-bold rounded-pill d-inline-flex align-items-center gap-2"
                  >
                    <FaPaperPlane /> Place Bid Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5 text-muted">
            <h4>No active projects found matching your search.</h4>
          </div>
        )}
      </div>

      {/* Place Bid Modal */}
      {selectedProject && (
        <div className="modal show d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Submit Bid for {selectedProject.title}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedProject(null)}></button>
              </div>
              <form onSubmit={handlePlaceBid}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Your Bid Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 45000"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Estimated Delivery Time</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 10 Days"
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Cover Proposal Letter</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Explain why you are the best fit for this project..."
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                      required
                    />
                  </div>
                  <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-2 small text-muted">
                    <FaBolt className="text-warning fs-5" /> Bidding will deduct 1 credit from your account balance.
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light" onClick={() => setSelectedProject(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary fw-bold px-4">
                    Submit Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProjects
