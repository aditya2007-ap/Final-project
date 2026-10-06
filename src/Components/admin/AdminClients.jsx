import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { FaTrash, FaBan, FaCheck, FaSearch, FaUserTie } from 'react-icons/fa'
import { FiBriefcase, FiMail, FiSearch, FiCheckCircle, FiShield } from 'react-icons/fi'
import Swal from 'sweetalert2'

const AdminClients = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:9000/admin-clients-list')
      setData(res?.data?.result || [])
    } catch (err) {
      console.error('Error fetching admin clients:', err)
    } finally {
      setLoading(false)
    }
  }

  const isClientActive = (status) => {
    return status === 'active' || status === true || status === 'true';
  };

  // Toggle client block / activate
  const handleToggleBlock = async (item) => {
    const isCurrentlyActive = isClientActive(item.status);
    const actionText = isCurrentlyActive ? 'Block' : 'Activate';
    const confirm = await Swal.fire({
      title: `${actionText} Client?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} ${item.name || 'this client'}?`,
      icon: isCurrentlyActive ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: isCurrentlyActive ? '#6a1b9a' : '#10b981',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: `Yes, ${actionText}`,
      cancelButtonText: 'Cancel'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.put(`http://localhost:9000/admin-toggle-user-status/${item._id}`);
        if (res?.data?.success) {
          await fetchData();
          Swal.fire({
            title: 'Status Updated',
            text: res?.data?.message || `${item.name || 'Client'} has been ${isCurrentlyActive ? 'blocked' : 'activated'}.`,
            icon: 'success',
            timer: 1800,
            showConfirmButton: false
          });
        } else {
          Swal.fire({ title: 'Error', text: res?.data?.message || 'Failed to update client', icon: 'error' });
        }
      } catch (err) {
        Swal.fire({ title: 'Error', text: 'Server error while updating client status', icon: 'error' });
      }
    }
  };

  // Delete client confirmation
  const handleDelete = async (item) => {
    const confirm = await Swal.fire({
      title: 'Delete Client Account?',
      text: `Are you sure you want to delete ${item.name || 'this client'}? All associated project records may be affected.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:9000/admin-delete-user/${item._id}`);
        if (res?.data?.success) {
          await fetchData();
          Swal.fire({
            title: 'Deleted!',
            text: res?.data?.message || 'Client record removed successfully.',
            icon: 'success',
            timer: 1800,
            showConfirmButton: false
          });
        } else {
          Swal.fire({ title: 'Error', text: res?.data?.message || 'Failed to delete client', icon: 'error' });
        }
      } catch (err) {
        Swal.fire({ title: 'Error', text: 'Server error while deleting client', icon: 'error' });
      }
    }
  };

  // Filtered & searched data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        !searchTerm ||
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchSearch
    })
  }, [data, searchTerm])

  return (
    <div className="admin-dashboard-wrapper py-5">
      <div className="container">
        {/* Header */}
        <div data-aos="fade-down" className="mb-4">
          <div className="dash-eyebrow">ZENTORA ADMIN</div>
          <h1 className="dash-heading d-flex align-items-center gap-3">
            <FiBriefcase className="text-color2" />
            Manage Platform Clients &amp; Employers
          </h1>
          <p className="admin-lead mb-4">
            Oversee registered hiring businesses, verify recruiters, and regulate hiring permissions.
          </p>

          {/* Quick Metrics Bar */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-4">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar avatar-purple">
                  <FiBriefcase />
                </div>
                <div>
                  <div className="admin-mini-stat-val">{data.length}</div>
                  <div className="admin-mini-stat-lbl">Registered Clients</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar avatar-teal">
                  <FiCheckCircle />
                </div>
                <div>
                  <div className="admin-mini-stat-val">
                    {data.filter((c) => c.status !== false).length}
                  </div>
                  <div className="admin-mini-stat-lbl">Active Hiring Status</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar avatar-orange">
                  <FiShield />
                </div>
                <div>
                  <div className="admin-mini-stat-val">100%</div>
                  <div className="admin-mini-stat-lbl">Verified Employers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Glass Card */}
        <div className="dash-card" data-aos="fade-up" data-aos-duration="800">
          {/* Controls Bar */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h4 className="fw-bold m-0" style={{ fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
                Hiring Clients Roster
              </h4>
              <span className="text-muted small" style={{ fontFamily: 'var(--font-body)' }}>
                Showing {filteredData.length} of {data.length} clients
              </span>
            </div>

            {/* Search Bar */}
            <div className="admin-search-wrapper">
              <FiSearch className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search client name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table dash-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Client / Employer</th>
                  <th>Contact Email</th>
                  <th>Client Account ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <div className="text-muted mt-2 small">Loading clients...</div>
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item) => {
                    const initials = (item?.name || 'C')
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .substring(0, 2)
                    const isActive = item?.status !== false
                    return (
                      <tr key={item?._id}>
                        <td>
                          <div className="admin-user-cell">
                            <div className="admin-avatar avatar-purple" style={{ overflow: 'hidden' }}>
                              {item?.profile ? (
                                <img
                                  src={item.profile}
                                  alt={item?.name || 'Client'}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              ) : (
                                initials
                              )}
                            </div>
                            <div>
                              <div className="admin-name-title">{item?.name || 'Client Org'}</div>
                              <div className="admin-name-sub">Employer / Hiring Partner</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a
                            href={`mailto:${item?.email}`}
                            className="d-inline-flex align-items-center gap-1 text-decoration-none text-muted"
                          >
                            <FiMail className="text-color2" />
                            <span>{item?.email}</span>
                          </a>
                        </td>
                        <td>
                          <span className="px-2 py-1 rounded bg-light border text-muted font-monospace small">
                            {item?._id ? `${item._id.substring(0, 10)}...` : 'ID-N/A'}
                          </span>
                        </td>
                        <td>
                          <span className={isActive ? 'status-ok' : 'status-bad'}>
                            {isActive ? 'Active' : 'Blocked'}
                          </span>
                        </td>
                        <td>
                          {isActive ? (
                            <button
                              type="button"
                              className="action-btn action-btn-block"
                              onClick={() => handleToggleBlock(item)}
                              title="Block Client"
                            >
                              <FaBan /> Block
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="action-btn action-btn-unblock"
                              onClick={() => handleToggleBlock(item)}
                              title="Activate Client"
                            >
                              <FaCheck /> Activate
                            </button>
                          )}
                          <button
                            type="button"
                            className="action-btn action-btn-delete"
                            onClick={() => handleDelete(item)}
                            title="Delete Client"
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      <FiBriefcase className="fs-1 text-muted mb-2 d-block mx-auto opacity-50" />
                      <div className="fw-semibold">No clients found</div>
                      <small className="text-muted">Try adjusting your search criteria.</small>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminClients
