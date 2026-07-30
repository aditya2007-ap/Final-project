import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTrash, FaEye } from 'react-icons/fa'
import axios from 'axios'

const ClientManageProjects = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const info = JSON.parse(localStorage.getItem('info'));
    const clientId = info?._id || info?.id;
    const res = await axios.get(`http://localhost:9000/client-project-list?clientId=${clientId}`)
    console.log(res?.data?.result)
    setData(res?.data?.result)
  }
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora for Clients</span>
          <h2 className="dash-heading">Your Posted Projects</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="dash-card">
            <div className="row mb-3">
              <div className="col-12">
                <h4>Your Posted Projects</h4>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table dash-table mb-0">
                    <thead>
                      <tr>
                        <th>Project Title</th>
                        <th>Description</th>
                        <th>Budget</th>
                        <th>Timeline</th>
                        <th>Bids</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, index) => {
                        return (
                          <tr key={item?._id || index}>
                            <td>{item?.title}</td>
                            <td>{item?.description || item?.desc}</td>
                            <td>{item?.budget}</td>
                            <td>{item?.timeline || item?.duration}</td>
                            <td>{item?.bidsCount || 0}</td>
                            <td><span className="status-ok">{item?.status ? "Done" : "In Progress"}</span></td>
                            <td>
                              <button type="button" className="action-btn action-btn-delete"><FaTrash /> Delete</button>
                            </td>
                          </tr>
                        )
                      })}
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

export default ClientManageProjects