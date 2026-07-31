import React from 'react'
import { FaCode } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { FaNetworkWired } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";

const CategorySection = () => {
  return (
    <>
      <div className="row py-5 category">
        <div className="col-sm-10 mx-auto p-3">
          <div className='webheading' data-aos="fade-down">Browse Talent <b className='text-color1'>By Category</b></div>
          <hr className='w-25 mx-auto text-color1' data-aos="zoom-in" data-aos-delay="100"></hr>

          {/* Equal card spacing using Bootstrap g-4 */}
          <div className="row g-4 mt-2">
            <div data-aos="fade-up" data-aos-delay="100" className="col-lg-4 col-md-6">
              <div className="card border border-0 shadow-sm mx-auto catcard ccard1 h-100">
                <div className="row p-4 align-items-center">
                  <div className="col-2">
                    <FaCode className='fs-2 mx-1 caticon' style={{ color: '#31bea7' }} />
                  </div>
                  <div className="col-10 px-3">
                    Web & Software Dev
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="col-lg-4 col-md-6">
              <div className="card border border-0 shadow-sm mx-auto catcard ccard2 h-100">
                <div className="row p-4 align-items-center">
                  <div className="col-2 caticon">
                    <FaPaintBrush className='fs-2 mx-1' style={{ color: '#f06377' }} />
                  </div>
                  <div className="col-10 px-3">
                    Design & Creative
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="col-lg-4 col-md-6">
              <div className="card border border-0 shadow-sm mx-auto catcard ccard3 h-100">
                <div className="row p-4 align-items-center">
                  <div className="col-2 caticon">
                    <FaLanguage className='fs-2 mx-1' style={{ color: '#61CE70' }} />
                  </div>
                  <div className="col-10 px-3">
                    Writing & Translation
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" className="col-lg-4 col-md-6">
              <div className="card border border-0 shadow-sm mx-auto catcard ccard4 h-100">
                <div className="row p-4 align-items-center">
                  <div className="col-2 caticon">
                    <FaHeadset className='fs-2 mx-1' style={{ color: '#f8b81f' }} />
                  </div>
                  <div className="col-10 px-3">
                    Admin Support
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="col-lg-4 col-md-6">
              <div className="card border border-0 shadow-sm mx-auto catcard ccard5 h-100">
                <div className="row p-4 align-items-center">
                  <div className="col-2 caticon">
                    <FaChartBar className='fs-2 mx-1' style={{ color: '#5866eb' }} />
                  </div>
                  <div className="col-10 px-3">
                    Data Science & Analytics
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="col-lg-4 col-md-6">
              <div className="card border border-0 shadow-sm mx-auto catcard ccard6 h-100">
                <div className="row p-4 align-items-center">
                  <div className="col-2 caticon">
                    <FaBullhorn className='fs-2 mx-1' style={{ color: '#f92596' }} />
                  </div>
                  <div className="col-10 px-3">
                    Marketing
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" className="col-lg-4 col-md-6">
              <div className="card border border-0 shadow-sm mx-auto catcard ccard7 h-100">
                <div className="row p-4 align-items-center">
                  <div className="col-2 caticon">
                    <FaCalculator className='fs-2 mx-1' style={{ color: '#da04f8' }} />
                  </div>
                  <div className="col-10 px-3">
                    Accounting & Consulting
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="col-lg-4 col-md-6">
              <div className="card border border-0 shadow-sm mx-auto catcard ccard8 h-100">
                <div className="row p-4 align-items-center">
                  <div className="col-2 caticon">
                    <FaNetworkWired className='fs-2 mx-1' style={{ color: '#f8b81f' }} />
                  </div>
                  <div className="col-10 px-3">
                    IT & Networking
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="col-lg-4 col-md-6">
              <div className="card border border-0 shadow-sm mx-auto catcard ccard9 h-100">
                <div className="row p-4 align-items-center">
                  <div className="col-2 caticon">
                    <FaFilm className='fs-2 mx-1' style={{ color: '#3da8dd' }} />
                  </div>
                  <div className="col-10 px-3">
                    Video & Animation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default CategorySection

