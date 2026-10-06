import React, { useEffect, useState, useCallback } from 'react'
import { FaUser, FaEnvelope, FaBuilding, FaPhone, FaMapMarkerAlt, FaSave, FaCheckCircle, FaEdit, FaTimes, FaCalendarAlt, FaShieldAlt, FaFolderOpen, FaGavel, FaUserCheck, FaPlus, FaArrowRight, FaBolt, FaChartLine, FaCamera, FaTrashAlt } from 'react-icons/fa'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const ClientProfile = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', location: '', bio: ''
  })
  const [profileData, setProfileData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [avatarPreview, setAvatarPreview] = useState(null)

  const [loggedInInfo] = useState(() => {
    try { return JSON.parse(localStorage.getItem('info')) } catch { return null }
  })

  const targetClientId =
    searchParams.get('clientId') ||
    searchParams.get('userId') ||
    searchParams.get('id') ||
    loggedInInfo?._id

  useEffect(() => {
    if (!targetClientId) {
      if (loggedInInfo?.type === 'admin') {
        navigate('/admin-profile', { replace: true })
      } else if (loggedInInfo?.type === 'user') {
        navigate('/user-profile', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    }
  }, [targetClientId, loggedInInfo, navigate])

  const isOwner = Boolean(
    loggedInInfo?._id &&
    String(targetClientId) === String(loggedInInfo._id) &&
    loggedInInfo?.type === 'client'
  )

  const fetchProfile = useCallback(async () => {
    if (!targetClientId) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:9000/get-profile?userId=${targetClientId}`)
      if (res?.data?.success && res.data.result) {
        const user = res.data.result
        setProfileData(user)
        if (user.profile) setAvatarPreview(user.profile)
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          company: user.company || '',
          location: user.location || '',
          bio: user.bio || ''
        })
      }
    } catch (err) {
      console.error('Error fetching client profile:', err)
      if (loggedInInfo && String(loggedInInfo._id) === String(targetClientId)) {
        setProfileData(loggedInInfo)
        setFormData({
          name: loggedInInfo.name || '', email: loggedInInfo.email || '', phone: loggedInInfo.phone || '',
          company: loggedInInfo.company || '', location: loggedInInfo.location || '', bio: loggedInInfo.bio || ''
        })
      }
    } finally { setLoading(false) }
  }, [targetClientId, loggedInInfo])

  const fetchStats = useCallback(async () => {
    if (!targetClientId) return
    try {
      const res = await axios.get(`http://localhost:9000/client-stats?clientId=${targetClientId}`)
      if (res?.data?.success) setStats(res.data.result)
    } catch (err) { console.error('Stats error:', err) }
  }, [targetClientId])

  useEffect(() => { 
    if (targetClientId) {
      fetchProfile()
      fetchStats()
    }
  }, [targetClientId, fetchProfile, fetchStats])

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
        Swal.fire({ title: 'Photo Selected', text: 'Click "Save Profile" to apply your new photo.', icon: 'success', timer: 1800, showConfirmButton: false })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setAvatarPreview(null)
    Swal.fire({ title: 'Photo Removed', text: 'Default avatar restored. Click "Save Profile" to persist.', icon: 'info', timer: 1500, showConfirmButton: false })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const info = JSON.parse(localStorage.getItem('info'))
      const res = await axios.put('http://localhost:9000/update-profile', {
        userId: info._id, ...formData, profile: avatarPreview || ''
      })
      if (res?.data?.success) {
        const updated = res.data.result
        localStorage.setItem('info', JSON.stringify({ ...info, ...updated }))
        window.dispatchEvent(new Event('storage'))
        setProfileData(updated)
        setIsEditing(false)
        Swal.fire({ icon: 'success', title: 'Profile Updated!', text: 'Your company profile has been saved successfully', timer: 2000, showConfirmButton: false })
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update profile' })
    } finally { setSaving(false) }
  }

  const getAvatarUrl = (name) => {
    const colors = ['e65100', '6a1b9a', 'dc2626', '7c3aed', 'ea580c']
    const color = colors[Math.abs((name || '').length) % colors.length]
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Client')}&background=${color}&color=fff&bold=true&size=120&font-size=0.4`
  }

  const memberSince = profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: '#e65100' }}></div>
        <p className="mt-3 text-muted fw-semibold">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <style>{`
        .client-hero {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #e65100 100%);
          border-radius: 24px;
          padding: 0;
          overflow: hidden;
          position: relative;
        }
        /* ── Mirror Shine Sweep on Hero ── */
        .client-hero .mirror-shine {
          position: absolute;
          top: 0; left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255,255,255,0.03) 30%,
            rgba(255,255,255,0.12) 45%,
            rgba(255,255,255,0.22) 50%,
            rgba(255,255,255,0.12) 55%,
            rgba(255,255,255,0.03) 70%,
            transparent 80%
          );
          transform: skewX(-18deg);
          z-index: 3;
          pointer-events: none;
          animation: clientMirrorSweep 4s ease-in-out infinite;
        }
        @keyframes clientMirrorSweep {
          0% { left: -120%; }
          40% { left: 180%; }
          100% { left: 180%; }
        }
        .client-hero::before {
          content: '';
          position: absolute;
          top: -40%;
          right: -15%;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(230,81,0,0.25) 0%, transparent 70%);
          border-radius: 50%;
          animation: clientPulse 4s ease-in-out infinite;
        }
        .client-hero::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(106,27,154,0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: clientPulse 5s ease-in-out infinite reverse;
        }
        @keyframes clientPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        /* ── Mirror Shine on Stat Pills (hover) ── */
        .client-stat-pill {
          position: relative;
          overflow: hidden;
        }
        .client-stat-pill::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.08) 60%, transparent 80%);
          transform: skewX(-18deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .client-stat-pill:hover::after { left: 180%; }
        /* ── Mirror Shine on Info Cards (hover) ── */
        .client-info-card {
          position: relative;
          overflow: hidden;
        }
        .client-info-card::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(105deg, transparent 25%, rgba(230,81,0,0.04) 40%, rgba(230,81,0,0.1) 50%, rgba(230,81,0,0.04) 60%, transparent 75%);
          transform: skewX(-18deg);
          transition: left 0.7s ease;
          pointer-events: none;
          z-index: 1;
        }
        .client-info-card:hover::after { left: 180%; }
        .client-avatar-ring {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, #e65100, #ff8a50, #6a1b9a);
          animation: clientRing 6s linear infinite;
        }
        @keyframes clientRing {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .client-avatar-ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #1a1a2e;
        }
        .client-avatar-upload-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e65100, #ff8a50);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 3px solid #1a1a2e;
          font-size: 14px;
          z-index: 5;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .client-avatar-upload-overlay:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 14px rgba(230,81,0,0.5);
        }
        .client-verified {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: linear-gradient(135deg, #e65100, #ff8a50);
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #1a1a2e;
          font-size: 12px;
        }
        .client-stat-pill {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 16px 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .client-stat-pill:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        .client-stat-pill .stat-val {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          line-height: 1;
        }
        .client-stat-pill .stat-lbl {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
          font-weight: 600;
        }
        .client-tab-btn {
          background: none;
          border: none;
          padding: 10px 24px;
          font-weight: 600;
          font-size: 0.9rem;
          color: #64748b;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .client-tab-btn:hover { color: #e65100; }
        .client-tab-btn.active {
          color: #e65100;
          border-bottom-color: #e65100;
        }
        .client-info-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
        }
        .client-info-card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .client-form-input {
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          padding: 12px 18px;
          font-size: 0.92rem;
          transition: all 0.3s ease;
          background: #f8fafc;
        }
        .client-form-input:focus {
          border-color: #e65100;
          box-shadow: 0 0 0 4px rgba(230,81,0,0.1);
          background: white;
          outline: none;
        }
        .client-save-btn {
          background: linear-gradient(135deg, #e65100, #ff8a50);
          border: none;
          color: white;
          padding: 14px 36px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .client-save-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .client-save-btn:hover::before { left: 100%; }
        .client-save-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(230,81,0,0.4); }
        .client-cancel-btn {
          background: #f1f5f9;
          border: 2px solid #e2e8f0;
          color: #64748b;
          padding: 14px 36px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        .client-cancel-btn:hover { background: #fee2e2; color: #ef4444; border-color: #fecaca; }
        .client-quick-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 22px;
          background: white;
          border-radius: 16px;
          border: 1px solid #f1f5f9;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .client-quick-link:hover {
          transform: translateX(6px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          border-color: #e65100;
        }
        .client-ql-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
      `}</style>

      {/* ═══ HERO BANNER ═══ */}
      <div className="client-hero mb-4" data-aos="fade-down" data-aos-duration="800">
        <div className="mirror-shine"></div>
        <div className="p-4 p-md-5 position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex flex-wrap align-items-center gap-4">
            {/* Avatar */}
            <div className="position-relative" data-aos="zoom-in" data-aos-delay="200">
              <div className="client-avatar-ring">
                <img src={avatarPreview || getAvatarUrl(formData.name)} alt={formData.name} />
              </div>
              <div className="client-verified">
                <FaCheckCircle />
              </div>
              {isOwner && (
                <>
                  <label htmlFor="client-avatar-upload" className="client-avatar-upload-overlay" title="Change Profile Photo">
                    <FaCamera />
                  </label>
                  <input type="file" id="client-avatar-upload" accept="image/*" className="d-none" onChange={handlePhotoUpload} />
                </>
              )}
            </div>

            {/* Info */}
            <div className="flex-grow-1" data-aos="fade-left" data-aos-delay="300">
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge px-3 py-1" style={{ background: 'rgba(230,81,0,0.2)', color: '#ff8a50', fontSize: '0.7rem', fontWeight: 700, borderRadius: '100px', letterSpacing: '1px' }}>
                  <FaBuilding className="me-1" /> CLIENT EMPLOYER
                </span>
                <span className="badge px-3 py-1" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', fontSize: '0.7rem', fontWeight: 700, borderRadius: '100px' }}>
                  ● VERIFIED
                </span>
              </div>
              <h2 className="fw-bold text-white mb-1" style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
                {formData.name || 'Client'}
              </h2>
              {formData.company && (
                <p className="mb-1" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
                  <FaBuilding className="me-1" /> {formData.company}
                </p>
              )}
              <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
                {formData.location && (
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                    <FaMapMarkerAlt className="me-1" /> {formData.location}
                  </span>
                )}
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                  <FaCalendarAlt className="me-1" /> Member since {memberSince}
                </span>
                {formData.email && (
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                    <FaEnvelope className="me-1" /> {formData.email}
                  </span>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {isOwner && (
              <div data-aos="fade-left" data-aos-delay="400">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn d-flex align-items-center gap-2 fw-bold px-4 py-2"
                  style={{
                    background: isEditing ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.12)',
                    color: isEditing ? '#fca5a5' : 'white',
                    border: `1px solid ${isEditing ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '14px',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isEditing ? <><FaTimes /> Cancel</> : <><FaEdit /> Edit Profile</>}
                </button>
              </div>
            )}
          </div>

          {/* Stats Row */}
          <div className="row g-3 mt-4" data-aos="fade-up" data-aos-delay="500">
            <div className="col-6 col-md-3">
              <div className="client-stat-pill">
                <div className="stat-val">{stats?.totalProjects ?? 0}</div>
                <div className="stat-lbl">Projects Posted</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="client-stat-pill">
                <div className="stat-val">{stats?.totalBids ?? 0}</div>
                <div className="stat-lbl">Bids Received</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="client-stat-pill">
                <div className="stat-val">{stats?.acceptedBids ?? 0}</div>
                <div className="stat-lbl">Contracts Given</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="client-stat-pill">
                <div className="stat-val">{stats?.totalProjects ?? 0}</div>
                <div className="stat-lbl">Active Listings</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ TABS ═══ */}
      <div className="d-flex border-bottom mb-4" data-aos="fade-up" data-aos-delay="100">
        {['overview', 'edit'].map(tab => (
          <button
            key={tab}
            className={`client-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab); if (tab === 'edit') setIsEditing(true) }}
          >
            {tab === 'overview' ? '🏢 Overview' : '✏️ Edit Profile'}
          </button>
        ))}
      </div>

      {/* ═══ CONTENT ═══ */}
      {(activeTab === 'overview' && !isEditing) ? (
        <div className="row g-4">
          {/* Left */}
          <div className="col-lg-8">
            {/* Company Bio */}
            <div className="client-info-card mb-4" data-aos="fade-up" data-aos-delay="100">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FaBuilding style={{ color: '#e65100' }} /> About / Company Bio
              </h5>
              <p className="text-muted mb-0" style={{ lineHeight: 1.8, fontSize: '0.95rem' }}>
                {formData.bio || 'No bio added yet. Click "Edit Profile" to add your company description.'}
              </p>
            </div>

            {/* Contact Details */}
            <div className="client-info-card mb-4" data-aos="fade-up" data-aos-delay="200">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FaShieldAlt style={{ color: '#10b981' }} /> Contact & Company Details
              </h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: '#f8fafc' }}>
                    <FaEnvelope style={{ color: '#e65100', fontSize: '1.1rem' }} />
                    <div>
                      <small className="text-muted d-block" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</small>
                      <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>{formData.email}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: '#f8fafc' }}>
                    <FaPhone style={{ color: '#6a1b9a', fontSize: '1.1rem' }} />
                    <div>
                      <small className="text-muted d-block" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</small>
                      <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>{formData.phone || 'Not set'}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: '#f8fafc' }}>
                    <FaBuilding style={{ color: '#0ea5e9', fontSize: '1.1rem' }} />
                    <div>
                      <small className="text-muted d-block" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company</small>
                      <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>{formData.company || 'Not set'}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: '#f8fafc' }}>
                    <FaMapMarkerAlt style={{ color: '#f59e0b', fontSize: '1.1rem' }} />
                    <div>
                      <small className="text-muted d-block" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</small>
                      <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>{formData.location || 'Not set'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hiring Activity */}
            <div className="client-info-card" data-aos="fade-up" data-aos-delay="300">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FaChartLine style={{ color: '#6366f1' }} /> Hiring Activity Summary
              </h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="text-center p-4 rounded-4" style={{ background: 'linear-gradient(135deg, #fff7ed, #fed7aa)' }}>
                    <FaFolderOpen style={{ color: '#e65100', fontSize: '1.8rem' }} />
                    <h3 className="fw-bold mt-2 mb-0" style={{ color: '#e65100' }}>{stats?.totalProjects ?? 0}</h3>
                    <small className="text-muted fw-semibold">Total Projects</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-4 rounded-4" style={{ background: 'linear-gradient(135deg, #eff6ff, #bfdbfe)' }}>
                    <FaGavel style={{ color: '#2563eb', fontSize: '1.8rem' }} />
                    <h3 className="fw-bold mt-2 mb-0" style={{ color: '#2563eb' }}>{stats?.totalBids ?? 0}</h3>
                    <small className="text-muted fw-semibold">Proposals Received</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-4 rounded-4" style={{ background: 'linear-gradient(135deg, #f0fdf4, #bbf7d0)' }}>
                    <FaUserCheck style={{ color: '#16a34a', fontSize: '1.8rem' }} />
                    <h3 className="fw-bold mt-2 mb-0" style={{ color: '#16a34a' }}>{stats?.acceptedBids ?? 0}</h3>
                    <small className="text-muted fw-semibold">Contracts Awarded</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="col-lg-4">
            <div className="client-info-card mb-4" data-aos="fade-left" data-aos-delay="200">
              <h6 className="fw-bold mb-3 text-muted" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Navigation</h6>
              <div className="d-flex flex-column gap-3">
                <Link to="/client-dashboard" className="client-quick-link">
                  <div className="client-ql-icon" style={{ background: '#fff7ed', color: '#e65100' }}><FaBolt /></div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Dashboard</div>
                    <small className="text-muted">View overview</small>
                  </div>
                  <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                </Link>
                <Link to="/client-post-project" className="client-quick-link">
                  <div className="client-ql-icon" style={{ background: '#eff6ff', color: '#2563eb' }}><FaPlus /></div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Post Project</div>
                    <small className="text-muted">Create a new job</small>
                  </div>
                  <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                </Link>
                <Link to="/client-manage-project" className="client-quick-link">
                  <div className="client-ql-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><FaFolderOpen /></div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Manage Projects</div>
                    <small className="text-muted">Edit your listings</small>
                  </div>
                  <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                </Link>
                <Link to="/client-Review-bids" className="client-quick-link">
                  <div className="client-ql-icon" style={{ background: '#fef3c7', color: '#d97706' }}><FaGavel /></div>
                  <div>
                    <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Review Bids</div>
                    <small className="text-muted">Evaluate freelancers</small>
                  </div>
                  <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                </Link>
              </div>
            </div>

            {/* Account Info */}
            <div className="client-info-card" data-aos="fade-left" data-aos-delay="300">
              <h6 className="fw-bold mb-3 text-muted" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Account Details</h6>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: '#f1f5f9 !important' }}>
                  <span className="text-muted small">Account Type</span>
                  <span className="fw-bold small" style={{ color: '#e65100' }}>Client Employer</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: '#f1f5f9 !important' }}>
                  <span className="text-muted small">Member Since</span>
                  <span className="fw-bold small">{memberSince}</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: '#f1f5f9 !important' }}>
                  <span className="text-muted small">Projects Posted</span>
                  <span className="fw-bold small text-primary">{stats?.totalProjects ?? 0}</span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span className="text-muted small">Status</span>
                  <span className="badge" style={{ background: '#dcfce7', color: '#16a34a', fontWeight: 700, fontSize: '0.72rem' }}>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ═══ EDIT FORM ═══ */
        <div className="row justify-content-center" data-aos="fade-up">
          <div className="col-lg-9">
            <div className="client-info-card">
              <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
                <FaEdit style={{ color: '#e65100' }} /> Edit Company Profile
              </h5>
              <p className="text-muted small mb-4">Update your company and contact information below.</p>

              {/* Profile Photo Upload Section */}
              <div className="d-flex align-items-center gap-4 p-4 rounded-4 border mb-4" style={{ background: '#f8fafc' }}>
                <div className="position-relative">
                  <div style={{ width: 80, height: 80, borderRadius: '50%', padding: 3, background: 'linear-gradient(135deg, #e65100, #ff8a50, #6a1b9a)' }}>
                    <img src={avatarPreview || getAvatarUrl(formData.name)} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
                  </div>
                </div>
                <div>
                  <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>Profile Photo</h6>
                  <p className="text-muted mb-2" style={{ fontSize: '0.78rem' }}>JPG, PNG or GIF. Max 2MB recommended.</p>
                  <div className="d-flex gap-2">
                    <label htmlFor="client-avatar-edit-upload" className="btn btn-sm d-inline-flex align-items-center gap-1 fw-semibold text-white" style={{ background: 'linear-gradient(135deg, #e65100, #ff8a50)', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: '0.82rem', padding: '6px 16px' }}>
                      <FaCamera size={12} /> Upload Photo
                    </label>
                    <input type="file" id="client-avatar-edit-upload" accept="image/*" className="d-none" onChange={handlePhotoUpload} />
                    {avatarPreview && (
                      <button type="button" className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1 fw-semibold" style={{ borderRadius: 10, fontSize: '0.82rem', padding: '6px 16px' }} onClick={handleRemovePhoto}>
                        <FaTrashAlt size={11} /> Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">
                      <FaUser className="me-1" style={{ color: '#e65100' }} /> Full Name
                    </label>
                    <input type="text" className="form-control client-form-input" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">
                      <FaEnvelope className="me-1" style={{ color: '#6a1b9a' }} /> Email Address
                    </label>
                    <input type="email" className="form-control client-form-input" value={formData.email}
                      readOnly style={{ background: '#f1f5f9', cursor: 'not-allowed' }} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">
                      <FaBuilding className="me-1" style={{ color: '#0ea5e9' }} /> Company Name
                    </label>
                    <input type="text" className="form-control client-form-input" placeholder="e.g. Tech Ventures Ltd"
                      value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">
                      <FaPhone className="me-1" style={{ color: '#10b981' }} /> Phone Number
                    </label>
                    <input type="text" className="form-control client-form-input" placeholder="+91 98765 43210"
                      value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small text-muted">
                      <FaMapMarkerAlt className="me-1" style={{ color: '#f59e0b' }} /> Location
                    </label>
                    <input type="text" className="form-control client-form-input" placeholder="e.g. Bangalore, India"
                      value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small text-muted">Company / Client Bio</label>
                    <textarea className="form-control client-form-input" rows="5" value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })} 
                      placeholder="Describe your company and hiring needs..." />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                  <button type="button" className="client-cancel-btn" onClick={() => { setIsEditing(false); setActiveTab('overview') }}>
                    <FaTimes className="me-2" /> Cancel
                  </button>
                  <button type="submit" className="client-save-btn" disabled={saving}>
                    {saving ? (
                      <><span className="spinner-border spinner-border-sm me-2"></span> Saving...</>
                    ) : (
                      <><FaSave className="me-2" /> Save Profile</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientProfile
