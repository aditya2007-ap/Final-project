import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

const TestimonialSection = () => {
    return (
        <>
            <div className="row py-3 testimonials">
                <div className="col-sm-10 mx-auto">
                    <div className='webheading'>Our<b className='text-color1'> Testimonials</b></div>
                    <hr className='w-25 mx-auto text-color1'></hr>
                    <div className="row">
                        <div className="col-sm-6">
                            <span className=' testt'>Testimonials</span>
                            <h3 className='testhead'>What Our <b className='text-color1'>Zentora</b><br /><b className='text-color1'> Community</b> Says</h3>
                            <p>Client and Freelancers worldwide trust Zentaro to connect, collaborates.</p>
                            <Link to='#' className='bg-color1 px-4 py-2 text-light textbtn'>View All</Link>
                        </div>
                        <div className="col-sm-3">
                            <div className="shadow-lg p-3">
                                <img src="/testimonial-04.jpg" className='img-fluid rounded-circle ' alt="" />
                                <p className='testpara'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, magni eius dicta aliquam accusantium </p>
                                <p className='teststar '>
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning ' />
                                </p>
                                <p className='m-0'>Sonu kumar</p>
                                <p className='m-0 testpost'>Software Engineer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestimonialSection
