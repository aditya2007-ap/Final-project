import React from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const TrendingSection = () => {
    return (
        <>
            <div className="row py-5 trending">
                <div className="col-sm-10 mx-auto">
                    <div className='webheading'>Trending <b className='text-color1'>Contracts</b></div>
                    <hr className='w-25 mx-auto text-color1'></hr>
                    <div className="row g-4">
                        {/* Card 1 */}
                        <div className="col-lg-3 col-md-6">
                            <div className="card shadow-lg border-0 mx-auto trendingCard position-relative p-2">
                                <img src="/course-04-590x430.jpg" className='img-fluid rounded-2' alt="E-commerce Website Dev" />
                                <span className='badge position-absolute' style={{ background: '#e65100' }}>Fixed Price</span>
                                <div className='pt-2'>
                                    <span className='badge rounded-pill' style={{ background: '#e0f7f5', color: '#31bea7', fontSize: '12px' }}>Web Dev</span>
                                </div>
                                <h6 className='m-0 pt-2 fw-bold'>E-commerce Website Dev (React & Node)</h6>
                                <p className='m-0 trendingstar pt-1'>
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <span className='text-secondary ms-1'>(5.0/ 3 Ratings)</span>
                                </p>
                                <p className='m-0 fw-bold pt-1 trendingprice' style={{ color: '#e65100' }}>₹85,000</p>
                                <div className='trendingstar text-secondary pt-1 pb-1'>
                                    <span className='float-start'>☐ 8 Bids</span>
                                    <span className='float-end'>☐ 45 Views</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-lg-3 col-md-6">
                            <div className="card shadow-lg border-0 mx-auto trendingCard position-relative p-2">
                                <img src="/course-03-590x430.jpg" className='img-fluid rounded-2' alt="Financial Security" />
                                <span className='badge position-absolute' style={{ background: '#31bea7' }}>☐ 12 Weeks</span>
                                <div className='pt-2'>
                                    <span className='badge rounded-pill' style={{ background: '#fef2f4', color: '#f06377', fontSize: '12px' }}>Expert</span>
                                </div>
                                <h6 className='m-0 pt-2 fw-bold'>Grow Personal Financial Security Thinking &...</h6>
                                <p className='m-0 trendingstar pt-1'>
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <span className='text-secondary ms-1'>(5.0/ 2 Ratings)</span>
                                </p>
                                <p className='m-0 fw-bold pt-1 trendingprice' style={{ color: '#e65100' }}>₹45,000</p>
                                <div className='trendingstar text-secondary pt-1 pb-1'>
                                    <span className='float-start'>☐ 8 Lessons</span>
                                    <span className='float-end'>☐ 72 Students</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-lg-3 col-md-6">
                            <div className="card shadow-lg border-0 mx-auto trendingCard position-relative p-2">
                                <img src="/course-08-590x430.jpg" className='img-fluid rounded-2' alt="RESTful API" />
                                <span className='badge position-absolute' style={{ background: '#31bea7' }}>☐ 20 Hours</span>
                                <div className='pt-2'>
                                    <span className='badge rounded-pill' style={{ background: '#e8f5e9', color: '#4caf50', fontSize: '12px' }}>All Levels</span>
                                </div>
                                <h6 className='m-0 pt-2 fw-bold'>The Complete Guide to Build RESTful API...</h6>
                                <p className='m-0 trendingstar pt-1'>
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaRegStar className='text-warning' />
                                    <span className='text-secondary ms-1'>(4.0/ 2 Ratings)</span>
                                </p>
                                <p className='m-0 fw-bold pt-1 trendingprice' style={{ color: '#31bea7' }}>Free</p>
                                <div className='trendingstar text-secondary pt-1 pb-1'>
                                    <span className='float-start'>☐ 9 Lessons</span>
                                    <span className='float-end'>☐ 42 Students</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="col-lg-3 col-md-6">
                            <div className="card shadow-lg border-0 mx-auto trendingCard position-relative p-2">
                                <img src="/course-12-590x430.jpg" className='img-fluid rounded-2' alt="Competitive Strategy" />
                                <span className='badge position-absolute' style={{ background: '#e65100' }}>☐ 25 Hours</span>
                                <div className='pt-2'>
                                    <span className='badge rounded-pill' style={{ background: '#e8f5e9', color: '#4caf50', fontSize: '12px' }}>All Levels</span>
                                </div>
                                <h6 className='m-0 pt-2 fw-bold'>Competitive Strategy Law for Management...</h6>
                                <p className='m-0 trendingstar pt-1'>
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStarHalfAlt className='text-warning' />
                                    <FaRegStar className='text-warning' />
                                    <span className='text-secondary ms-1'>(3.0/ 2 Ratings)</span>
                                </p>
                                <p className='m-0 fw-bold pt-1 trendingprice' style={{ color: '#e65100' }}>₹32,000</p>
                                <div className='trendingstar text-secondary pt-1 pb-1'>
                                    <span className='float-start'>☐ 7 Lessons</span>
                                    <span className='float-end'>☐Students</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrendingSection



















{/* <div className="row py-3 ">
                <div className="col-sm-10 mx-auto">
                    <div className='webheading'>Trending <b className='text-color1'>Contracts</b></div>
                    <hr className='w-25 mx-auto text-color1'></hr>
                    <div className="row"></div>
                </div>
            </div> */}