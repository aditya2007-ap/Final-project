import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";
import Typewriter from 'typewriter-effect';

const HeroSection = () => {
  return (
    <>
      <div className="row ">
        <div className='col-sm-12 hero bg-color2'>
          <div className="row ps-5">
            <div className="col-sm-6 position-relative p-5  mx-auto">
              <h3 className='herotitle text-dark fw-bold '>
                Where Talent <b className='text-color1'>Meets <br />Opportunity</b> with <br />
                <span className="text-color1 d-inline-block">
                  <Typewriter
                    options={{
                      strings: ['Zentora'],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                      delay: 100,
                    }}
                  />
                </span>
              </h3>
              <p className='herodes my-3'>Connect. Collaborate. Earn. Post projects, discover global <br /> talent, compare competitive bids, and hire top freelancers <br /> with secure escrow payments on Zentora.</p>
              <Link className='btn bg-color1 mb-5 text-light herobtn p-3 my-3'>Browse Job and Projects < IoIosArrowRoundForward className='fs-5' /></Link>
              <img src="/shape-13.png" alt="" className='herodot position-absolute' />
            </div>
            <div className="col-sm-6 position-relative">
              <img src="/girl-1.webp" alt="" className='img-fluid w-75' />
              <img src="/h-1-shape-01.png" alt="" className='position-absolute herosideimg' />

              <div className='ring  position-absolute'></div>
              <div className='bluering  position-absolute'></div>
              <div className='activetalents position-absolute bg-light p-3 shadow-lg'>

                <span><h6 className='text-secondary'>Active Talents</h6></span>
                <span className='fw-bold' style={{ color: '#e65100 ' }}>  <img src="author-1-1-1.png" alt="" />
                  10k+ <span className='text-dark fw-normal'>Experts</span>
                </span>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection
