import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GiCheckMark } from "react-icons/gi";
import { MdDoNotDisturb } from "react-icons/md";
import { Link } from 'react-router-dom';
import { SiFreelancermap } from "react-icons/si";

const Pricing = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:9000/admin-get-plans')
      setData(res?.data?.result)
    } catch (error) {
      console.error('Error fetching plans:', error)
    }
  }

  return (
    <>
      <div className="container-fluid py-4 pricing">
        <div className="col-md-10 mx-auto">
          <div className='pricingtophead text-center mb-4'>
            <span ><h5 className='fs-6 '>FREELANCER PLANS</h5></span>
            <h2>Buy Credits. Place Bids. Win Projects.</h2>
            <span className='pricingicon'><SiFreelancermap className='fs-1 m-3' /></span>
            <p style={{ color: '#808080' }}>Every bid costs 1 credit. Choose a plan, get monthly credits, and start bidding on projects. Clients post jobs for free — plans are for freelancers only.</p>
          </div>
          <div className="row pricingCardblock g-4 mx-auto my-2 p-2">
            {data?.map((item) => (
              <div className={item?.popular ? "col-sm-4 bg-light" : "col-sm-4"} key={item?._id}>
                <div 
                  className={`card p-4 shadow-sm pricingcards ${item?.popular ? 'pricingcards2 position-relative' : 'border-0'}`} 
                  style={item?.popular ? { border: '1px solid orangered' } : {}}
                >
                  {item?.popular && (
                    <span className='w-50 text-center position-absolute pricind2ndcardbadge p-1'>Most Popular</span>
                  )}

                  <h6 className='fw-bold fs-6'>{item?.name}</h6>
                  <span><h3 className='fs-1 pricingamount'>₹{item?.price} <span className='fs-5 text-secondary'>/month</span></h3></span>
                  <p className='text-secondary pb-2'>{item?.tagline}</p>

                  <span className='text-secondary py-2'><GiCheckMark className='text-warning' /> {item?.credits} bidding credits / month</span>

                  <span className='text-secondary py-2'><GiCheckMark className='text-warning' /> Browse all open projects</span>

                  <span className='text-secondary py-2 '><GiCheckMark className='text-warning' /> Enhanced portfolio profile</span>

                  <span className='text-secondary py-2 '><GiCheckMark className='text-warning fs-5' /> Priority bid visibility</span>

                  <span className='text-secondary py-2 '><MdDoNotDisturb className='text-secondary fs-5' /> Bid analytics dashboard</span>

                  <Link to='#'><button className={`btn w-100 mt-3 shadow-lg 0 p-2 ${item?.popular ? 'pricingbtn2' : 'pricingbtn'}`}> Get Plans</button></Link>

                  <p className='text-secondary text-center py-2'>{item?.credits} credits included · 1 credit per bid</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing

