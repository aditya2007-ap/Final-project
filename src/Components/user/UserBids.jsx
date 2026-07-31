import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaGavel } from 'react-icons/fa'

const UserBids = () => {
  const [data, setData] = useState([]);  // ✅ top-level

  const fetchData = async () => {        // ✅ defined before useEffect
    const info = JSON.parse(localStorage.getItem('info'));
    const userId = info?._id;
    const res = await axios.get(`http://localhost:9000/user-get-bids?userId=${userId}`);
    setData(res?.data?.result);
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className="container py-5">
      <div className="row mb-4" data-aos="fade-down">
        <div className="col-12">
          <span className="dash-eyebrow">Freelancer Dashboard</span>
          <h2 className="dash-heading d-flex align-items-center gap-2">
            <FaGavel className="text-primary" /> My Submitted Proposals &amp; Bids
          </h2>
        </div>
      </div>

      <div className="dash-card bg-white p-4 rounded-4 shadow-sm border" data-aos="fade-up" data-aos-duration="800">
        <div className="table-responsive">
          <table className="table dash-table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Project Name</th>
                <th>Client Budget</th>
                <th>Bidding Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (  // ✅ correct arrow function
                <tr key={item?._id}>
                  <td className="fw-bold text-secondary">{item?.title}</td>
                  <td className="fw-semibold">{item?.budget}</td>
                  <td className="fw-bold text-success">{item?.amount}</td>
                  <td><span className={item?.status == 'accepted' ? 'status-ok' : 'status-pending'}>{item?.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserBids
