import React from 'react'
import { FaGavel, FaClock, FaCheckCircle } from 'react-icons/fa'



const UserBids = () => {
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <span className="dash-eyebrow">Freelancer Dashboard</span>
          <h2 className="dash-heading d-flex align-items-center gap-2">
            <FaGavel className="text-primary" /> My Submitted Proposals &amp; Bids
          </h2>
        </div>
      </div>

      <div className="dash-card bg-white p-4 rounded-4 shadow-sm border">
        <div className="table-responsive">
          <table className="table dash-table align-middle mb-0">
            <thead className="table-light">
              <tr>
               
                <th>Project Name</th>
                <th>Bid Amount</th>
               
                <th>Submitted Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myBidsList.map((bid) => (
                <tr key={bid.id}>
                  <td className="fw-bold text-secondary">{bid.id}</td>
                  <td className="fw-semibold">{bid.project}</td>
                  <td className="fw-bold text-success">{bid.amount}</td>
                  <td>{bid.estTime}</td>
                  <td className="small text-muted">{bid.date}</td>
                  <td>
                    <span
                      className={`badge px-3 py-2 rounded-pill ${
                        bid.status === 'Accepted'
                          ? 'bg-success'
                          : bid.status === 'Rejected'
                          ? 'bg-danger'
                          : 'bg-warning text-dark'
                      }`}
                    >
                      {bid.status}
                    </span>
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

export default UserBids
