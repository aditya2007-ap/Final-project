import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { FaBriefcase, FaClock, FaTag, FaCalendarAlt, FaPaperPlane, FaGavel } from 'react-icons/fa';

const UserProjects = () => {
  const [data, setData] = useState([])
  const [projectId, setProjectId] = useState('');
  const [amount, setAmount] = useState(null);

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

  const handlePostBid = async () => {
    const info = JSON.parse(localStorage.getItem('info'));
    const userId = info?._id;
    if (!amount) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please Enter Amount',
        icon: 'error'
      })
      return 0;
    }
    const data = { userId, projectId, amount };
    const res = await axios.post('http://localhost:9000/user-create-bids', data);
    if (res?.data?.success == true) {
      Swal.fire({
        title: 'Biding',
        text: res?.data?.message,
        icon: 'success'
      })
      setProjectId(null);
      setAmount(null)
    } else {
      Swal.fire({
        title: 'Biding',
        text: res?.data?.message,
        icon: 'error'
      })
    }
  }

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="row align-items-center mb-5 g-3" data-aos="fade-down">
        <div className="col-md-8">
          <span className="badge bg-primary mb-2 px-3 py-2 rounded-pill fw-bold text-uppercase">
            Zentora Freelance Jobs
          </span>
          <h2 className="display-6 fw-bold mb-2 text-dark">Explore Live Projects</h2>
          <p className="text-secondary lead fs-6 m-0">
            Browse open project scopes posted by global clients, evaluate requirements, and submit competitive proposal bids.
          </p>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="row g-4">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div className="col-lg-6 col-md-12" key={item?._id || index} data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
              <div className="card h-100 border-0 p-4 rounded-4 shadow-sm project-glass-card">
                <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
                  <div>
                    <span className="badge bg-danger-subtle text-danger mb-2 px-3 py-1 rounded-pill fw-semibold small">
                      <FaBriefcase className="me-1" /> Open Contract
                    </span>
                    <h4 className="fw-bold text-dark mb-1 project-title">{item.title}</h4>
                  </div>
                  <div className="text-end flex-shrink-0">
                    <span className="fs-4 fw-bold text-success d-block">₹{item.budget}</span>
                    <small className="text-muted fw-semibold">Budget</small>
                  </div>
                </div>

                <p className="text-secondary small mb-4 project-desc flex-grow-1">
                  {item.description || item.desc || 'No detailed description provided by the client.'}
                </p>

                <div className="d-flex flex-wrap align-items-center justify-content-between pt-3 border-top gap-3">
                  <div className="d-flex align-items-center gap-3 text-muted small">
                    <span className="d-flex align-items-center gap-1">
                      <FaClock className="text-primary" /> {item.timeline || item.duration || item.time || 'Flexible'}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <FaCalendarAlt className="text-warning" /> 
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  <div className="bid-action-area">
                    {projectId === item?._id ? (
                      <div className="d-flex align-items-center gap-2">
                        <input
                          onChange={(e) => setAmount(e.target.value)}
                          type="number"
                          className="form-control form-control-sm rounded-3 amount-input"
                          placeholder="Your Amount (₹)"
                          style={{ width: '130px' }}
                        />
                        <button onClick={handlePostBid} className="btn btn-sm btn-orange d-inline-flex align-items-center gap-1">
                          <FaPaperPlane /> Submit
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setProjectId(item?._id)}
                        type="button"
                        className="btn btn-sm btn-primary fw-bold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2"
                      >
                        <FaGavel /> Place Bid
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="p-5 bg-white rounded-4 shadow-sm">
              <FaBriefcase className="text-muted fs-1 mb-3" />
              <h5 className="text-muted fw-bold">No active projects found</h5>
              <p className="text-secondary small m-0">Check back later for newly posted client opportunities.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProjects
