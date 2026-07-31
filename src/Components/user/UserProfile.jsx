import React, { useEffect, useState } from 'react'
import { FaUser, FaEnvelope, FaCode, FaRupeeSign, FaMapMarkerAlt, FaSave, FaCheckCircle } from 'react-icons/fa'
import Swal from 'sweetalert2'

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    headline: '',            
    rate: '',
    skills: '',
    location: '',
    bio: ''
  })

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('info'))
    if (info) {
      setFormData({
        name: info.name || 'John Freelancer',
        email: info.email || 'freelancer@example.com',
        headline: info.headline || 'Full Stack MERN & React Native Developer',
        rate: info.rate || '1200',
        skills: info.skills || 'React, Node.js, Express, MongoDB, Redux',
        location: info.location || 'Bangalore, India',
        bio: info.bio || 'Passionate software engineer with 4+ years building high quality web applications and REST APIs.'
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
      text: 'Freelancer profile details saved successfully!',
      icon: 'success'
    })
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3" style={{ width: '64px', height: '64px' }}>
                {formData.name.charAt(0)}
              </div>
              <div>
                <h3 className="fw-bold mb-0 d-flex align-items-center gap-2">
                  {formData.name} <FaCheckCircle className="text-success fs-5" title="Verified Freelancer" />
                </h3>
                <p className="text-muted m-0 small">{formData.headline}</p>
              </div>
            </div>

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

                <div className="col-12">
                  <label className="form-label fw-semibold">Professional Title / Headline</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Senior React &amp; Node.js Developer"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <FaRupeeSign className="me-1 text-muted" /> Hourly Rate (₹ / hr)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
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
                  <label className="form-label fw-semibold">
                    <FaCode className="me-1 text-muted" /> Key Skills (Comma Separated)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="React, Node.js, MongoDB, Figma"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Bio / Overview</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-4 pt-3 border-top text-end">
                <button type="submit" className="btn btn-primary px-4 py-2 fw-bold d-inline-flex align-items-center gap-2">
                  <FaSave /> Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
