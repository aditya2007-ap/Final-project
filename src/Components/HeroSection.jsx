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
            <div className="col-sm-6 position-relative p-5 mx-auto" data-aos="fade-right" data-aos-duration="1000">
              <h3 className='herotitle text-dark fw-bold' data-aos="fade-up" data-aos-delay="100">
                Where Talent <b className='text-color1'>Meets <br />Opportunity</b><br />
                <span className="text-color1 d-inline-block fw-bold ">
                  <div className='d-flex gap-3 '>
                    <span className='text-dark'>with</span>
                    <Typewriter
                    options={{
                      strings: [' Zentora'],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 70,
                      delay: 150,
                      cursorStyle:'none'
                    }}
                  />
                  </div>
                </span>
              </h3>
              <p className='herodes my-3' data-aos="fade-up" data-aos-delay="200">Connect. Collaborate. Earn. Post projects, discover global <br /> talent, compare competitive bids, and hire top freelancers <br /> with secure escrow payments on Zentora.</p>
              <div data-aos="fade-up" data-aos-delay="300">
                <Link className='btn bg-color1 mb-5 text-light herobtn p-3 my-3' to={'/login'}>Browse Job and Projects < IoIosArrowRoundForward className='fs-5' /></Link>
              </div>
              <img src="/shape-13.png" alt="" className='herodot position-absolute' data-aos="zoom-in" data-aos-delay="400" />
            </div>
            <div className="col-sm-6 position-relative" data-aos="fade-left" data-aos-duration="1000">
              <img src="/girl-1.webp" alt="" className='img-fluid w-75' data-aos="zoom-in" data-aos-delay="200" />
              <img src="/h-1-shape-01.png" alt="" className='position-absolute herosideimg' data-aos="fade-up" data-aos-delay="300" />

              <div className='ring position-absolute' data-aos="zoom-in" data-aos-delay="300"></div>
              <div className='bluering position-absolute' data-aos="zoom-in" data-aos-delay="400"></div>
              <div className='activetalents position-absolute bg-light p-3 shadow-lg' data-aos="flip-up" data-aos-delay="500">

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
