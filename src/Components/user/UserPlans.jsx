import React from 'react'
import { FaBolt, FaCheckCircle, FaStar } from 'react-icons/fa'
import Swal from 'sweetalert2'

const plans = [
  {
    name: 'Starter Plan',
    credits: 10,
    price: '0',
    tagline: 'For new freelancers getting started',
    features: ['10 Bidding Credits / Month', 'Basic Profile Listing', 'Standard Support'],
    isPopular: false
  },
  {
    name: 'Pro Plan',
    credits: 50,
    price: '499',
    tagline: 'Best for active freelancers submitting proposals',
    features: ['50 Bidding Credits / Month', 'Featured Profile Badge', 'Priority Client Notifications', '24/7 Priority Support'],
    isPopular: true
  },
  {
    name: 'Elite Plan',
    credits: 200,
    price: '1,499',
    tagline: 'For power freelancers & agencies',
    features: ['200 Bidding Credits / Month', 'Top Vetted Badge', 'Instant Bid Placements', 'Dedicated Account Manager'],
    isPopular: false
  }
]

const UserPlans = () => {
  const handleBuyPlan = (plan) => {
    Swal.fire({
      title: `Subscribe to ${plan.name}?`,
      text: `Confirm purchase for ₹${plan.price} / month. Adds ${plan.credits} bidding credits to your balance!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Buy Plan',
      confirmButtonColor: '#0d6efd'
    }).then((res) => {
      if (res.isConfirmed) {
        const info = JSON.parse(localStorage.getItem('info')) || {}
        const currentCredits = info.credit || 10
        const updated = { ...info, credit: currentCredits + plan.credits }
        localStorage.setItem('info', JSON.stringify(updated))

        Swal.fire({
          title: 'Plan Activated!',
          text: `Successfully added ${plan.credits} credits. Your new balance is ${updated.credit} credits!`,
          icon: 'success'
        })
      }
    })
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">
          <FaBolt className="me-1" /> Freelancer Credit System
        </span>
        <h1 className="display-6 fw-bold">Choose a Bidding Credit Plan</h1>
        <p className="text-muted">Each job bid consumes 1 credit from your balance. Upgrade anytime to submit more proposals.</p>
      </div>

      <div className="row g-4 justify-content-center">
        {plans.map((plan, index) => (
          <div className="col-md-4" key={index}>
            <div className={`card h-100 p-4 rounded-4 shadow-sm position-relative ${plan.isPopular ? 'border-primary border-2 bg-primary bg-opacity-10' : 'bg-white border'}`}>
              {plan.isPopular && (
                <span className="position-absolute top-0 end-0 translate-middle-y me-4 badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold d-inline-flex align-items-center gap-1">
                  <FaStar /> Most Popular
                </span>
              )}
              <h4 className="fw-bold mb-1">{plan.name}</h4>
              <p className="text-muted small mb-3">{plan.tagline}</p>

              <div className="my-3">
                <span className="display-5 fw-bold text-dark">₹{plan.price}</span>
                <span className="text-muted"> / month</span>
              </div>

              <div className="p-3 bg-white rounded-3 border mb-4 text-center">
                <span className="fw-bold text-primary fs-5">{plan.credits} Credits</span>
                <small className="d-block text-muted">Added to your balance</small>
              </div>

              <ul className="list-unstyled mb-4">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="mb-2 d-flex align-items-center gap-2 small">
                    <FaCheckCircle className="text-success" /> {feat}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleBuyPlan(plan)}
                className={`btn w-100 mt-auto fw-bold rounded-pill py-2 ${plan.isPopular ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                Purchase Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPlans
