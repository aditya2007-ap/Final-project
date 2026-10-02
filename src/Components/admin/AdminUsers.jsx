import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { FaTrash, FaBan, FaCheck, FaSearch, FaUserShield, FaCoins } from 'react-icons/fa'
import { FiUsers, FiMail, FiSearch, FiZap, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import Swal from 'sweetalert2'

const AdminUsers = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:9000/admin-users-list')
      setData(res?.data?.result || [])
    } catch (err) {
      console.error('Error fetching admin users:', err)
    } finally {
      setLoading(false)
    }
  }

  const isUserActive = (status) => {
    return status === 'active' || status === true || status === 'true';
  };

  // Toggle user block / activate
  const handleToggleBlock = async (item) => {
    const isCurrentlyActive = isUserActive(item.status);
    const actionText = isCurrentlyActive ? 'Block' : 'Activate';
    const confirm = await Swal.fire({
      title: `${actionText} Freelancer?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} ${item.name || 'this user'}?`,
      icon: isCurrentlyActive ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: isCurrentlyActive ? '#e65100' : '#10b981',
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
            text: res?.data?.message || `${item.name || 'User'} has been ${isCurrentlyActive ? 'blocked' : 'activated'}.`,
            icon: 'success',
            timer: 1800,
            showConfirmButton: false
          });
        } else {
          Swal.fire({ title: 'Error', text: res?.data?.message || 'Failed to update user', icon: 'error' });
        }
      } catch (err) {
        Swal.fire({ title: 'Error', text: 'Server error while updating status', icon: 'error' });
      }
    }
  };

  // Delete user confirmation
  const handleDelete = async (item) => {
    const confirm = await Swal.fire({
      title: 'Delete Freelancer?',
      text: `Are you sure you want to permanently delete ${item.name || 'this user'}? This action cannot be undone.`,
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
            text: res?.data?.message || 'Freelancer record removed successfully.',
            icon: 'success',
            timer: 1800,
            showConfirmButton: false
          });
        } else {
          Swal.fire({ title: 'Error', text: res?.data?.message || 'Failed to delete user', icon: 'error' });
        }
      } catch (err) {
        Swal.fire({ title: 'Error', text: 'Server error while deleting user', icon: 'error' });
      }
    }
  };

  // Filtered & searched data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        !searchTerm ||
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.email?.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchSearch) return false;

      if (filterStatus === 'active') return isUserActive(item?.status);
      if (filterStatus === 'deactivated') return !isUserActive(item?.status);
      return true;
    });
  }, [data, searchTerm, filterStatus]);

  // Mini summary metrics
  const activeCount = useMemo(() => data.filter((u) => isUserActive(u?.status)).length, [data]);
  const deactivatedCount = useMemo(() => data.filter((u) => !isUserActive(u?.status)).length, [data]);
  const totalCredits = useMemo(() => {
    return data.reduce((acc, u) => acc + (Number(u?.credit) || 0), 0);
  }, [data]);

  return (
    <div className="admin-dashboard-wrapper py-5">
      <div className="container">
        {/* Header */}
        <div data-aos="fade-down" className="mb-4">
          <div className="dash-eyebrow">ZENTORA ADMIN</div>
          <h1 className="dash-heading d-flex align-items-center gap-3">
            <FiUsers className="text-color1" />
            Manage Freelancers &amp; Users
          </h1>
          <p className="admin-lead mb-4">
            Inspect registered freelancer profiles, monitor credit balances, and manage account permissions.
          </p>

          {/* Quick Metrics Bar */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-4">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar avatar-orange">
                  <FiUsers />
                </div>
                <div>
                  <div className="admin-mini-stat-val">{data.length}</div>
                  <div className="admin-mini-stat-lbl">Registered Freelancers</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar avatar-teal">
                  <FiCheckCircle />
                </div>
                <div>
                  <div className="admin-mini-stat-val">{activeCount}</div>
                  <div className="admin-mini-stat-lbl">Active &amp; Verified</div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar avatar-purple">
                  <FiZap />
                </div>
                <div>
                  <div className="admin-mini-stat-val">{totalCredits}</div>
                  <div className="admin-mini-stat-lbl">Total Bidding Credits Active</div>
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
                Freelancer Directory
              </h4>
              <span className="text-muted small" style={{ fontFamily: 'var(--font-body)' }}>
                Showing {filteredData.length} of {data.length} users
              </span>
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* Filter Pills */}
              <div className="d-flex gap-1">
                <button
                  type="button"
                  className={`admin-filter-pill ${filterStatus === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('all')}
                >
                  All ({data.length})
                </button>
                <button
                  type="button"
                  className={`admin-filter-pill ${filterStatus === 'active' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('active')}
                >
                  Active ({activeCount})
                </button>
                <button
                  type="button"
                  className={`admin-filter-pill ${filterStatus === 'deactivated' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('deactivated')}
                >
                  Blocked ({deactivatedCount})
                </button>
              </div>

              {/* Search Bar */}
              <div className="admin-search-wrapper">
                <FiSearch className="admin-search-icon" />
                <input
                  type="text"
                  className="admin-search-input"
                  placeholder="Search freelancer name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table dash-table align-middle mb-0">
              <thead>
                <tr>
                  <th>Freelancer Name</th>
                  <th>Email Address</th>
                  <th>Credit Balance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <div className="text-muted mt-2 small">Loading freelancers...</div>
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item) => {
                    const initials = (item?.name || 'U')
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                      .substring(0, 2)
                    return (
                      <tr key={item?._id}>
                        <td>
                          <div className="admin-user-cell">
                            <div className="admin-avatar avatar-orange">{initials}</div>
                            <div>
                              <div className="admin-name-title">{item?.name || 'Anonymous User'}</div>
                              <div className="admin-name-sub">Freelancer / Talent</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a
                            href={`mailto:${item?.email}`}
                            className="d-inline-flex align-items-center gap-1 text-decoration-none text-muted"
                          >
                            <FiMail className="text-color1" />
                            <span>{item?.email}</span>
                          </a>
                        </td>
                        <td>
                          <span className="admin-credit-badge">
                            <FiZap /> {item?.credit ?? 0} Credits
                          </span>
                        </td>
                        <td>
                          <span className={isUserActive(item?.status) ? 'status-ok' : 'status-bad'}>
                            {isUserActive(item?.status) ? 'Active' : 'Blocked'}
                          </span>
                        </td>
                        <td>
                          {isUserActive(item?.status) ? (
                            <button
                              type="button"
                              className="action-btn action-btn-block"
                              onClick={() => handleToggleBlock(item)}
                              title="Block Freelancer"
                            >
                              <FaBan /> Block
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="action-btn action-btn-unblock"
                              onClick={() => handleToggleBlock(item)}
                              title="Activate Freelancer"
                            >
                              <FaCheck /> Activate
                            </button>
                          )}
                          <button
                            type="button"
                            className="action-btn action-btn-delete"
                            onClick={() => handleDelete(item)}
                            title="Delete Freelancer"
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
                      <FiUsers className="fs-1 text-muted mb-2 d-block mx-auto opacity-50" />
                      <div className="fw-semibold">No freelancers found</div>
                      <small className="text-muted">Try adjusting your search query or filter options.</small>
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

export default AdminUsers