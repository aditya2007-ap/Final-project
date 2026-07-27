import React, { useState } from 'react'
import { FaGavel, FaCheck, FaTimes, FaSearch } from 'react-icons/fa'

const initialBids = [
  { id: 'BID-101', project: 'React Native Mobile App', freelancer: 'John Doe', client: 'TechCorp Inc', amount: '₹45,000', days: '14 Days', status: 'Pending' },
  { id: 'BID-102', project: 'Full Stack Node.js API', freelancer: 'Priya Sharma', client: 'InnovateX', amount: '₹30,000', days: '10 Days', status: 'Accepted' },
  { id: 'BID-103', project: 'Figma UI/UX Redesign', freelancer: 'Alexander Wright', client: 'CloudScale', amount: '₹25,000', days: '7 Days', status: 'Rejected' },
]

const AdminBids = () => {
  const [bids] = useState(initialBids)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBids = bids.filter(
    (b) =>
      b.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.freelancer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora Admin</span>
          <h2 className="dash-heading d-flex align-items-center gap-2">
            <FaGavel className="text-danger" /> Bidding &amp; Proposal Monitoring
          </h2>
        </div>
      </div>

      <div className="dash-card bg-white p-4 rounded-4 shadow-sm border">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h4 className="fw-bold m-0">All Platform Bids ({filteredBids.length})</h4>
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-light border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search bids..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table dash-table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Bid ID</th>
                <th>Project</th>
                <th>Freelancer</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Est. Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBids.map((item) => (
                <tr key={item.id}>
                  <td className="fw-bold text-secondary">{item.id}</td>
                  <td className="fw-semibold">{item.project}</td>
                  <td>{item.freelancer}</td>
                  <td>{item.client}</td>
                  <td className="fw-bold text-success">{item.amount}</td>
                  <td>{item.days}</td>
                  <td>
                    <span
                      className={`badge px-3 py-2 rounded-pill ${
                        item.status === 'Accepted'
                          ? 'bg-success'
                          : item.status === 'Rejected'
                          ? 'bg-danger'
                          : 'bg-warning text-dark'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="btn btn-sm btn-outline-success me-2" title="Approve Bid">
                      <FaCheck />
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger" title="Flag / Reject">
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminBids
