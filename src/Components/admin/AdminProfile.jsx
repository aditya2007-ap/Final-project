import React from 'react';
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

const AdminProfile = () => {
  return (
    <div className="admin-plans-wrapper py-5">
      <div className="container">
        {/* Header Subtitle & Title */}
        <span className="admin-subtitle text-uppercase fw-bold">ZENTORA ADMIN</span>
        <h1 className="admin-title fw-bold mb-4">Admin Management Dashboard</h1>

        {/* Main Profile Card */}
        <div className="admin-plans-card bg-white p-4 p-md-5 rounded-4 shadow-sm border">
          
          {/* Header Block */}
          <div className="admin-plan-header-block mb-4 pb-3 border-bottom">
            <h3 className="admin-plan-header-title fw-bold mb-2 d-flex align-items-center">
              <FiUserCheck className="text-color1 me-2" />
              Administrator Profile &amp; Settings
            </h3>
            <p className="admin-plan-header-desc text-muted mb-0">
              Manage your personal admin account details, contact information, security preferences, and profile photo.
            </p>
          </div>

          {/* Profile Overview Banner with Photo Update Controls */}
          <div className="p-4 rounded-4 border bg-light mb-4 d-flex align-items-center justify-content-between flex-wrap gap-4">
            <div className="d-flex align-items-center gap-3">
              
              {/* Avatar Wrapper with Camera Overlay */}
              <div className="admin-profile-avatar-wrapper">
                <div className="admin-profile-avatar-box">
                  <span>AD</span>
                </div>

                {/* Camera Overlay Icon Button */}
                <label htmlFor="avatar-file-input" className="avatar-upload-btn" title="Update Profile Photo">
                  <FiCamera />
                </label>
                <input
                  type="file"
                  id="avatar-file-input"
                  accept="image/*"
                  className="d-none"
                />
              </div>

              <div>
                <h4 className="fw-bold m-0 text-dark">Zentora Administrator</h4>
                <div className="d-flex align-items-center gap-2 mt-1 flex-wrap">
                  <span className="badge bg-danger text-white px-3 py-1 rounded-pill fw-semibold">
                    <FiShield className="me-1" /> Super Admin
                  </span>
                  <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill fw-semibold">
                    <FiCheckCircle className="me-1" /> Active Status
                  </span>
                </div>
                
                {/* Photo Update Buttons */}
                <div className="d-flex align-items-center gap-2 mt-3">
                  <label htmlFor="avatar-file-input" className="btn btn-sm btn-outline-danger fw-semibold d-inline-flex align-items-center gap-1 cursor-pointer">
                    <FiCamera /> Update Photo
                  </label>
                  <button
                    type="button"
                    className="btn btn-sm btn-light border text-danger fw-semibold d-inline-flex align-items-center gap-1"
                  >
                    <FiTrash2 /> Remove Photo
                  </button>
                </div>
              </div>
            </div>

            <div className="text-sm-end text-muted">
              <div className="d-flex align-items-center gap-1 justify-content-sm-end mb-1">
                <FiMail className="text-color1" />
                <span className="fw-semibold text-dark">admin@zentora.com</span>
              </div>
              <div className="d-flex align-items-center gap-1 justify-content-sm-end small">
                <FiClock className="text-muted" />
                <span>Member since January 2024</span>
              </div>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Personal Information Box */}
            <div className="admin-plan-form-box p-4 rounded-4 border bg-light mb-4">
              <h5 className="admin-plan-form-title fw-bold mb-4 d-flex align-items-center">
                <FiUser className="text-color1 me-2 fs-5" />
                Personal Information
              </h5>

              <div className="row g-4">
                <div className="col-md-4 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiUser className="me-1 text-muted" /> First Name
                  </label>
                  <input type="text" className="form-control" defaultValue="Zentora" placeholder="e.g. John" />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiUser className="me-1 text-muted" /> Last Name
                  </label>
                  <input type="text" className="form-control" defaultValue="Administrator" placeholder="e.g. Doe" />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiMail className="me-1 text-muted" /> Email Address
                  </label>
                  <input type="email" className="form-control" defaultValue="admin@zentora.com" placeholder="e.g. admin@zentora.com" />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiPhone className="me-1 text-muted" /> Phone Number
                  </label>
                  <input type="text" className="form-control" defaultValue="+91 98765 43210" placeholder="e.g. +91 98765 43210" />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiShield className="me-1 text-muted" /> Role Designation
                  </label>
                  <input type="text" className="form-control bg-white" defaultValue="Super Administrator" readOnly />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiBriefcase className="me-1 text-muted" /> Department
                  </label>
                  <input type="text" className="form-control" defaultValue="Platform Operations" placeholder="e.g. Management" />
                </div>
              </div>
            </div>

            {/* Security & Password Box */}
            <div className="admin-plan-form-box p-4 rounded-4 border bg-light mb-4">
              <h5 className="admin-plan-form-title fw-bold mb-4 d-flex align-items-center">
                <FiLock className="text-color1 me-2 fs-5" />
                Security &amp; Password Settings
              </h5>

              <div className="row g-4">
                <div className="col-md-4 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiKey className="me-1 text-muted" /> Current Password
                  </label>
                  <input type="password" className="form-control" placeholder="••••••••" />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiLock className="me-1 text-muted" /> New Password
                  </label>
                  <input type="password" className="form-control" placeholder="Enter new password" />
                </div>

                <div className="col-md-4 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiCheckCircle className="me-1 text-muted" /> Confirm New Password
                  </label>
                  <input type="password" className="form-control" placeholder="Confirm new password" />
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="d-flex align-items-center justify-content-end gap-3 pt-3 border-top">
              <button type="button" className="btn btn-light border px-4 py-2 fw-semibold text-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-danger text-white px-4 py-2 fw-bold border-0 btn-add-plan d-inline-flex align-items-center gap-2">
                <FiSave className="fs-5" />
                Save Profile Changes
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
