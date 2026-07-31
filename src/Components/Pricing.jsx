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
      console.log('Fetched plans data:', res)
      setData(res?.data?.result || [])
    } catch (error) {
      console.error('Error fetching plans:', error)
    }
  }

  return (
    <>
      <div className="container-fluid py-5 pricing">
        <div className="col-md-10 mx-auto">
          <div className='pricingtophead text-center mb-4' data-aos="fade-down">
            <span><h5 className='fs-6 text-uppercase fw-bold text-color1'>FREELANCER PLANS</h5></span>
            <h2 className="fw-bold display-6">Buy Credits. Place Bids. Win Projects.</h2>
            <span className='pricingicon'><SiFreelancermap className='fs-1 m-3' /></span>
            <p className="mx-auto" style={{ color: '#808080', maxWidth: '650px' }}>
              Every bid costs 1 credit. Choose a plan, get monthly credits, and start bidding on projects. Clients post jobs for free — plans are for freelancers only.
            </p>
          </div>
          <div className="row pricingCardblock g-4 justify-content-center mx-auto my-2 p-2">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div 
                  className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch" 
                  key={item?._id} 
                  data-aos={item?.popular ? "zoom-in" : "fade-up"} 
                  data-aos-delay={(index + 1) * 100}
                >
                  <div 
                    className={`card p-4 shadow-sm w-100 pricingcards ${item?.popular ? 'pricingcards2 position-relative border-warning' : 'border-0'}`} 
                    style={item?.popular ? { border: '2px solid orangered' } : {}}
                  >
                    {item?.popular && (
                      <span className='w-50 text-center position-absolute pricind2ndcardbadge p-1'>Most Popular</span>
                    )}

                    <h5 className='fw-bold text-uppercase mb-2'>{item?.name}</h5>
                    <div><h3 className='fs-1 pricingamount mb-1'>₹{item?.price} <span className='fs-5 text-secondary fw-normal'>/month</span></h3></div>
                    <p className='text-secondary pb-2 small'>{item?.tagline}</p>

                    <div className="my-3 pt-2 border-top">
                      <div className='text-secondary py-2 d-flex align-items-center gap-2'>
                        <GiCheckMark className='text-warning flex-shrink-0' /> 
                        <span><strong>{item?.credits}</strong> bidding credits / month</span>
                      </div>

                      <div className='text-secondary py-2 d-flex align-items-center gap-2'>
                        <GiCheckMark className='text-warning flex-shrink-0' /> 
                        <span>Browse all open projects</span>
                      </div>

                      <div className='text-secondary py-2 d-flex align-items-center gap-2'>
                        <GiCheckMark className='text-warning flex-shrink-0' /> 
                        <span>Enhanced portfolio profile</span>
                      </div>

                      <div className='text-secondary py-2 d-flex align-items-center gap-2'>
                        <GiCheckMark className='text-warning flex-shrink-0' /> 
                        <span>Priority bid visibility</span>
                      </div>

                      <div className='text-secondary py-2 d-flex align-items-center gap-2'>
                        <MdDoNotDisturb className='text-secondary flex-shrink-0' /> 
                        <span>Standard analytics</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link to='/user-plans'>
                        <button className={`btn w-100 shadow-sm p-2 rounded-3 fw-bold ${item?.popular ? 'pricingbtn2' : 'pricingbtn'}`}>
                          Get Plan
                        </button>
                      </Link>

                      <p className='text-secondary text-center py-2 mb-0 small'>
                        {item?.credits} credits included · 1 credit per bid
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted fs-5">No pricing plans currently available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing

