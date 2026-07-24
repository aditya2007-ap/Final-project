import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <>
      <div className="row ">
        <div className='col-sm-12 hero bg-color2'>
            <div className="row ps-5">
                <div className="col-sm-6 position-relative p-5">
                    <h3 className='herotitle '>Where Talent <b className='text-color1'>Meets <br />Opportunity</b> with <br /> Zentora</h3>
                    <p className='herodes '>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Corporis aliquid dolorum <br /> nemo rem itaque eius expedita obcaecati <br /> corrupti, dicta in cumque possimus quas <br /> quod eum delectus at deleniti.</p>
                    <Link className='btn bg-color1 mb-5 text-light herobtn'>Browse Job and Projects</Link>
                    <img src="/shape-13.png" alt="" className='herodot position-absolute'/>
                </div>
                <div className="col-sm-6 position-relative">
                    <img src="/girl-1.webp" alt="" className='img-fluid w-75'/>
                    <img src="/h-1-shape-01.png" alt="" className='position-absolute herosideimg'/>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection
