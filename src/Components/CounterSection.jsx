import React from 'react'
import { FaUsers, FaTasks, FaSmile, FaRupeeSign } from 'react-icons/fa'

const stats = [
  { icon: <FaUsers className="text-primary fs-1 mb-2" />, count: '10K+', label: 'Registered Freelancers' },
  { icon: <FaTasks className="text-success fs-1 mb-2" />, count: '5.2K+', label: 'Projects Published' },
  { icon: <FaRupeeSign className="text-warning fs-1 mb-2" />, count: '₹2.5Cr+', label: 'Paid to Freelancers' },
  { icon: <FaSmile className="text-danger fs-1 mb-2" />, count: '99%', label: 'Positive Feedback' }
]

const CounterSection = () => {
  return (
    <div className="counter-section py-5 bg-dark text-white">
      <div className="container">
        <div className="row g-4 text-center">
          {stats.map((stat, idx) => (
            <div className="col-6 col-md-3" key={idx}>
              <div className="p-4 rounded-4 bg-secondary bg-opacity-25 border border-secondary border-opacity-25">
                {stat.icon}
                <h2 className="fw-bold text-white mb-1 display-6">{stat.count}</h2>
                <p className="text-white-50 m-0 small fw-semibold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CounterSection
