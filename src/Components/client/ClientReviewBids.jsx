import React, { useState } from 'react'
import { FaGavel, FaCheckCircle, FaStar, FaClock, FaRupeeSign } from 'react-icons/fa'
import Swal from 'sweetalert2'

const sampleBids = [
  {
    id: 1,
    freelancerName: 'John Doe',
    role: 'Full Stack React & Node Developer',
    rating: 4.9,
    reviews: 28,
    projectTitle: 'React E-Commerce Web Application',
    bidAmount: '45,000',
    deliveryDays: '14 Days',
    proposal: 'I have 5+ years of experience building React/Node e-commerce platforms with Redux, Tailwind, and payment gateways. Ready to start immediately.'
  },
  {
    id: 2,
    freelancerName: 'Priya Sharma',
    role: 'UI/UX & Mobile App Specialist',
    rating: 5.0,
    reviews: 42,
    projectTitle: 'React E-Commerce Web Application',
    bidAmount: '40,000',
    deliveryDays: '10 Days',
    proposal: 'I can deliver a clean, responsive UI with state management and smooth REST API integration. Check my portfolio for recent e-commerce builds.'
  }
]

const ClientReviewBids = () => {
  const [bids] = useState(sampleBids)

  const handleHire = (name, project) => {
    Swal.fire({
      title: 'Accept Bid & Hire?',
      text: `Are you sure you want to award the project "${project}" to ${name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Hire Freelancer',
      confirmButtonColor: '#ee4a03'
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire('Hired!', `${name} has been hired for ${project}. Contract initiated in Escrow!`, 'success')
      }
    })
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora Client</span>
          <h2 className="dash-heading d-flex align-items-center gap-2">
            <FaGavel className="text-danger" /> Review Proposals &amp; Bids
          </h2>
        </div>
      </div>

      <div className="row g-4">
        {bids.map((bid) => (
          <div className="col-12" key={bid.id}>
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
                <div>
                  <span className="badge bg-light text-dark border mb-1">{bid.projectTitle}</span>
                  <h4 className="fw-bold m-0">{bid.freelancerName}</h4>
                  <p className="text-muted small m-0">{bid.role}</p>
                </div>
                <div className="text-end">
                  <span className="fs-3 fw-bold text-success">₹{bid.bidAmount}</span>
                  <div className="small text-muted d-flex align-items-center justify-content-end gap-1">
                    <FaClock /> Delivery: {bid.deliveryDays}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 mb-4">
                <h6 className="fw-bold mb-1">Proposal Letter:</h6>
                <p className="text-muted m-0 small">{bid.proposal}</p>
              </div>

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pt-2 border-top">
                <div className="d-flex align-items-center gap-2 text-warning">
                  <FaStar /> <span className="fw-bold text-dark">{bid.rating}</span>
                  <span className="text-muted small">({bid.reviews} reviews)</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleHire(bid.freelancerName, bid.projectTitle)}
                  className="btn btn-danger px-4 py-2 fw-bold rounded-pill d-inline-flex align-items-center gap-2"
                >
                  <FaCheckCircle /> Accept Bid &amp; Hire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClientReviewBids
