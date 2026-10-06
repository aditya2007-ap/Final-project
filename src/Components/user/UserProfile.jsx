import React, { useEffect, useState, useCallback } from 'react'
import { FaUser, FaEnvelope, FaCode, FaRupeeSign, FaMapMarkerAlt, FaSave, FaCheckCircle, FaBolt, FaStar, FaEdit, FaTimes, FaCalendarAlt, FaShieldAlt, FaUserTie, FaGavel, FaCoins, FaArrowRight, FaBriefcase, FaArrowLeft, FaBan, FaCamera, FaTrashAlt } from 'react-icons/fa'
import { Link, useLocation, useNavigate, useSearchParams, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const UserProfile = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { id: paramId } = useParams()

  const [formData, setFormData] = useState({
    name: '', email: '', headline: '', rate: '', skill: '', location: '', bio: '', phone: ''
  })
  const [profileData, setProfileData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isBlocked, setIsBlocked] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)

  const [loggedInInfo] = useState(() => {
    try { return JSON.parse(localStorage.getItem('info')) } catch { return null }
  })

  // Support viewing any user's profile via query param, location state, route param, or logged-in user
  const targetUserId =
    searchParams.get('userId') ||
    searchParams.get('id') ||
    location.state?.userId ||
    location.state?.freelancer?._id ||
    paramId ||
    loggedInInfo?._id

  // If no targetUserId could be resolved, redirect appropriately
  useEffect(() => {
    if (!targetUserId) {
      const info = (() => {
        try { return JSON.parse(localStorage.getItem('info')) } catch { return null }
      })()
      if (info?.type === 'client') {
        navigate('/client-profile', { replace: true })
      } else if (info?.type === 'admin') {
        navigate('/admin-profile', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    }
  }, [targetUserId, navigate])

  // True only if current viewer is the freelancer themselves
  const isOwner = Boolean(
    loggedInInfo?._id &&
    String(targetUserId) === String(loggedInInfo._id) &&
    loggedInInfo?.type === 'user'
  )
  const isClientViewer = loggedInInfo?.type === 'client'

  const fetchProfile = useCallback(async () => {
    if (!targetUserId) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:9000/get-profile?userId=${targetUserId}`)
      if (res?.data?.success && res.data.result) {
        const user = res.data.result
        setProfileData(user)
        if (user.profile) setAvatarPreview(user.profile)
        const blocked = user.status === 'blocked' || user.status === false || user.status === 'false'
        setIsBlocked(blocked)
        if (blocked) {
          Swal.fire({
            title: 'Blocked by Admin',
            html: `
              <div style="text-align: left; padding: 6px 0;">
                <p style="color: #b91c1c; font-weight: 700; font-size: 1rem; margin-bottom: 8px;">
                  ⚠️ Your Freelancer Account Has Been Suspended
                </p>
                <p style="color: #475569; font-size: 0.92rem; line-height: 1.5; margin-bottom: 0;">
                  Your profile has been blocked by the administration. You are restricted from placing bids or initiating contracts. Please contact administrator support.
                </p>
              </div>
            `,
            icon: 'error',
            confirmButtonText: 'I Understand',
            confirmButtonColor: '#dc2626'
          })
        }
        setFormData({
          name: user.name || '',
          email: user.email || '',
          headline: user.headline || '',
          rate: user.rate || '',
          skill: user.skill || '',
          location: user.location || '',
          bio: user.bio || '',
          phone: user.phone || ''
        })
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      try {
        const info = JSON.parse(localStorage.getItem('info'))
        if (info && String(info._id) === String(targetUserId)) {
          setProfileData(info)
          setFormData({
            name: info.name || '', email: info.email || '', headline: info.headline || '',
            rate: info.rate || '', skill: info.skill || '', location: info.location || '',
            bio: info.bio || '', phone: info.phone || ''
          })
        }
      } catch (e) { /* ignore */ }
    } finally { setLoading(false) }
  }, [targetUserId])

  const fetchStats = useCallback(async () => {
    if (!targetUserId) return
    try {
      const res = await axios.get(`http://localhost:9000/user-stats?userId=${targetUserId}`)
      if (res?.data?.success) setStats(res.data.result)
    } catch (err) { console.error('Stats error:', err) }
  }, [targetUserId])

  useEffect(() => { 
    if (targetUserId) {
      fetchProfile(); 
      fetchStats();
    }
  }, [targetUserId, fetchProfile, fetchStats])

  const handleHireDirect = () => {
    Swal.fire({
      title: `Hire ${formData.name || 'Freelancer'}`,
      html: `
        <p style="color:#64748b; font-size: 0.95rem; margin-bottom: 0;">
          Create a new project tailored for <b>${formData.name}</b> or invite them to one of your existing projects.
        </p>
      `,
      icon: 'question',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: '📝 Post New Project',
      denyButtonText: '📁 Existing Projects',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#e65100',
      denyButtonColor: '#0284c7',
      cancelButtonColor: '#94a3b8'
    }).then((res) => {
      if (res.isConfirmed) {
        navigate('/client-post-project', {
          state: { preferredFreelancer: formData.name, freelancerId: targetUserId }
        })
      } else if (res.isDenied) {
        navigate('/client-manage-project')
      }
    })
  }

  const handleContactDirect = () => {
    Swal.fire({
      title: `Contact ${formData.name || 'Freelancer'}`,
      html: `
        <div style="text-align: left; padding: 10px; font-size: 0.95rem; color: #334155;">
          <p class="mb-2"><strong>📧 Email:</strong> <a href="mailto:${formData.email || ''}">${formData.email || 'N/A'}</a></p>
          <p class="mb-2"><strong>📞 Phone:</strong> ${formData.phone || 'Available upon engagement'}</p>
          <p class="mb-0"><strong>📍 Location:</strong> ${formData.location || 'Remote'}</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Send Email Now',
      confirmButtonColor: '#e65100',
      showCancelButton: true,
      cancelButtonText: 'Close'
    }).then((res) => {
      if (res.isConfirmed && formData.email) {
        window.location.href = `mailto:${formData.email}?subject=Project Hiring Inquiry on Zentora`
      }
    })
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
        Swal.fire({ title: 'Photo Selected', text: 'Click "Save Changes" to apply your new profile photo.', icon: 'success', timer: 1800, showConfirmButton: false })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setAvatarPreview(null)
    Swal.fire({ title: 'Photo Removed', text: 'Default avatar restored. Click "Save Changes" to persist.', icon: 'info', timer: 1500, showConfirmButton: false })
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
        Swal.fire({ icon: 'success', title: 'Profile Updated!', text: 'Your profile has been saved successfully', timer: 2000, showConfirmButton: false })
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to update profile' })
    } finally { setSaving(false) }
  }

  const getAvatarUrl = (name) => {
    const colors = ['0ea5e9', '6366f1', '8b5cf6', 'ec4899', 'f59e0b', '10b981']
    const color = colors[Math.abs((name || '').length) % colors.length]
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=${color}&color=fff&bold=true&size=120&font-size=0.4`
  }

  const memberSince = profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : 'N/A'

  const skillsArr = (formData.skill || '').split(',').map(s => s.trim()).filter(Boolean)

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        <p className="mt-3 text-muted fw-semibold">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="container py-5">
      {/* ── Blocked by Admin Alert Banner ── */}
      {isBlocked && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm mb-4 border-danger" data-aos="fade-down">
          <div className="d-flex align-items-center gap-3">
            <FaBan className="fs-2 text-danger flex-shrink-0" />
            <div>
              <h6 className="alert-heading fw-bold mb-1 text-danger">Profile Blocked by Admin</h6>
              <p className="small mb-0 text-dark">
                This freelancer account has been restricted by administration. Bidding and contract participation are currently disabled.
              </p>
            </div>
          </div>
          <span className="badge bg-danger text-white px-3 py-2 rounded-pill fw-bold">BLOCKED BY ADMIN</span>
        </div>
      )}

      {/* ── Bidding Proposal Review Evaluation Header ── */}
      {location.state?.from === '/client-Review-bids' && location.state?.project && (
        <div
          className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 p-3 rounded-4 shadow-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(14, 165, 233, 0.12))',
            border: '1.5px solid rgba(79, 70, 229, 0.3)'
          }}
          data-aos="fade-down"
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center text-white rounded-circle shadow-sm"
              style={{
                width: '44px',
                height: '44px',
                minWidth: '44px',
                background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
                fontSize: '1.2rem'
              }}
            >
              <FaGavel />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="badge bg-primary text-white" style={{ fontSize: '0.68rem', letterSpacing: '0.5px' }}>
                  PROPOSAL EVALUATION MODE
                </span>
                <span className="fw-bold text-dark small">
                  Project: <u>{location.state.project.title || 'Selected Project'}</u>
                </span>
                {location.state.project.budget && (
                  <span className="badge bg-success-subtle text-success border border-success-subtle small">
                    Budget: ₹{location.state.project.budget}
                  </span>
                )}
              </div>
              <p className="text-secondary small mb-0 mt-1">
                Inspecting <b>{formData.name || 'freelancer'}</b>'s verified credentials, work history, and portfolio before finalizing your decision.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm px-4 py-2 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
              onClick={() => navigate('/client-Review-bids', { state: location.state.project })}
            >
              <FaArrowLeft size={12} /> Return to Proposals
            </button>
          </div>
        </div>
      )}

      {/* ── Client Mode Notice Bar ── */}
      {!isOwner && isClientViewer && (
        <div
          className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4 p-3 rounded-4 shadow-sm"
          style={{ background: 'linear-gradient(135deg, rgba(230,81,0,0.08), rgba(106,27,154,0.08))', border: '1px solid rgba(230,81,0,0.2)' }}
          data-aos="fade-down"
        >
          <div className="d-flex align-items-center gap-2">
            <FaShieldAlt color="#e65100" size={20} />
            <div>
              <span className="fw-bold text-dark small d-block">
                Client Employer View • Reviewing candidate <b>{formData.name || 'Freelancer'}</b>
              </span>
              <span className="text-secondary small">
                Escrow protected contracts • Verified skill assessments • Satisfaction guaranteed
              </span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm text-white fw-bold px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #e65100, #ff7043)', border: 'none' }}
              onClick={handleHireDirect}
            >
              <FaBolt /> Hire Candidate
            </button>
            <button
              className="btn btn-sm btn-outline-secondary px-3 py-2 rounded-pill d-inline-flex align-items-center gap-1"
              onClick={() => {
                if (location.state?.from === '/client-Review-bids' && location.state?.project) {
                  navigate('/client-Review-bids', { state: location.state.project });
                } else {
                  navigate('/');
                }
              }}
            >
              <FaArrowLeft size={11} /> {location.state?.from === '/client-Review-bids' ? 'Back to Proposals' : 'Back to Talents'}
            </button>
          </div>
        </div>
      )}
      <style>{`
        .profile-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0ea5e9 100%);
          border-radius: 24px;
          padding: 0;
          overflow: hidden;
          position: relative;
        }
        /* ── Mirror Shine Sweep on Hero ── */
        .profile-hero .mirror-shine {
          position: absolute;
          top: 0; left: -120%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255,255,255,0.03) 30%,
            rgba(255,255,255,0.12) 45%,
            rgba(255,255,255,0.2) 50%,
            rgba(255,255,255,0.12) 55%,
            rgba(255,255,255,0.03) 70%,
            transparent 80%
          );
          transform: skewX(-18deg);
          z-index: 3;
          pointer-events: none;
          animation: mirrorSweep 4s ease-in-out infinite;
        }
        @keyframes mirrorSweep {
          0% { left: -120%; }
          40% { left: 180%; }
          100% { left: 180%; }
        }
        .profile-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulseGlow 4s ease-in-out infinite;
        }
        .profile-hero::after {
          content: '';
          position: absolute;
          bottom: -30%;
          left: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulseGlow 5s ease-in-out infinite reverse;
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        /* ── Mirror Shine on Stat Pills (hover) ── */
        .stat-pill {
          position: relative;
          overflow: hidden;
        }
        .stat-pill::after {
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
        .stat-pill:hover::after { left: 180%; }
        /* ── Mirror Shine on Info Cards (hover) ── */
        .info-card {
          position: relative;
          overflow: hidden;
        }
        .info-card::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(105deg, transparent 25%, rgba(14,165,233,0.04) 40%, rgba(14,165,233,0.1) 50%, rgba(14,165,233,0.04) 60%, transparent 75%);
          transform: skewX(-18deg);
          transition: left 0.7s ease;
          pointer-events: none;
          z-index: 1;
        }
        .info-card:hover::after { left: 180%; }
        .profile-avatar-ring {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          padding: 4px;
          background: linear-gradient(135deg, #0ea5e9, #6366f1, #ec4899);
          animation: ringRotate 6s linear infinite;
        }
        @keyframes ringRotate {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        .profile-avatar-ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #0f172a;
        }
        .user-avatar-upload-overlay {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 3px solid #0f172a;
          font-size: 14px;
          z-index: 5;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .user-avatar-upload-overlay:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 14px rgba(14,165,233,0.5);
        }
        .verified-badge {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #0f172a;
          font-size: 12px;
        }
        .stat-pill {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          padding: 16px 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        .stat-pill:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }
        .stat-pill .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          line-height: 1;
        }
        .stat-pill .stat-label {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
          font-weight: 600;
        }
        .profile-tab-btn {
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
        .profile-tab-btn:hover { color: #0ea5e9; }
        .profile-tab-btn.active {
          color: #0ea5e9;
          border-bottom-color: #0ea5e9;
        }
        .info-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
        }
        .info-card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: default;
        }
        .skill-tag:nth-child(6n+1) { background: #eff6ff; color: #2563eb; }
        .skill-tag:nth-child(6n+2) { background: #f0fdf4; color: #16a34a; }
        .skill-tag:nth-child(6n+3) { background: #fef3c7; color: #d97706; }
        .skill-tag:nth-child(6n+4) { background: #fce7f3; color: #db2777; }
        .skill-tag:nth-child(6n+5) { background: #ede9fe; color: #7c3aed; }
        .skill-tag:nth-child(6n+6) { background: #ecfdf5; color: #059669; }
        .skill-tag:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .edit-form-input {
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          padding: 12px 18px;
          font-size: 0.92rem;
          transition: all 0.3s ease;
          background: #f8fafc;
        }
        .edit-form-input:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 4px rgba(14,165,233,0.1);
          background: white;
          outline: none;
        }
        .save-btn {
          background: linear-gradient(135deg, #0ea5e9, #6366f1);
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
        .save-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .save-btn:hover::before { left: 100%; }
        .save-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(14,165,233,0.4); }
        .cancel-btn {
          background: #f1f5f9;
          border: 2px solid #e2e8f0;
          color: #64748b;
          padding: 14px 36px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }
        .cancel-btn:hover { background: #fee2e2; color: #ef4444; border-color: #fecaca; }
        .quick-link-card {
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
        .quick-link-card:hover {
          transform: translateX(6px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          border-color: #0ea5e9;
        }
        .quick-link-icon {
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
      <div className="profile-hero mb-4" data-aos="fade-down" data-aos-duration="800">
        <div className="mirror-shine"></div>
        <div className="p-4 p-md-5 position-relative" style={{ zIndex: 2 }}>
          <div className="d-flex flex-wrap align-items-center gap-4">
            {/* Avatar */}
            <div className="position-relative" data-aos="zoom-in" data-aos-delay="200">
              <div className="profile-avatar-ring">
                <img src={avatarPreview || getAvatarUrl(formData.name)} alt={formData.name} />
              </div>
              <div className="verified-badge">
                <FaCheckCircle />
              </div>
              {isOwner && (
                <>
                  <label htmlFor="user-avatar-upload" className="user-avatar-upload-overlay" title="Change Profile Photo">
                    <FaCamera />
                  </label>
                  <input type="file" id="user-avatar-upload" accept="image/*" className="d-none" onChange={handlePhotoUpload} />
                </>
              )}
            </div>

            {/* Info */}
            <div className="flex-grow-1" data-aos="fade-left" data-aos-delay="300">
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge px-3 py-1" style={{ background: isOwner ? 'rgba(14,165,233,0.2)' : 'rgba(230,81,0,0.2)', color: isOwner ? '#7dd3fc' : '#ff7043', fontSize: '0.7rem', fontWeight: 700, borderRadius: '100px', letterSpacing: '1px' }}>
                  <FaBolt className="me-1" /> {isOwner ? 'FREELANCER' : 'TOP VETTED FREELANCER'}
                </span>
                <span className="badge px-3 py-1" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', fontSize: '0.7rem', fontWeight: 700, borderRadius: '100px' }}>
                  ● AVAILABLE FOR HIRE
                </span>
              </div>
              <h2 className="fw-bold text-white mb-1" style={{ fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
                {formData.name || 'Freelancer'}
              </h2>
              <p className="mb-1" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
                {formData.headline || 'Professional Freelancer'}
              </p>
              <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
                {formData.location && (
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                    <FaMapMarkerAlt className="me-1" /> {formData.location}
                  </span>
                )}
                {formData.rate && (
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                    <FaRupeeSign className="me-1" /> ₹{formData.rate}/hr
                  </span>
                )}
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                  <FaCalendarAlt className="me-1" /> Member since {memberSince}
                </span>
              </div>
            </div>

            {/* Action Buttons (Edit for Owner vs Hire/Contact for Client) */}
            <div data-aos="fade-left" data-aos-delay="400">
              {isOwner ? (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn d-flex align-items-center gap-2 fw-bold px-4 py-2"
                  style={{
                    background: isEditing ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.15)',
                    color: isEditing ? '#fca5a5' : 'white',
                    border: `1px solid ${isEditing ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.25)'}`,
                    borderRadius: '14px',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isEditing ? <><FaTimes /> Cancel</> : <><FaEdit /> Edit Profile</>}
                </button>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {location.state?.from === '/client-Review-bids' && location.state?.project && (
                    <button
                      onClick={() => navigate('/client-Review-bids', { state: location.state.project })}
                      className="btn d-flex align-items-center gap-2 fw-bold px-3 py-2 text-white shadow-sm"
                      style={{
                        background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
                        borderRadius: '14px',
                        border: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      title="Return back to the proposal list for this project"
                    >
                      <FaArrowLeft size={12} /> Return to Proposals
                    </button>
                  )}
                  <button
                    onClick={handleHireDirect}
                    className="btn d-flex align-items-center gap-2 fw-bold px-4 py-2 text-white shadow-sm"
                    style={{
                      background: 'linear-gradient(135deg, #e65100, #ff7043)',
                      borderRadius: '14px',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <FaBolt /> Hire Freelancer
                  </button>
                  <button
                    onClick={handleContactDirect}
                    className="btn d-flex align-items-center gap-2 fw-bold px-3 py-2 text-white"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.25)',
                      borderRadius: '14px',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <FaEnvelope /> Contact
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="row g-3 mt-4" data-aos="fade-up" data-aos-delay="500">
            {isOwner ? (
              <>
                <div className="col-6 col-md-3">
                  <div className="stat-pill">
                    <div className="stat-value">{stats?.credits ?? profileData?.credit ?? 0}</div>
                    <div className="stat-label">Credits</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-pill">
                    <div className="stat-value">{stats?.totalBids ?? 0}</div>
                    <div className="stat-label">Total Bids</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-pill">
                    <div className="stat-value">{stats?.acceptedBids ?? 0}</div>
                    <div className="stat-label">Won</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-pill">
                    <div className="stat-value">₹{stats?.Earning ?? 0}</div>
                    <div className="stat-label">Earnings</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-6 col-md-3">
                  <div className="stat-pill">
                    <div className="stat-value" style={{ color: '#e65100' }}>4.9 ★</div>
                    <div className="stat-label">Client Rating</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-pill">
                    <div className="stat-value" style={{ color: '#16a34a' }}>99%</div>
                    <div className="stat-label">Job Success</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-pill">
                    <div className="stat-value" style={{ color: '#0284c7' }}>
                      {stats?.projectsCompleted ?? stats?.acceptedBids ?? 0}
                    </div>
                    <div className="stat-label">Projects Completed</div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-pill">
                    <div className="stat-value" style={{ color: '#6a1b9a' }}>
                      {formData.rate ? (formData.rate.startsWith('₹') ? formData.rate : `₹${formData.rate}`) : '₹1800/hr'}
                    </div>
                    <div className="stat-label">Hourly Rate</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ═══ TABS (Only shown for Owner) ═══ */}
      {isOwner && (
        <div className="d-flex border-bottom mb-4" data-aos="fade-up" data-aos-delay="100">
          {['overview', 'edit'].map(tab => (
            <button
              key={tab}
              className={`profile-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => { setActiveTab(tab); if (tab === 'edit') setIsEditing(true) }}
            >
              {tab === 'overview' ? '👤 Overview' : '✏️ Edit Profile'}
            </button>
          ))}
        </div>
      )}

      {/* ═══ CONTENT AREA ═══ */}
      {(!isOwner || (activeTab === 'overview' && !isEditing)) ? (
        <div className="row g-4">
          {/* Left Col - Details */}
          <div className="col-lg-8">
            {/* About */}
            <div className="info-card mb-4" data-aos="fade-up" data-aos-delay="100">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FaUserTie style={{ color: '#0ea5e9' }} /> About Me
              </h5>
              <p className="text-muted mb-0" style={{ lineHeight: 1.8, fontSize: '0.95rem' }}>
                {formData.bio || 'No bio added yet. Click "Edit Profile" to add your professional summary.'}
              </p>
            </div>

            {/* Skills */}
            <div className="info-card mb-4" data-aos="fade-up" data-aos-delay="200">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FaCode style={{ color: '#6366f1' }} /> Skills & Expertise
              </h5>
              {skillsArr.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {skillsArr.map((skill, i) => (
                    <span key={i} className="skill-tag" data-aos="zoom-in" data-aos-delay={100 + i * 50}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No skills added yet.</p>
              )}
            </div>

            {/* Contact Info */}
            <div className="info-card" data-aos="fade-up" data-aos-delay="300">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FaShieldAlt style={{ color: '#10b981' }} /> Contact Information
              </h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: '#f8fafc' }}>
                    <FaEnvelope style={{ color: '#0ea5e9', fontSize: '1.1rem' }} />
                    <div>
                      <small className="text-muted d-block" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</small>
                      <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>{formData.email}</span>
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
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: '#f8fafc' }}>
                    <FaRupeeSign style={{ color: '#6366f1', fontSize: '1.1rem' }} />
                    <div>
                      <small className="text-muted d-block" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hourly Rate</small>
                      <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>₹{formData.rate || '0'}/hr</span>
                    </div>
                  </div>
                </div>
                {formData.phone && (
                  <div className="col-md-6">
                    <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: '#f8fafc' }}>
                      <FaUser style={{ color: '#ec4899', fontSize: '1.1rem' }} />
                      <div>
                        <small className="text-muted d-block" style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</small>
                        <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>{formData.phone}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Col - Quick Links */}
          <div className="col-lg-4">
            <div className="info-card mb-4" data-aos="fade-left" data-aos-delay="200">
              <h6 className="fw-bold mb-3 text-muted" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Navigation</h6>
              <div className="d-flex flex-column gap-3">
                {isOwner ? (
                  <>
                    <Link to="/user-dashboard" className="quick-link-card">
                      <div className="quick-link-icon" style={{ background: '#eff6ff', color: '#2563eb' }}><FaBolt /></div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Dashboard</div>
                        <small className="text-muted">View your overview</small>
                      </div>
                      <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                    </Link>
                    <Link to="/user-project" className="quick-link-card">
                      <div className="quick-link-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><FaGavel /></div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Browse Projects</div>
                        <small className="text-muted">Find new work</small>
                      </div>
                      <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                    </Link>
                    <Link to="/user-bids" className="quick-link-card">
                      <div className="quick-link-icon" style={{ background: '#fef3c7', color: '#d97706' }}><FaStar /></div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>My Bids</div>
                        <small className="text-muted">Track proposals</small>
                      </div>
                      <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                    </Link>
                    <Link to="/user-plans" className="quick-link-card">
                      <div className="quick-link-icon" style={{ background: '#fce7f3', color: '#db2777' }}><FaCoins /></div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Buy Credits</div>
                        <small className="text-muted">Purchase plans</small>
                      </div>
                      <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleHireDirect}
                      className="quick-link-card w-100 text-start border-0"
                      style={{ cursor: 'pointer', background: 'white' }}
                    >
                      <div className="quick-link-icon" style={{ background: 'rgba(230,81,0,0.1)', color: '#e65100' }}><FaBolt /></div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Hire Candidate</div>
                        <small className="text-muted">Post or assign project</small>
                      </div>
                      <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                    </button>
                    <button
                      onClick={handleContactDirect}
                      className="quick-link-card w-100 text-start border-0"
                      style={{ cursor: 'pointer', background: 'white' }}
                    >
                      <div className="quick-link-icon" style={{ background: '#e0f2fe', color: '#0ea5e9' }}><FaEnvelope /></div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Send Inquiry</div>
                        <small className="text-muted">Contact directly</small>
                      </div>
                      <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                    </button>
                    <Link to="/" className="quick-link-card">
                      <div className="quick-link-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><FaArrowLeft /></div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.9rem', color: '#1e293b' }}>Explore Talents</div>
                        <small className="text-muted">Browse other top talent</small>
                      </div>
                      <FaArrowRight className="ms-auto text-muted" style={{ fontSize: '0.8rem' }} />
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Account Info */}
            <div className="info-card" data-aos="fade-left" data-aos-delay="300">
              <h6 className="fw-bold mb-3 text-muted" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Account Details</h6>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: '#f1f5f9 !important' }}>
                  <span className="text-muted small">Account Type</span>
                  <span className="fw-bold small" style={{ color: '#0ea5e9' }}>Freelancer</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: '#f1f5f9 !important' }}>
                  <span className="text-muted small">Member Since</span>
                  <span className="fw-bold small">{memberSince}</span>
                </div>
                {isOwner ? (
                  <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: '#f1f5f9 !important' }}>
                    <span className="text-muted small">Credits Balance</span>
                    <span className="fw-bold small text-success">{stats?.credits ?? profileData?.credit ?? 0}</span>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between py-2 border-bottom" style={{ borderColor: '#f1f5f9 !important' }}>
                    <span className="text-muted small">Verification</span>
                    <span className="fw-bold small text-success">Verified Professional</span>
                  </div>
                )}
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
            <div className="info-card">
              <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
                <FaEdit style={{ color: '#0ea5e9' }} /> Edit Your Profile
              </h5>
              <p className="text-muted small mb-4">Update your professional information below.</p>

              {/* Profile Photo Upload Section */}
              <div className="d-flex align-items-center gap-4 p-4 rounded-4 border mb-4" style={{ background: '#f8fafc' }}>
                <div className="position-relative">
                  <div style={{ width: 80, height: 80, borderRadius: '50%', padding: 3, background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #ec4899)' }}>
                    <img src={avatarPreview || getAvatarUrl(formData.name)} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid white' }} />
                  </div>
                </div>
                <div>
                  <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>Profile Photo</h6>
                  <p className="text-muted mb-2" style={{ fontSize: '0.78rem' }}>JPG, PNG or GIF. Max 2MB recommended.</p>
                  <div className="d-flex gap-2">
                    <label htmlFor="user-avatar-edit-upload" className="btn btn-sm d-inline-flex align-items-center gap-1 fw-semibold text-white" style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: '0.82rem', padding: '6px 16px' }}>
                      <FaCamera size={12} /> Upload Photo
                    </label>
                    <input type="file" id="user-avatar-edit-upload" accept="image/*" className="d-none" onChange={handlePhotoUpload} />
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
                      <FaUser className="me-1" style={{ color: '#0ea5e9' }} /> Full Name
                    </label>
                    <input type="text" className="form-control edit-form-input" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-muted">
                      <FaEnvelope className="me-1" style={{ color: '#6366f1' }} /> Email Address
                    </label>
                    <input type="email" className="form-control edit-form-input" value={formData.email}
                      readOnly style={{ background: '#f1f5f9', cursor: 'not-allowed' }} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small text-muted">Professional Title / Headline</label>
                    <input type="text" className="form-control edit-form-input" placeholder="e.g. Senior React & Node.js Developer"
                      value={formData.headline} onChange={(e) => setFormData({ ...formData, headline: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small text-muted">
                      <FaRupeeSign className="me-1" style={{ color: '#f59e0b' }} /> Hourly Rate (₹)
                    </label>
                    <input type="number" className="form-control edit-form-input" value={formData.rate}
                      onChange={(e) => setFormData({ ...formData, rate: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small text-muted">
                      <FaMapMarkerAlt className="me-1" style={{ color: '#10b981' }} /> Location
                    </label>
                    <input type="text" className="form-control edit-form-input" value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold small text-muted">
                      <FaUser className="me-1" style={{ color: '#ec4899' }} /> Phone
                    </label>
                    <input type="text" className="form-control edit-form-input" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small text-muted">
                      <FaCode className="me-1" style={{ color: '#6366f1' }} /> Key Skills (Comma Separated)
                    </label>
                    <input type="text" className="form-control edit-form-input" placeholder="React, Node.js, MongoDB, Figma"
                      value={formData.skill} onChange={(e) => setFormData({ ...formData, skill: e.target.value })} />
                    {formData.skill && (
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {formData.skill.split(',').map((s, i) => s.trim() && (
                          <span key={i} className="skill-tag">{s.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold small text-muted">Bio / Overview</label>
                    <textarea className="form-control edit-form-input" rows="5" value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })} 
                      placeholder="Tell clients about your experience and expertise..." />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                  <button type="button" className="cancel-btn" onClick={() => { setIsEditing(false); setActiveTab('overview') }}>
                    <FaTimes className="me-2" /> Cancel
                  </button>
                  <button type="submit" className="save-btn" disabled={saving}>
                    {saving ? (
                      <><span className="spinner-border spinner-border-sm me-2"></span> Saving...</>
                    ) : (
                      <><FaSave className="me-2" /> Save Changes</>
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

export default UserProfile
