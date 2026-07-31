import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const TestimonialSection = () => {
    return (
        <>
            <div className="row py-5 testimonials">
                <div className="col-sm-10 mx-auto">
                    <div className='webheading' data-aos="fade-down">Our <b className='text-color1'>Testimonials</b></div>
                    <hr className='w-25 mx-auto text-color1' data-aos="zoom-in" data-aos-delay="100"></hr>
                    <div className="row mt-4 align-items-stretch g-4">
                        <div className="col-lg-4 col-md-12 d-flex flex-column justify-content-center px-4" data-aos="fade-right" data-aos-delay="100">
                            <div>
                                <span className='badge bg-color1 px-3 py-2 rounded-pill fs-6 fw-normal text-white mb-2'>Testimonials</span>
                                <h3 className='fw-bold my-3' style={{fontFamily: 'Inter'}}>What Our <span className='text-color1'>Zentora Community</span> Says</h3>
                                <p className='text-secondary mb-4 lh-base'>Clients and Freelancers worldwide trust Zentora to connect, collaborate, and deliver exceptional projects.</p>
                                <Link to='#' className='btn bg-color1 text-light px-4 py-2 rounded-3 textbtn fw-semibold shadow-sm'>View All Testimonials</Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div className="d-flex align-items-center mb-3">
                                        <img src="/testimonial-01.png" className='rounded-circle me-3 border border-2 border-warning-subtle' style={{width: '60px', height: '60px', objectFit: 'cover'}} alt="User Avatar" />
                                        <div>
                                            <h6 className='fw-bold mb-0 fs-5'>Sonu Kumar</h6>
                                            <small className='text-secondary fw-medium'>Software Engineer</small>
                                        </div>
                                    </div>
                                    <p className='text-secondary fs-6 mb-3 lh-base'>
                                        "Zentora helped me find top-tier freelance projects easily. The platform is secure, intuitive, and the payment flow is completely seamless!"
                                    </p>
                                </div>
                                <div className='d-flex align-items-center text-warning gap-1 pt-2 border-top'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <span className='text-dark fw-bold ms-2 fs-6'>5.0</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div className="d-flex align-items-center mb-3">
                                        <img src="/testimonial-03.png" className='rounded-circle me-3 border border-2 border-warning-subtle' style={{width: '60px', height: '60px', objectFit: 'cover'}} alt="User Avatar" />
                                        <div>
                                            <h6 className='fw-bold mb-0 fs-5'>Ananya Sharma</h6>
                                            <small className='text-secondary fw-medium'>UI/UX Designer</small>
                                        </div>
                                    </div>
                                    <p className='text-secondary fs-6 mb-3 lh-base'>
                                        "As a client, finding verified skilled talent was super fast. The escrow system gives total peace of mind for every single milestone."
                                    </p>
                                </div>
                                <div className='d-flex align-items-center text-warning gap-1 pt-2 border-top'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <span className='text-dark fw-bold ms-2 fs-6'>5.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestimonialSection

