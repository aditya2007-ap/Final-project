import React, { useEffect, useState } from 'react'
import { FaGavel, FaCheck, FaTimes, FaSearch } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

const AdminBids = () => {
  const [bids, setBids] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:9000/admin-bids-list')
      setBids(res?.data?.result || [])
    } catch (err) {
      console.error('Error fetching admin bids:', err)
    }
  }

  const handleStatus = async (bidId, status) => {
    try {
      const res = await axios.put('http://localhost:9000/admin-bid-action', { bidId, status })
      if (res?.data?.success) {
        Swal.fire({
          title: "Bid Status Updated",
          text: res?.data?.message || `Bid marked as ${status}`,
          icon: "success"
        })
        fetchData()
      } else {
        Swal.fire({
          title: "Notice",
          text: res?.data?.message || "Failed to update bid status",
          icon: "warning"
        })
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Error updating bid status",
        icon: "error"
      })
    }
  }

  const filteredBids = bids.filter(
    (b) =>
      (b.projectTitle && b.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.freelancerName && b.freelancerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.clientName && b.clientName.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container py-5">
      <div className="row mb-4" data-aos="fade-down">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora Admin</span>
          <h2 className="dash-heading d-flex align-items-center gap-2">
            <FaGavel className="text-danger" /> Bidding &amp; Proposal Monitoring
          </h2>
        </div>
      </div>

      <div className="dash-card bg-white p-4 rounded-4 shadow-sm border" data-aos="fade-up" data-aos-duration="800">
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
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBids && filteredBids.length > 0 ? (
                filteredBids.map((item) => (
                  <tr key={item._id}>
                    <td className="fw-bold text-secondary small">{item._id ? item._id.substring(0, 8) + '...' : 'N/A'}</td>
                    <td className="fw-semibold">{item.projectTitle}</td>
                    <td>{item.freelancerName}</td>
                    <td>{item.clientName}</td>
                    <td className="fw-bold text-success">₹{item.amount}</td>
                    <td className="small text-muted">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 rounded-pill ${
                          item.status === 'accept' || item.status === 'Accepted'
                            ? 'bg-success'
                            : item.status === 'reject' || item.status === 'Rejected'
                            ? 'bg-danger'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {item.status === 'accept' ? 'Accepted' : item.status === 'reject' ? 'Rejected' : item.status || 'Pending'}
                      </span>
                    </td>
                    <td>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-success me-2" 
                        title="Approve Bid"
                        onClick={() => handleStatus(item._id, 'accept')}
                      >
                        <FaCheck /> Accept
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-danger" 
                        title="Reject Bid"
                        onClick={() => handleStatus(item._id, 'reject')}
                      >
                        <FaTimes /> Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    No bids found on the platform.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminBids
