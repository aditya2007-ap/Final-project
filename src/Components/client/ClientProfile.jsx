import React, { useEffect, useState } from 'react'
import { FaUser, FaEnvelope, FaBuilding, FaPhone, FaMapMarkerAlt, FaSave } from 'react-icons/fa'
import Swal from 'sweetalert2'

const ClientProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    bio: ''
  })

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('info'))
    if (info) {
      setFormData({
        name: info.name || 'Client User',
        email: info.email || 'client@example.com',
        phone: info.phone || '+91 98765 43210',
        company: info.company || 'Tech Ventures Ltd',
        location: info.location || 'Bangalore, India',
        bio: info.bio || 'Product hiring manager seeking expert developers for web and mobile contracts.'
      })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const info = JSON.parse(localStorage.getItem('info')) || {}
    const updated = { ...info, ...formData }
    localStorage.setItem('info', JSON.stringify(updated))
    Swal.fire({
      title: 'Profile Updated',
      text: 'Client profile details saved successfully!',
      icon: 'success'
    })
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8" data-aos="zoom-in" data-aos-duration="800">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            <h3 className="fw-bold mb-1">Client Profile Settings</h3>
            <p className="text-muted small mb-4">Manage your company information and contact preferences.</p>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <FaUser className="me-1 text-muted" /> Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <FaEnvelope className="me-1 text-muted" /> Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control bg-light"
                    value={formData.email}
                    readOnly
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <FaBuilding className="me-1 text-muted" /> Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <FaPhone className="me-1 text-muted" /> Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    <FaMapMarkerAlt className="me-1 text-muted" /> Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Company / Client Bio</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-top text-end">
                <button type="submit" className="btn btn-danger px-4 py-2 fw-bold d-inline-flex align-items-center gap-2">
                  <FaSave /> Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile
