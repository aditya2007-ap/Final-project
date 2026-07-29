import React from 'react'

const CounterSection = () => {
  return (
    <section className="counter-section">
      {/* Top-left green dot pattern */}
      <img src="/shape-02.png" alt="" className="counter-shape counter-shape-tl" />
      {/* Bottom-center pink dot pattern */}
      <img src="/shape-02-dpld.png" alt="" className="counter-shape counter-shape-br-dots" />
      {/* Bottom-right yellow blob shape */}
      <img src="/shape-04.png" alt="" className="counter-shape counter-shape-br-yellow" />

      <div className="container">
        <div className="counter-card-outer">
          {/* Row 1 */}
          <div className="counter-grid">
            <div className="counter-item counter-item-1">
              <span className="counter-number" style={{ color: '#1ab69d' }}>45.2K</span>
              <span className="counter-label">FREELANCERS REGISTERED</span>
            </div>
            <div className="counter-item counter-item-2">
              <span className="counter-number" style={{ color: '#f84f9a' }}>32.4K</span>
              <span className="counter-label">PROJECTS COMPLETED</span>
            </div>
            <div className="counter-item counter-item-3">
              <span className="counter-number" style={{ color: '#f8b81f' }}>354+</span>
              <span className="counter-label">TOP FREELANCERS</span>
            </div>
            <div className="counter-item counter-item-4">
              <span className="counter-number" style={{ color: '#6a1b9a' }}>99.9%</span>
              <span className="counter-label">SATISFACTION RATE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CounterSection
