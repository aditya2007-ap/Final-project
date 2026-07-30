import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const UserProjects = () => {
  const [data, setData] = useState([])
  const [projectId, setProjectId] = useState(' ');
  const [amount, setAmount] = useState(' ');
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:9000/admin-projects-list')
      setData(res?.data?.result || [])
    } catch (err) {
      console.error(err)
    }
  }
  const handlePostBid = () => {
    const info = JSON.parse(localStorage.getItem('info'));
    const userId = info?._id;
    if(amount){
      Swal.fire({
        title:'Validation Error',
        text:'Please Enter Amount',
        icon:'error'
      })
      return 0;
    }
  }
  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="row align-items-center mb-4 g-3">
        <div className="col-md-8">
          <span className="badge bg-primary mb-2">Zentora Freelance Jobs</span>
          <h2 className="fw-bold mb-1">Browse Live Client Projects</h2>
          <p className="text-muted m-0">Find exciting projects posted by top clients and place your proposals.</p>
        </div>
      </div>

      {/* Bootstrap Table */}
      <div className="card shadow-sm border-0 rounded-3 p-3">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Project Title</th>
                <th>Description</th>
                <th>Budget</th>
                <th>Timeline</th>
                <th>Posted Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item._id || index}>
                    <td className="fw-bold text-dark">{item.title}</td>
                    <td className="text-secondary small">{item.description || item.desc || 'No description provided.'}</td>
                    <td className="fw-bold text-success">₹{item.budget}</td>
                    <td>{item.timeline || item.duration || item.time || 'Flexible'}</td>
                    <td className="text-muted small">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td>
                      <div className='col-6 text-end'>
                        {
                          projectId == item?._id ?
                            <>
                              <div className="d-flex justify-content-end gap-2">
                                <input onChange={(e) => setAmount(e.target.value)} type="text" className='form-control w-50' />
                                <button onClick={handlePostBid} className='btn btn-sm btn-orange'>Submit</button>
                              </div>
                            </>
                            :
                            <button onClick={() => setProjectId(item?._id)} type="button" className="btn btn-sm btn-primary fw-semibold px-3 rounded-pill">
                              Place Bid
                            </button>
                        }
                      </div>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No active projects found from any client.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserProjects
