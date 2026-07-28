import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

const UserPlans = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await axios.get('http://localhost:9000/admin-get-plans')
    setData(res?.data?.result)
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">
          Freelancer Credit System
        </span>
        <h1 className="display-6 fw-bold">Choose a Bidding Credit Plan</h1>
        <p className="text-muted">Each job bid consumes 1 credit from your balance. Upgrade anytime to submit more proposals.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {data?.map((item) => (
          <div className="col-md-4" key={item?._id}>
            <div className={`card h-100 p-4 rounded-4 shadow-sm position-relative ${item?.popular ? 'border-primary border-2 bg-primary bg-opacity-10' : 'bg-white border'}`}>
              {item?.popular && (
                <span className="position-absolute top-0 end-0 translate-middle-y me-4 badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold d-inline-flex align-items-center gap-1">
                  Most Popular
                </span>
              )}
              <h4 className="fw-bold mb-1">{item?.name}</h4>
              <p className="text-muted small mb-3">{item?.tagline}</p>

              <div className="my-3">
                <span className="display-5 fw-bold text-dark">₹{item?.price}</span>
                <span className="text-muted"> / month</span>
              </div>

              <div className="p-3 bg-white rounded-3 border mb-4 text-center">
                <span className="fw-bold text-primary fs-5">{item?.credits} Credits</span>
                <small className="d-block text-muted">Added to your balance</small>
              </div>

              <ul className="list-unstyled mb-4">
                <li className="mb-2 d-flex align-items-center gap-2 small">
                  <FaCheck className="text-success" />
                  <span>{item?.credits} bidding credits / month</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2 small">
                  <FaCheck className="text-success" />
                  <span>Browse all open projects</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2 small">
                  <FaCheck className="text-success" />
                  <span>Enhanced portfolio profile</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2 small">
                  <FaCheck className="text-success" />
                  <span>Priority bid visibility</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2 small text-muted">
                  <FaTimes className="text-danger" />
                  <span>Bid analytics dashboard</span>
                </li>
              </ul>

              <button
                type="button"
                className={`btn w-100 mt-auto fw-bold rounded-pill py-2 ${item?.popular ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                Get Plans
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPlans
