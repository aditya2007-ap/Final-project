import React from 'react';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";

const TrustedSection = () => {
    return (
        <>
            <div className="row py-5 trusted">
                <div className="col-sm-10 mx-auto">
                    <div className='webheading' data-aos="fade-down">Trusted By<b className='text-color1'> Teams</b></div>
                    <hr className='w-25 mx-auto text-color1' data-aos="zoom-in" data-aos-delay="100"></hr>
                    <div className="row mt-5 align-items-center">
                        <div data-aos="fade-right" data-aos-duration="1000" className="col-lg-6 col-md-6 position-relative mb-5 pb-4">
                            <img src="/about-01.webp" alt="About Us" className='img-fluid rounded-4 shadow' />
                            <div className='shadow-lg position-absolute trustedimg' data-aos="zoom-in" data-aos-delay="300">
                                <img src="/Image-2.png" alt="Team" className='img-fluid rounded-3' />
                            </div>
                            <div className='shadow-lg trusted3rddiv d-flex align-items-center gap-3 p-3' data-aos="fade-up" data-aos-delay="400">
                                <div className='trustedicon d-flex align-items-center justify-content-center'>
                                    <FaGlobeAmericas className='fs-1' />
                                </div>
                                <div>
                                    <h4 className='mb-0 fw-bold' style={{color:'#e65100'}}>150+</h4>
                                    <span className='text-secondary'>Top Countries</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div data-aos="fade-left" data-aos-duration="1000" className="trusteddiv">
                                <h3 className='fw-bold mb-3 fw-bold fs-1' style={{fontFamily: 'Geomini'}}>Work Without Borders With <span className='text-color1'>Zentora </span></h3>
                                <p className='text-secondary lh-lg'>Zentora is a secure, escrow-backed platform where businesses and freelancers connect across the globe. Hire. Work. Grow. — get premium development, design, content, and marketing delivered on time, within budget.</p>
                                <ul className='list-unstyled mt-4'>
                                    <li className='d-flex align-items-center gap-2 mb-3' data-aos="fade-left" data-aos-delay="100">
                                        <span className='trusted-check-icon d-flex align-items-center justify-content-center'>
                                            <IoCheckmarkDoneOutline className='fs-5'/>
                                        </span>
                                        <span className='fw-medium'>Expert Freelancers</span>
                                    </li>
                                    <li className='d-flex align-items-center gap-2 mb-3' data-aos="fade-left" data-aos-delay="200">
                                        <span className='trusted-check-icon d-flex align-items-center justify-content-center'>
                                            <IoCheckmarkDoneOutline className='fs-5'/>
                                        </span>
                                        <span className='fw-medium'>Safe Escrow Payments</span>
                                    </li>
                                    <li className='d-flex align-items-center gap-2 mb-3' data-aos="fade-left" data-aos-delay="300">
                                        <span className='trusted-check-icon d-flex align-items-center justify-content-center'>
                                            <IoCheckmarkDoneOutline className='fs-5'/>
                                        </span>
                                        <span className='fw-medium'>24X7 Priority Support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrustedSection

