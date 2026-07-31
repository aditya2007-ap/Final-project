import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaFolderOpen, FaTrash, FaSearch } from 'react-icons/fa'

const AdminProjects = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:9000/admin-projects-list')
      setData(res?.data?.result || [])
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container py-5">
      <div className="row mb-4" data-aos="fade-down">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora Admin</span>
          <h2 className="dash-heading d-flex align-items-center gap-2">
            <FaFolderOpen className="text-primary" /> Manage All Posted Projects
          </h2>
        </div>
      </div>

      <div className="dash-card bg-white p-4 rounded-4 shadow-sm border" data-aos="fade-up" data-aos-duration="800">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h4 className="fw-bold m-0">Live Projects ({data.length})</h4>
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-light border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search projects..."
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table dash-table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Client ID</th>
                <th>Budget</th>
                <th>Timeline</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item._id || index}>
                    <td className="fw-semibold">{item?.title}</td>
                    <td><small className="text-muted">{item?.clientId}</small></td>
                    <td className="fw-bold text-color1">₹{item?.budget}</td>
                    <td>{item?.timeline || item?.duration || item?.time}</td>
                    <td>
                      <span className={`badge px-3 py-2 rounded-pill ${item?.status ? 'bg-success' : 'bg-primary'}`}>
                        {item?.status ? 'Completed' : 'Active / Bidding'}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td>
                      <button type="button" className="action-btn action-btn-delete">
                        <FaTrash /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminProjects
