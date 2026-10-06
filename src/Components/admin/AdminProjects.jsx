import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { FaFolderOpen, FaTrash, FaSearch, FaClock, FaCheckCircle, FaLayerGroup, FaBan, FaTimesCircle } from 'react-icons/fa'
import { FiDollarSign, FiSearch, FiFolder, FiCheck } from 'react-icons/fi'
import Swal from 'sweetalert2'

const isRejected = (status) => status === 'rejected' || status === 'rejected by admin'
const isCompleted = (status) => status === true || status === 'completed' || status === 'closed'
const isActive = (status) => !isRejected(status) && !isCompleted(status)

const AdminProjects = ({ isEmbedded = false }) => {
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
      const res = await axios.get('http://localhost:9000/admin-projects-list')
      setData(res?.data?.result || [])
    } catch (err) {
      console.error('Error fetching projects list:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, title, permanent = false) => {
    const isAlreadyRejected = data.find((p) => p._id === id && isRejected(p.status))

    const confirm = await Swal.fire({
      title: permanent || isAlreadyRejected ? 'Permanently Delete Project?' : 'Reject Project?',
      text: permanent || isAlreadyRejected
        ? `Are you sure you want to permanently erase "${title || 'this project'}" from the database?`
        : `Are you sure you want to reject "${title || 'this project'}"? It will be marked as "Rejected by Admin" on admin and client portals, and hidden from freelancers with bidding disabled.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e65100',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: permanent || isAlreadyRejected ? 'Yes, delete permanently' : 'Yes, reject project',
      cancelButtonText: 'Cancel'
    })

    if (confirm.isConfirmed) {
      try {
        const url = permanent || isAlreadyRejected
          ? `http://localhost:9000/admin-delete-project/${id}?permanent=true`
          : `http://localhost:9000/admin-delete-project/${id}`

        const res = await axios.delete(url)
        if (res?.data?.success) {
          if (permanent || isAlreadyRejected) {
            setData((prev) => prev.filter((p) => p._id !== id))
            Swal.fire('Deleted!', 'Project permanently deleted.', 'success')
          } else {
            setData((prev) =>
              prev.map((p) => (p._id === id ? { ...p, status: 'rejected by admin' } : p))
            )
            Swal.fire('Rejected!', 'Project marked as "Rejected by Admin". Bidding is disabled.', 'success')
          }
          fetchData()
        } else {
          Swal.fire('Error', res?.data?.message || 'Failed to update project.', 'error')
        }
      } catch (err) {
        console.error('Error updating project:', err)
        Swal.fire(
          'Error',
          err?.response?.data?.message || 'Server error while updating project. Please try again.',
          'error'
        )
      }
    }
  }

  // Filtered & searched data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        !searchTerm ||
        item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.clientId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item?.description?.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchSearch) return false

      if (filterStatus === 'active') return isActive(item?.status)
      if (filterStatus === 'completed') return isCompleted(item?.status)
      if (filterStatus === 'rejected') return isRejected(item?.status)
      return true
    })
  }, [data, searchTerm, filterStatus])

  // Mini summary metrics
  const activeCount = useMemo(() => data.filter((p) => isActive(p?.status)).length, [data])
  const completedCount = useMemo(() => data.filter((p) => isCompleted(p?.status)).length, [data])
  const rejectedCount = useMemo(() => data.filter((p) => isRejected(p?.status)).length, [data])
  const totalBudget = useMemo(() => {
    return data.reduce((acc, p) => acc + (Number(p?.budget) || 0), 0)
  }, [data])

  const content = (
    <div className={isEmbedded ? '' : 'dash-card'} data-aos={isEmbedded ? undefined : 'fade-up'} data-aos-duration="800">
      {/* Top Header & Search Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold m-0 d-flex align-items-center gap-2" style={{ fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
            <FaFolderOpen className="text-color1" />
            {isEmbedded ? 'Recent Administration Project Logs' : `All Platform Projects (${data.length})`}
          </h4>
          <span className="text-muted small" style={{ fontFamily: 'var(--font-body)' }}>
            Showing {filteredData.length} of {data.length} projects
          </span>
        </div>

        {/* Search & Filter Controls */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          {/* Status Filter Pills */}
          <div className="d-flex gap-1 flex-wrap">
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
              className={`admin-filter-pill ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              Completed ({completedCount})
            </button>
            <button
              type="button"
              className={`admin-filter-pill ${filterStatus === 'rejected' ? 'active' : ''}`}
              onClick={() => setFilterStatus('rejected')}
            >
              Rejected ({rejectedCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="admin-search-wrapper">
            <FiSearch className="admin-search-icon" />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search projects or client ID..."
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
              <th>Project Title</th>
              <th>Client Reference</th>
              <th>Budget</th>
              <th>Timeline</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="text-muted mt-2 small">Loading projects...</div>
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item._id || index}>
                  <td>
                    <div className="admin-user-cell">
                      <div className="admin-avatar avatar-teal">
                        {(item?.title || 'P')[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="admin-name-title">{item?.title || 'Untitled Project'}</div>
                        <div className="admin-name-sub text-truncate" style={{ maxWidth: '280px' }}>
                          {item?.description || 'No description provided'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="admin-avatar avatar-purple flex-shrink-0"
                        style={{ width: 28, height: 28, fontSize: '0.72rem', overflow: 'hidden' }}
                      >
                        {item?.clientProfile ? (
                          <img
                            src={item.clientProfile}
                            alt={item?.clientName || 'Client'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          (item?.clientName || 'C')[0].toUpperCase()
                        )}
                      </div>
                      <span className="small fw-semibold text-dark text-truncate" style={{ maxWidth: '130px' }} title={item?.clientName}>
                        {item?.clientName || 'Platform'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="admin-credit-badge">
                      ₹{Number(item?.budget || 0).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    <span className="d-inline-flex align-items-center gap-1 text-muted small">
                      <FaClock className="text-muted" />
                      {item?.timeline || item?.duration || item?.time || 'Open'}
                    </span>
                  </td>
                  <td>
                    {isRejected(item?.status) ? (
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1 rounded-pill small fw-semibold d-inline-flex align-items-center gap-1">
                        <FaTimesCircle /> Rejected by Admin
                      </span>
                    ) : isCompleted(item?.status) ? (
                      <span className="status-ok">Completed</span>
                    ) : (
                      <span className="status-pending">Active / Bidding</span>
                    )}
                  </td>
                  <td className="small text-muted">
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })
                      : 'Recent'}
                  </td>
                  <td>
                    {isRejected(item?.status) ? (
                      <div className="d-flex align-items-center gap-1">
                        <button
                          type="button"
                          className="action-btn action-btn-delete"
                          title="Permanently remove project from database"
                          onClick={() => handleDelete(item._id, item.title, true)}
                        >
                          <FaTrash /> Delete Permanently
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="action-btn action-btn-delete"
                        title="Reject this project and hide from freelancers"
                        onClick={() => handleDelete(item._id, item.title, false)}
                      >
                        <FaBan /> Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-5 text-muted">
                  <FiFolder className="fs-1 text-muted mb-2 d-block mx-auto opacity-50" />
                  <div className="fw-semibold">No matching projects found</div>
                  <small className="text-muted">Try clearing your search query or filters.</small>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

  if (isEmbedded) {
    return content
  }

  return (
    <div className="admin-dashboard-wrapper py-5">
      <div className="container">
        {/* Standalone Page Header */}
        <div data-aos="fade-down" className="mb-4">
          <div className="dash-eyebrow">ZENTORA ADMIN</div>
          <h1 className="dash-heading d-flex align-items-center gap-3">
            <FaFolderOpen className="text-color1" />
            Manage All Posted Projects
          </h1>
          <p className="admin-lead mb-4">
            Oversee active client listings, budgets, delivery timelines, and project statuses.
          </p>

          {/* Stat Summary Row */}
          <div className="row g-3 mb-4">
            <div className="col-sm-3 col-6">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar avatar-orange">
                  <FaLayerGroup />
                </div>
                <div>
                  <div className="admin-mini-stat-val">{data.length}</div>
                  <div className="admin-mini-stat-lbl">Total Projects</div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar avatar-teal">
                  <FaClock />
                </div>
                <div>
                  <div className="admin-mini-stat-val">{activeCount}</div>
                  <div className="admin-mini-stat-lbl">Active &amp; Bidding</div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                  <FaTimesCircle />
                </div>
                <div>
                  <div className="admin-mini-stat-val text-danger">{rejectedCount}</div>
                  <div className="admin-mini-stat-lbl">Rejected by Admin</div>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="admin-mini-stat-card">
                <div className="admin-avatar avatar-purple">
                  <FiDollarSign />
                </div>
                <div>
                  <div className="admin-mini-stat-val">₹{totalBudget.toLocaleString('en-IN')}</div>
                  <div className="admin-mini-stat-lbl">Total Budget Volume</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {content}
      </div>
    </div>
  )
}

export default AdminProjects
