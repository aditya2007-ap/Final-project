import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheck, FaTimes, FaCoins, FaSyncAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import Aos from 'aos'

const UserPlans = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:9000/admin-get-plans')
      setData(res?.data?.result || [])
    } catch (err) {
      console.error('Error fetching plans:', err)
      setData([])
    } finally {
      setLoading(false)
      setTimeout(() => {
        Aos.refreshHard()
      }, 100)
    }
  }
  const handlePurchasePlan = (item) => {
    const info = JSON.parse(localStorage.getItem("info"))
    const userId = info?._id
    const planId = item?._id;

    Swal.fire({
      title: "Confirm Plan Purchase",
      text: `Purchase the "${item?.name}" plan to add ${item?.credits} bidding credits to your balance?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Purchase it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = { planId, userId }
        const res = await axios.post('http://localhost:9000/user-purchase-plan', data)
        if (res?.data?.success == true) {
          try {
            const currentInfo = JSON.parse(localStorage.getItem("info")) || {};
            const addedCredits = parseInt(item?.credits) || 0;
            const updatedCredits = (parseInt(currentInfo.credit) || 0) + addedCredits;
            localStorage.setItem("info", JSON.stringify({ ...currentInfo, credit: updatedCredits }));
          } catch (e) {
            console.error(e);
          }

          Swal.fire({
            title: "Plan Purchased! 🎉",
            text: res?.data?.message || `${item?.credits} bidding credits have been added to your balance!`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#64748b',
            confirmButtonText: '🚀 Explore Projects & Place Bids',
            cancelButtonText: 'Stay on Plans'
          }).then((r) => {
            if (r.isConfirmed) {
              navigate('/user-project');
            }
          });
        } else {
          Swal.fire({
            title: "Purchase Failed",
            text: res?.data?.message || 'Could not complete plan purchase.',
            icon: 'error'
          })          
        }
      }
    });

  }
  return (
    <div className="container py-5">
      <div className="text-center mb-5" data-aos="fade-down">
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">
          Freelancer Credit System
        </span>
        <h1 className="display-6 fw-bold">Choose a Bidding Credit Plan</h1>
        <p className="text-muted">Each job bid consumes 1 credit from your balance. Upgrade anytime to submit more proposals.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading plans...</span>
            </div>
            <p className="text-muted mt-3 small fw-semibold">Loading available bidding credit plans...</p>
          </div>
        ) : data && data.length > 0 ? (
          data.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={item?._id} data-aos={item?.popular ? "zoom-in" : "fade-up"} data-aos-delay={(index + 1) * 100}>
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

                <button onClick={() => handlePurchasePlan(item)}
                  type="button"
                  className={`btn w-100 mt-auto fw-bold rounded-pill py-2 ${item?.popular ? 'btn-primary' : 'btn-outline-primary'}`}
                >
                  Purchase
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5" data-aos="fade-up">
            <div className="p-5 bg-white rounded-4 shadow-sm border mx-auto" style={{ maxWidth: '600px' }}>
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning-subtle text-warning mb-3 shadow-sm"
                style={{ width: '84px', height: '84px' }}
              >
                <FaCoins style={{ fontSize: '2.5rem' }} />
              </div>
              <h3 className="fw-bold text-dark mb-2">No Plans Existed Currently</h3>
              <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                There are currently no bidding credit plans available on the platform. The administrator has not configured any credit tiers yet. Please check back shortly.
              </p>
              <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-2"
                  onClick={fetchData}
                >
                  <FaSyncAlt /> Refresh Plans
                </button>
                <button
                  type="button"
                  className="btn btn-primary px-4 py-2 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center gap-2"
                  onClick={() => navigate('/user-project')}
                >
                  Explore Projects
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPlans
