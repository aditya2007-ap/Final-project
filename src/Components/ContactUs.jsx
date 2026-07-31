import React from 'react'
const ContactUs = () => {
  return (
     <>
            <div className="row py-5 contact">
                <div className="col-sm-10 mx-auto">
                    <div className='webheading' data-aos="fade-down">Contact<b className='text-color1'> Us</b></div>
                    <hr className='w-25 mx-auto text-color1' data-aos="zoom-in" data-aos-delay="100"></hr>
                    <div className="row">
                        <div className="col-sm-8 mx-auto" data-aos="zoom-in" data-aos-duration="800">
                            <div className="row bg-color1 contactbg py-5 rounded-3">
                                <div className="col-5 text-light text-end" data-aos="fade-right" data-aos-delay="200">
                                    <h5 >Get in Touch:</h5>
                                    <span className='h5 cemail'>ap8703465@gmail.com</span>
                                </div>
                                <div className="col-2" data-aos="zoom-in" data-aos-delay="300">
                                    <div className='p-2 rounded-circle shadow-lg contractor text-light'>OR </div>
                                </div>
                                <div className="col-5 text-light text-start" data-aos="fade-left" data-aos-delay="200">
                                     <h5 >Call Us via:</h5>
                                    <span className='h5 cemail'>7266057178</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}
export default ContactUs
