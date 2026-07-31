import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiUsers, FiBriefcase, FiFolder } from 'react-icons/fi';
import AdminProjects from './AdminProjects'

const AdminDashboard = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async() => {
    const res = await axios.get('http://localhost:9000/admin-stats')
    setData(res?.data?.result)
  }
  return (
    <div className="admin-dashboard-wrapper">
      <div className="container">
        {/* Header */}
        <div data-aos="fade-down">
          <span className="admin-subtitle">ZENTORA ADMIN</span>
          <h1 className="admin-title">Admin Management Dashboard</h1>
        </div>

        {/* Main Card */}
        <div className="admin-main-card" data-aos="fade-up" data-aos-duration="800">
          {/* Stat Cards */}
          <div className="row g-4 mb-4">
            {/* Card 1: Total Freelancers */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="admin-stat-card card-teal">
                <span className="badge-live">Live</span>
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-card-icon teal">
                    <FiUsers />
                  </div>
                  <div className='px-4'>
                    <div className="stat-number ">{data?.users}</div>
                    <div className="stat-title">Total Freelancers</div>
                    <div className="stat-subtitle">Registered on platform</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Active Clients */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="admin-stat-card card-pink">
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-card-icon pink">
                    <FiBriefcase />
                  </div>
                  <div className='px-4'>
                    <div className="stat-number">{data?.clients}</div>
                    <div className="stat-title">Active Clients</div>
                    <div className="stat-subtitle">Hiring on Zentora</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Live Projects */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="admin-stat-card card-teal">
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-card-icon teal">
                    <FiFolder />
                  </div>
                  <div className='px-4'>
                    <div className="stat-number">{data?.projects}</div>
                    <div className="stat-title">Live Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h4 className="admin-section-title" data-aos="fade-up">Recent Administration Log</h4>

          {/* Table */}
          <div data-aos="fade-up" data-aos-delay="100">
            <AdminProjects/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
