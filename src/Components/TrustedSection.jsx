import React from 'react';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";

const TrustedSection = () => {
    return (
        <>
            <div className="row py-5 trusted">
                <div className="col-sm-10 mx-auto">
                    <div className='webheading'>Trusted By<b className='text-color1'> Teams</b></div>
                    <hr className='w-25 mx-auto text-color1'></hr>
                    <div className="row mt-5 align-items-center">
                        <div className="col-lg-6 col-md-6 position-relative mb-5 pb-4">
                            <img src="/about-01.webp" alt="About Us" className='img-fluid rounded-4 shadow' />
                            <div className='shadow-lg position-absolute trustedimg'>
                                <img src="/Image-2.png" alt="Team" className='img-fluid rounded-3' />
                            </div>
                            <div className='shadow-lg trusted3rddiv d-flex align-items-center gap-3 p-3'>
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
                            <div className="trusteddiv">
                                <h3 className='fw-bold mb-3' style={{fontFamily: 'Inter'}}>We Connect Talent <span className='text-color1'>Globally</span></h3>
                                <p className='text-secondary lh-lg'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis illum quis totam aliquam autem nam laboriosam quisquam architecto ratione, quibusdam veniam sunt reiciendis fugiat? Magnam cum distinctio omnis neque ullam?</p>
                                <p className='text-secondary lh-lg'>Architecto iusto deleniti sint nobis dolorem quod natus minima quos. Fuga ipsa quidem a hic culpa possimus illum in consectetur labore.</p>
                                <ul className='list-unstyled mt-4'>
                                    <li className='d-flex align-items-center gap-2 mb-3'>
                                        <span className='trusted-check-icon d-flex align-items-center justify-content-center'>
                                            <IoCheckmarkDoneOutline className='fs-5'/>
                                        </span>
                                        <span className='fw-medium'>Expert Freelancers</span>
                                    </li>
                                    <li className='d-flex align-items-center gap-2 mb-3'>
                                        <span className='trusted-check-icon d-flex align-items-center justify-content-center'>
                                            <IoCheckmarkDoneOutline className='fs-5'/>
                                        </span>
                                        <span className='fw-medium'>Safe Escrow Payments</span>
                                    </li>
                                    <li className='d-flex align-items-center gap-2 mb-3'>
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

