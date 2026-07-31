import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaTrash, FaBan } from 'react-icons/fa'

const AdminUsers = () => { 
  const [data,setData] = useState([])
  useEffect(() => {
fetchData()
  },[])

  const fetchData = async()=>{
   const res =  await axios.get('http://localhost:9000/admin-users-list')
   setData(res?.data?.result);
  }
  
  
  return (
    <div className="container py-5">
      <div className="row" data-aos="fade-down">
        <div className="col-12">
          <span className="dash-eyebrow">Zentora Admin</span>
          <h2 className="dash-heading">Manage Freelancers / Users</h2>
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

                        <th>Credits</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item)=>{
                        return(
                            <tr key={item?._id}>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>

                        <td>{item?.credit}</td>
                        <td><span className="status-ok">{item?.status ? "Active":"Deactivated"}</span></td>
                        <td>
                          <button type="button" className="action-btn action-btn-block"><FaBan /> Block</button>
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

export default AdminUsers