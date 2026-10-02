import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaGavel, FaComments, FaBriefcase, FaEnvelope, FaQuoteLeft, FaEye, FaRegCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa'
import Swal from 'sweetalert2'
import ChatModal from '../ChatModal'

const getStatusBadge = (status) => {
  const norm = (status || '').toLowerCase();
  if (norm === 'accept' || norm === 'accepted') {
    return { label: 'Accepted', cls: 'badge-accept', icon: <FaRegCheckCircle className="me-1" /> };
  }
  if (norm === 'reject' || norm === 'rejected') {
    return { label: 'Rejected', cls: 'badge-reject', icon: <FaTimesCircle className="me-1" /> };
  }
  return { label: 'Pending', cls: 'badge-pending', icon: <FaHourglassHalf className="me-1" /> };
};

const UserBids = () => {
  const [data, setData] = useState([])
  const [activeChatBid, setActiveChatBid] = useState(null)

  const userInfo = (() => {
    try {
      return JSON.parse(localStorage.getItem('info')) || null
    } catch {
      return null
    }
  })()

  const fetchData = async () => {
    const userId = userInfo?._id;
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:9000/user-get-bids?userId=${userId}`);
      setData(res?.data?.result || []);
    } catch (err) {
      console.error('Error fetching user bids:', err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container py-5">
      <div className="row mb-4" data-aos="fade-down">
        <div className="col-12">
          <span className="dash-eyebrow">Freelancer Dashboard</span>
          <h2 className="dash-heading d-flex align-items-center gap-2">
            <FaGavel className="text-primary" /> My Submitted Proposals &amp; Bids
          </h2>
          <p className="text-muted small mb-0">
            Track submitted project proposals, review client responses, and collaborate directly with clients once your bid is accepted.
          </p>
        </div>
      </div>

      <div className="dash-card bg-white p-4 rounded-4 shadow-sm border" data-aos="fade-up" data-aos-duration="800">
        <div className="table-responsive">
          <table className="table dash-table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Project Details</th>
                <th>Client Budget</th>
                <th>Your Bid</th>
                <th>Cover Message</th>
                <th>Status</th>
                <th>Collaboration</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item) => {
                  const normStatus = (item?.status || '').toLowerCase();
                  const isAccepted = normStatus === 'accepted' || normStatus === 'accept';
                  const isRejected = normStatus === 'rejected' || normStatus === 'reject';
                  return (
                    <tr key={item?._id}>
                      <td>
                        <div className="fw-bold text-dark">{item?.title || 'Untitled Project'}</div>
                        <small className="text-muted d-block">
                          Employer: {item?.clientName || 'Client'}
                        </small>
                      </td>
                      <td className="fw-semibold text-muted">₹{item?.budget || '—'}</td>
                      <td className="fw-bold text-success">₹{item?.amount || '—'}</td>
                      <td style={{ maxWidth: '240px' }}>
                        {item?.message ? (
                          <div>
                            <span
                              className="small text-secondary text-truncate d-block mb-1"
                              style={{ maxWidth: '210px' }}
                              title={item.message}
                            >
                              "{item.message}"
                            </span>
                            <button
                              type="button"
                              className="btn btn-sm btn-link p-0 text-decoration-none d-inline-flex align-items-center gap-1"
                              style={{ fontSize: '0.73rem', color: '#e65100', fontWeight: '600' }}
                              onClick={() => {
                                Swal.fire({
                                  title: 'Your Proposal Pitch',
                                  html: `<div style="text-align: left; background: #f8fafc; padding: 16px; border-radius: 12px; border-left: 4px solid #e65100; font-size: 0.92rem; line-height: 1.6; color: #334155; white-space: pre-wrap;">${item.message}</div>`,
                                  confirmButtonText: 'Close',
                                  confirmButtonColor: '#e65100'
                                });
                              }}
                            >
                              <FaEye style={{ fontSize: '0.7rem' }} /> Read Pitch
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted small fst-italic">None</span>
                        )}
                      </td>
                      <td>
                        {(() => {
                          const badge = getStatusBadge(item?.status);
                          return (
                            <span className={`bids-badge ${badge.cls}`}>
                              {badge.icon} {badge.label}
                            </span>
                          );
                        })()}
                      </td>
                      <td>
                        {isAccepted ? (
                          <button
                            type="button"
                            className="btn btn-sm btn-primary d-inline-flex align-items-center gap-1 rounded-pill px-3 shadow-sm"
                            onClick={() => setActiveChatBid(item)}
                          >
                            <FaComments /> Chat with Client
                          </button>
                        ) : (
                          <span className="text-muted small">
                            {isRejected ? 'Closed' : 'Under Review'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No submitted proposals found. Explore live projects to place your bids.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chat Modal */}
      {activeChatBid && (
        <ChatModal
          show={Boolean(activeChatBid)}
          onClose={() => setActiveChatBid(null)}
          projectId={activeChatBid?.projectId}
          projectTitle={activeChatBid?.title}
          bidId={activeChatBid?._id}
          partnerName={activeChatBid?.clientName || 'Client'}
          partnerRole="Client"
          receiverId={activeChatBid?.clientId}
          currentUserId={userInfo?._id}
          currentUserName={userInfo?.name || 'Freelancer'}
          currentUserRole="user"
        />
      )}
    </div>
  )
}

export default UserBids

