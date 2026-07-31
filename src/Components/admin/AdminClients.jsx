import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaTrash, FaBan } from 'react-icons/fa'

const AdminClients = () => { 
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:9000/admin-clients-list')
      setData(res?.data?.result)
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className="container py-5">
      <div className="row" data-aos="fade-down">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora Admin</span>
          <h2 className="dash-heading">Manage Clients</h2>
        </div>
      </div>

      <div className="row" data-aos="fade-up" data-aos-duration="800">
        <div className="col-12">
          <div className="dash-card">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table dash-table mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.length > 0 ? (
                        data.map((item) => {
                          return (
                            <tr key={item?._id}>
                              <td>{item?.name}</td>
                              <td>{item?.email}</td>
                              <td>
                                <button type="button" className="action-btn action-btn-block">
                                  <FaBan /> Block
                                </button>
                                <button type="button" className="action-btn action-btn-delete">
                                  <FaTrash /> Delete
                                </button>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center py-4 text-muted">
                            No clients found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminClients
