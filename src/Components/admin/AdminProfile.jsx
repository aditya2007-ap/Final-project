import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FiUserCheck,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiBriefcase,
  FiLock,
  FiKey,
  FiSave,
  FiClock,
  FiCheckCircle,
  FiCamera,
  FiTrash2
} from 'react-icons/fi';
import Swal from 'sweetalert2';

const AdminProfile = () => {
  const navigate = useNavigate();

  const [loggedInInfo] = useState(() => {
    try { return JSON.parse(localStorage.getItem('info')) } catch { return null }
  });

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Platform Operations & Governance'
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Auth guard: Ensure logged-in user is admin
  useEffect(() => {
    if (!loggedInInfo?._id) {
      navigate('/login', { replace: true });
    } else if (loggedInInfo?.type === 'client') {
      navigate('/client-profile', { replace: true });
    } else if (loggedInInfo?.type === 'user') {
      navigate('/user-profile', { replace: true });
    }
  }, [loggedInInfo, navigate]);

  const fetchAdminProfile = useCallback(async () => {
    if (!loggedInInfo?._id) return;
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:9000/get-profile?userId=${loggedInInfo._id}`);
      if (res?.data?.success && res.data.result) {
        const u = res.data.result;
        const nameParts = (u.name || '').trim().split(' ');
        const firstName = nameParts[0] || 'Admin';
        const lastName = nameParts.slice(1).join(' ') || '';

        setProfile({
          firstName,
          lastName,
          email: u.email || '',
          phone: u.phone || '',
          department: u.department || 'Platform Operations & Governance'
        });

        if (u.profile) {
          setAvatarPreview(u.profile);
        }
      }
    } catch (err) {
      console.error('Error fetching admin profile:', err);
      if (loggedInInfo) {
        const nameParts = (loggedInInfo.name || '').trim().split(' ');
        setProfile({
          firstName: nameParts[0] || 'Admin',
          lastName: nameParts.slice(1).join(' ') || '',
          email: loggedInInfo.email || '',
          phone: loggedInInfo.phone || '',
          department: loggedInInfo.department || 'Platform Operations & Governance'
        });
      }
    } finally {
      setLoading(false);
    }
  }, [loggedInInfo]);

  useEffect(() => {
    fetchAdminProfile();
  }, [fetchAdminProfile]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to Base64 so it can be saved persistently in MongoDB
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        Swal.fire({
          title: 'Photo Selected',
          text: 'Profile photo preview updated. Click "Save Profile Changes" to apply.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    Swal.fire({
      title: 'Photo Reset',
      text: 'Default avatar restored. Click "Save Profile Changes" to persist.',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!profile.firstName.trim()) {
      return Swal.fire({ title: 'Validation Error', text: 'First name cannot be empty', icon: 'warning' });
    }

    // Password validation if user entered something
    if (passwords.newPassword) {
      if (passwords.newPassword.length < 6) {
        return Swal.fire({ title: 'Weak Password', text: 'New password must be at least 6 characters long', icon: 'warning' });
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        return Swal.fire({ title: 'Mismatch', text: 'New password and confirm password do not match', icon: 'error' });
      }
    }

    setSaving(true);
    try {
      const fullName = `${profile.firstName.trim()} ${profile.lastName.trim()}`.trim();
      const payload = {
        userId: loggedInInfo._id,
        name: fullName,
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        department: profile.department.trim(),
        profile: avatarPreview || ''
      };

      if (passwords.newPassword) {
        payload.currentPassword = passwords.currentPassword;
        payload.newPassword = passwords.newPassword;
      }

      const res = await axios.put('http://localhost:9000/update-profile', payload);

      if (res?.data?.success) {
        const updated = res.data.result;
        const newInfo = { ...loggedInInfo, ...updated };
        localStorage.setItem('info', JSON.stringify(newInfo));

        // Reset password fields
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });

        Swal.fire({
          title: 'Profile Saved!',
          text: 'Administrator profile details and security preferences updated successfully.',
          icon: 'success',
          confirmButtonColor: '#e65100',
          timer: 2000
        });
      } else {
        Swal.fire({
          title: 'Update Failed',
          text: res?.data?.message || 'Could not update administrator profile',
          icon: 'error',
          confirmButtonColor: '#e65100'
        });
      }
    } catch (err) {
      console.error('Admin update error:', err);
      Swal.fire({
        title: 'Error',
        text: err?.response?.data?.message || 'An error occurred while saving profile changes.',
        icon: 'error',
        confirmButtonColor: '#e65100'
      });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    const f = profile.firstName?.[0] || 'A';
    const l = profile.lastName?.[0] || 'D';
    return (f + l).toUpperCase();
  };

  if (loading) {
    return (
      <div className="admin-dashboard-wrapper py-5 text-center">
        <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: '#e65100' }}></div>
        <p className="mt-3 text-muted fw-semibold">Loading administrator credentials...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-wrapper py-5">
      <div className="container">
        {/* Header Subtitle & Title */}
        <div data-aos="fade-down" className="mb-4">
          <div className="dash-eyebrow">ZENTORA ADMIN</div>
          <h1 className="dash-heading d-flex align-items-center gap-3">
            <FiUserCheck className="text-color1" />
            Administrator Profile &amp; Security Settings
          </h1>
          <p className="admin-lead mb-4">
            Manage your master credentials, contact preferences, role designations, and security policies.
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="dash-card" data-aos="zoom-in" data-aos-duration="800">
          {/* Profile Overview Banner with Photo Update Controls */}
          <div className="p-4 rounded-4 border mb-4 d-flex align-items-center justify-content-between flex-wrap gap-4" style={{ background: '#fafbfc' }}>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              {/* Avatar Wrapper with Camera Overlay */}
              <div className="admin-profile-avatar-wrapper">
                <div className="admin-profile-avatar-box">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="admin-profile-avatar-img" />
                  ) : (
                    <span>{getInitials()}</span>
                  )}
                </div>

                <label htmlFor="avatar-file-input" className="avatar-upload-btn" title="Update Profile Photo">
                  <FiCamera />
                </label>
                <input
                  type="file"
                  id="avatar-file-input"
                  accept="image/*"
                  className="d-none"
                  onChange={handlePhotoUpload}
                />
              </div>

              <div>
                <h4 className="fw-bold m-0" style={{ fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
                  {profile.firstName} {profile.lastName}
                </h4>
                <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                  <span className="badge px-3 py-1 rounded-pill fw-semibold" style={{ background: 'rgba(230, 81, 0, 0.12)', color: '#e65100', border: '1px solid rgba(230, 81, 0, 0.25)' }}>
                    <FiShield className="me-1" /> Super Administrator
                  </span>
                  <span className="badge px-3 py-1 rounded-pill fw-semibold" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                    <FiCheckCircle className="me-1" /> System Active
                  </span>
                </div>

                {/* Photo Update Buttons */}
                <div className="d-flex align-items-center gap-2 mt-3">
                  <label
                    htmlFor="avatar-file-input"
                    className="action-btn action-btn-block cursor-pointer m-0"
                  >
                    <FiCamera /> Change Photo
                  </label>
                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="action-btn action-btn-delete m-0"
                    >
                      <FiTrash2 /> Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="text-sm-end text-muted" style={{ fontFamily: 'var(--font-body)' }}>
              <div className="d-flex align-items-center gap-1 justify-content-sm-end mb-1">
                <FiMail className="text-color1" />
                <span className="fw-semibold text-dark">{profile.email}</span>
              </div>
              <div className="d-flex align-items-center gap-1 justify-content-sm-end small">
                <FiClock className="text-muted" />
                <span>Super Admin Privileges Enabled</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave}>
            {/* Personal Information Box */}
            <div className="p-4 rounded-4 border mb-4" style={{ background: '#fafbfc' }}>
              <h5 className="fw-bold mb-4 d-flex align-items-center" style={{ fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
                <FiUser className="text-color1 me-2 fs-5" />
                Personal &amp; Contact Details
              </h5>

              <div className="row g-4">
                <div className="col-md-4 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiUser className="me-1 text-muted" /> First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiUser className="me-1 text-muted" /> Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiMail className="me-1 text-muted" /> Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiPhone className="me-1 text-muted" /> Phone Contact
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.phone}
                    placeholder="+91 98765 43210"
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiShield className="me-1 text-muted" /> Role Title
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    defaultValue="Master Administrator"
                    readOnly
                  />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiBriefcase className="me-1 text-muted" /> Department Unit
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.department}
                    placeholder="Platform Operations & Governance"
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Security & Password Box */}
            <div className="p-4 rounded-4 border mb-4" style={{ background: '#fafbfc' }}>
              <h5 className="fw-bold mb-4 d-flex align-items-center" style={{ fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
                <FiLock className="text-color1 me-2 fs-5" />
                Security &amp; Password Policies
              </h5>

              <div className="row g-4">
                <div className="col-md-4 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiKey className="me-1 text-muted" /> Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter current password"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiLock className="me-1 text-muted" /> New Master Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Minimum 6 characters"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiCheckCircle className="me-1 text-muted" /> Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Re-enter new password"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="d-flex align-items-center justify-content-end gap-3 pt-3 border-top">
              <button
                type="submit"
                disabled={saving}
                className="btn text-white px-4 py-2 fw-bold border-0 d-inline-flex align-items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #ff5722 0%, #e65100 100%)',
                  borderRadius: '10px',
                  boxShadow: '0 4px 14px rgba(230, 81, 0, 0.3)'
                }}
              >
                {saving ? (
                  <><span className="spinner-border spinner-border-sm me-2"></span> Saving...</>
                ) : (
                  <><FiSave className="fs-5" /> Save Profile Changes</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
