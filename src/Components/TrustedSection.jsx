import React from 'react';
import { FcCheckmark } from "react-icons/fc";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const TrustedSection = () => {
    return (
        <>
            <div className="row py-3 trusted">
                <div className="col-sm-10 mx-auto ">
                    <div className='webheading'>Trusted By<b className='text-color1'> Teams</b></div>
                    <hr className='w-25 mx-auto text-color1'></hr>
                    <div className="row mt-5">
                        <div className="col-sm-6 position-relative pt-5">
                            <img src="/about-01.webp" alt="" className='img-fluid rounded-3' />
                            <div className='shadow-lg p-1 position-absolute w-50 trustedimg'>   
                                <img src="/Image-2.png" alt="" className='img-fluid rounded-3' />
                            </div>
                        </div>
                        <div className="col-sm-6 trusteddiv">
                            <p className=''>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis illum quis totam aliquam autem nam laboriosam quisquam architecto ratione, quibusdam veniam sunt reiciendis fugiat? Magnam cum distinctio omnis neque ullam?
                            Architecto iusto deleniti sint nobis dolorem quod natus minima quos. Fuga ipsa quidem a hic culpa possimus illum in consectetur labore, neque quos, repudiandae porro ducimus soluta! Assumenda, corrupti quibusdam.
                            Dolores mollitia explicabo necessitatibus porro molestias dolor magni voluptates molestiae animi laudantium neque quis fugit assumenda, et incidunt facilis provident, tenetur voluptas repudiandae. Repellendus sit porro aliquid natus voluptatibus sint?</p>
                            <p className='p-2'>
                                <IoCheckmarkDoneOutline className='text-warning fs-4'/> Expert Freelancers <br />
                                <IoCheckmarkDoneOutline className='text-warning fs-4'/> Safe Escrow Payments <br />
                                <IoCheckmarkDoneOutline className='text-warning fs-4'/> 24X7 Priority Support <br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrustedSection
