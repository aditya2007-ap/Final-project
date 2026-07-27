import React from 'react'

const brandLogos = [
  '/brand-01.png',
  '/brand-02.png',
  '/brand-03.png',
  '/brand-04.png',
  '/brand-05.png',
  '/brand-06.png',
  '/brand-07.png',
  '/brand-08.png'
]

const PartnerSection = () => {
  return (
    <div className="partner-section py-5 bg-light border-top border-bottom">
      <div className="container">
        <div className="text-center mb-4">
          <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill fw-bold text-uppercase mb-2">Our Partners</span>
          <h3 className="fw-bold mb-1">Trusted By Top Global Brands &amp; Companies</h3>
        </div>
        <div className="row g-4 align-items-center justify-content-center text-center">
          {brandLogos.map((logo, index) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={index}>
              <div className="p-3 bg-white rounded-4 shadow-sm border h-100 d-flex align-items-center justify-content-center hover-shadow transition">
                <img
                  src={logo}
                  alt={`Partner Brand ${index + 1}`}
                  className="img-fluid"
                  style={{ maxHeight: '45px', objectFit: 'contain' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PartnerSection
