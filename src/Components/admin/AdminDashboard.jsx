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
        <span className="admin-subtitle">ZENTORA ADMIN</span>
        <h1 className="admin-title">Admin Management Dashboard</h1>

        {/* Main Card */}
        <div className="admin-main-card">
          {/* Stat Cards */}
          <div className="row g-4 mb-4">
            {/* Card 1: Total Freelancers */}
            <div className="col-md-4">
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
            <div className="col-md-4">
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
            <div className="col-md-4">
              <div className="admin-stat-card card-teal">
                <div className="d-flex align-items-center gap-3">
                  <div className="admin-card-icon teal">
                    <FiFolder />
                  </div>
                  <div className='px-4'>
                    <div className="stat-number">{data?.projects}</div>
                    <div className="stat-title">Live Projects</div>
                    <div className="stat-subtitle">0 deals finalized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h4 className="admin-section-title">Recent Administration Log</h4>

          {/* Table */}
          <AdminProjects/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
