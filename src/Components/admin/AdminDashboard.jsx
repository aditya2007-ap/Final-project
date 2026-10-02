import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiBriefcase, FiFolder, FiCreditCard, FiUserCheck, FiArrowRight } from 'react-icons/fi';
import { FaGavel, FaShieldAlt } from 'react-icons/fa';
import AdminProjects from './AdminProjects';

const AdminDashboard = () => {
  const [data, setData] = useState({ users: 0, clients: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:9000/admin-stats');
      setData(res?.data?.result || { users: 0, clients: 0, projects: 0 });
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      <div className="container">
        {/* Hero Header */}
        <div data-aos="fade-down" className="mb-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <div className="admin-hero-badge">
              <span className="admin-hero-badge-dot"></span>
              Zentora Master Control Panel
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge-live">System Active • Real-time</span>
            </div>
          </div>
          <h1 className="admin-title">
            Admin Management <span className="admin-title-gradient">Dashboard</span>
          </h1>
          <p className="admin-lead">
            Monitor real-time freelancer growth, hiring client activities, and platform projects.
          </p>

          {/* Quick Navigation Chips */}
          <div className="admin-quick-nav">
            <Link to="/admin-dashboard" className="admin-quick-chip active">
              <FaShieldAlt /> Overview
            </Link>
            <Link to="/admin-users" className="admin-quick-chip">
              <FiUsers /> Freelancers ({data?.users ?? 0})
            </Link>
            <Link to="/admin-clients" className="admin-quick-chip">
              <FiBriefcase /> Clients ({data?.clients ?? 0})
            </Link>
            <Link to="/admin-project" className="admin-quick-chip">
              <FiFolder /> Projects ({data?.projects ?? 0})
            </Link>
            <Link to="/admin-bids" className="admin-quick-chip">
              <FaGavel /> Proposal Bids
            </Link>
            <Link to="/admin-plans" className="admin-quick-chip">
              <FiCreditCard /> Credit Plans
            </Link>
            <Link to="/admin-profile" className="admin-quick-chip">
              <FiUserCheck /> Profile
            </Link>
          </div>
        </div>

        {/* Main Glass Card */}
        <div className="admin-main-card" data-aos="fade-up" data-aos-duration="800">
          {/* Stat Cards Grid */}
          <div className="row g-4 mb-4">
            {/* Card 1: Total Freelancers */}
            <div className="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
              <Link to="/admin-users" className="admin-stat-card card-orange text-decoration-none">
                <span className="badge-live">Live</span>
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-card-icon orange">
                    <FiUsers />
                  </div>
                  <div>
                    <div className="stat-number">{loading ? '...' : (data?.users ?? 0)}</div>
                    <div className="stat-title">Total Freelancers</div>
                    <div className="stat-subtitle">Registered talent</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Card 2: Active Clients */}
            <div className="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
              <Link to="/admin-clients" className="admin-stat-card card-purple text-decoration-none">
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-card-icon purple">
                    <FiBriefcase />
                  </div>
                  <div>
                    <div className="stat-number">{loading ? '...' : (data?.clients ?? 0)}</div>
                    <div className="stat-title">Active Clients</div>
                    <div className="stat-subtitle">Employers hiring</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Card 3: Live Projects */}
            <div className="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
              <Link to="/admin-project" className="admin-stat-card card-teal text-decoration-none">
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-card-icon teal">
                    <FiFolder />
                  </div>
                  <div>
                    <div className="stat-number">{loading ? '...' : (data?.projects ?? 0)}</div>
                    <div className="stat-title">Live Projects</div>
                    <div className="stat-subtitle">Posted by clients</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Card 4: Proposal Bids */}
            <div className="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
              <Link to="/admin-bids" className="admin-stat-card card-pink text-decoration-none">
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-card-icon pink">
                    <FaGavel />
                  </div>
                  <div>
                    <div className="stat-number"><FiArrowRight className="fs-4" /></div>
                    <div className="stat-title">Bidding Review</div>
                    <div className="stat-subtitle">Manage proposals</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Embedded Projects Section */}
          <div className="mt-4 pt-2">
            <AdminProjects isEmbedded={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
