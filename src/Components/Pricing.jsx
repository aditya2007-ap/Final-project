import React from 'react'
import { GiCheckMark } from "react-icons/gi";
import { MdDoNotDisturb } from "react-icons/md";
import { Link } from 'react-router-dom';
import { SiFreelancermap } from "react-icons/si";
const Pricing = () => {
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
            <div className="col-sm-4">

              <div className="card p-4 shadow-sm border-0 pricingcards">
                <h6 className='fw-bold fs-6'>STARTER</h6>
                <span><h3 className='fs-1 pricingamount'>₹0 <span className='fs-5 text-secondary'>/month</span></h3></span>
                <p className='text-secondary pb-2'>For new freelancers getting started</p>

                <span className='text-secondary py-2'><GiCheckMark className='text-warning' /> 10 bidding credits / month</span>

                <span className='text-secondary py-2'><GiCheckMark className='text-warning' /> Browse all open projects</span>

                <span className='text-secondary py-2 '><GiCheckMark className='text-warning' /> Basic profile & portfolio</span>

                <span className='text-secondary py-2 '><MdDoNotDisturb className='text-secondary fs-5' /> Priority bid visibility</span>

                <span className='text-secondary py-2 '><MdDoNotDisturb className='text-secondary fs-5' /> Bid analytics dashboard</span>

                <Link to='#'><button className='btn  w-100 mt-3 pricingbtn shadow-lg 0'> Current Plan</button></Link>

                <p className='text-secondary text-center py-2 '>10 credits included · 1 credit per bid</p>


              </div>
            </div>
            <div className="col-sm-4   bg-light">
              <div className="card p-4 shadow-sm  pricingcards pricingcards2 position-relative" style={{ border: '1px solid orangered' }}>
                <span className=' w-50 text-center position-absolute pricind2ndcardbadge p-1'>Most Popular</span>

                <h6 className='fw-bold fs-6'>Pro</h6>
                <span><h3 className='fs-1 pricingamount'>₹499 <span className='fs-5 text-secondary'>/month</span></h3></span>
                <p className='text-secondary pb-2'>Best for active freelancers</p>

                <span className='text-secondary py-2'><GiCheckMark className='text-warning' /> 50 bidding credits / month</span>

                <span className='text-secondary py-2'><GiCheckMark className='text-warning' /> Browse all open projects</span>

                <span className='text-secondary py-2 '><GiCheckMark className='text-warning' /> Enhanced portfolio profile</span>

                <span className='text-secondary py-2 '><GiCheckMark className='text-warning fs-5' /> Priority bid visibility</span>

                <span className='text-secondary py-2 '><MdDoNotDisturb className='text-secondary fs-5' /> Bid analytics dashboard</span>

                <Link to='#'><button className='btn  w-100 mt-3  pricingbtn2 shadow-lg 0 p-2'> Get Pro Plan</button></Link>

                <p className='text-secondary text-center py-2'>50 credits included · 1 credit per bid</p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card p-4 shadow-sm border-0 pricingcards">
                <h6 className='fw-bold fs-6'>Elite</h6>
                <span><h3 className='fs-1 pricingamount'>₹1,499 <span className='fs-5 text-secondary'>/month</span></h3></span>
                <p className='text-secondary pb-2'>For power users & small agencies</p>

                <span className='text-secondary py-2'><GiCheckMark className='text-warning' /> 200 bidding credits / month</span>

                <span className='text-secondary py-2'><GiCheckMark className='text-warning' /> Browse all open projects</span>

                <span className='text-secondary py-2 '><GiCheckMark className='text-warning' /> Premium portfolio profile</span>

                <span className='text-secondary py-2 '><GiCheckMark className='text-warning fs-5' /> Priority bid visibility</span>

                <span className='text-secondary py-2 '><GiCheckMark className='text-warning fs-5' /> Bid analytics dashboard</span>

                <Link to='#'><button className='btn  w-100 mt-3  pricingbtn2  shadow-lg 0 p-2'> Get Pro Plan</button></Link>

                <p className='text-secondary text-center py-2'>50 credits included · 1 credit per bid</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing
