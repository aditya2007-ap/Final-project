import React from 'react'
import {
  FaFolderPlus,
  FaPlusCircle,
  FaPen,
  FaRupeeSign,
  FaClock,
  FaFileAlt,
  FaPaperPlane,
  FaTimes
} from 'react-icons/fa'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object()
  .shape({
    title: yup.string().required('Project title is required'),
    budget: yup
      .number()
      .typeError('Budget must be a valid number')
      .required('Budget is required')
      .positive('Budget must be positive'),
    timeline: yup.string().required('Timeline is required'),
    description: yup.string().required('Description is required'),
  })

const ClientPostProject = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAdd = async (data) => {
    const info = JSON.parse(localStorage.getItem('info'));
    const clientId = info?._id || info?.id;
    const finalData = {
      ...data,
      clientId,
      client: clientId,
      desc: data.description,
      duration: data.timeline,
    };
    const res = await axios.post('http://localhost:9000/client-post-project', finalData);
 if(res?.data?.success == true){
  Swal.fire({
    title:"Post Project",
    text:res?.data?.message,
    icon:'success'
  })
  reset()
  navigate('/client-manage-project')
  } else {
    Swal.fire({
      title: "Post Project",
      text: res?.data?.message,
      icon: 'error'
    })
  }
}

  return (
    <div className="cpp-page py-5">
      <div className="container">

        {/* Page Header */}
        <div className="row mb-5" data-aos="fade-down">
          <div className="col-12">
            <span className="cpp-eyebrow">Zentora for Clients</span>
            <h1 className="cpp-heading d-flex align-items-center gap-2">
              <FaFolderPlus style={{ color: '#ee4a03' }} /> Post a New Freelance Project
            </h1>
            <p className="cpp-subtext mt-2">
              Fill out the details below to publish your project and start receiving bids from top freelancers.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="row" data-aos="zoom-in" data-aos-duration="800">
          <div className="col-12">
            <div className="cpp-card">

              {/* Card Title */}
              <h4 className="cpp-card-title">
                <span className="cpp-card-icon"><FaPlusCircle /></span>
                Post a New Freelance Project
              </h4>

              <form onSubmit={handleSubmit(handleAdd)}>
                <div className="row g-4">

                  {/* Project Title */}
                  <div className="col-12">
                    <label className="cpp-label">
                      <FaPen /> Project Title
                    </label>
                    <input
                      {...register('title')}
                      type="text"
                      className="cpp-input"
                      placeholder="e.g. Develop React E-commerce Web App"
                    />
                    {errors.title && <p className="text-danger small mt-1">{errors.title.message}</p>}
                  </div>

                  {/* Budget */}
                  <div className="col-12 col-sm-6">
                    <label className="cpp-label">
                      <FaRupeeSign /> Budget (₹)
                    </label>
                    <input
                      {...register('budget')}
                      type="number"
                      className="cpp-input"
                      placeholder="e.g. 50000"
                    />
                    {errors.budget && <p className="text-danger small mt-1">{errors.budget.message}</p>}
                  </div>

                  {/* Timeline */}
                  <div className="col-12 col-sm-6">
                    <label className="cpp-label">
                      <FaClock /> Timeline / Deadline
                    </label>
                    <input
                      {...register('timeline')}
                      type="text"
                      className="cpp-input"
                      placeholder="e.g. 3 weeks"
                    />
                    {errors.timeline && <p className="text-danger small mt-1">{errors.timeline.message}</p>}
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="cpp-label">
                      <FaFileAlt /> Description
                    </label>
                    <textarea
                      {...register('description')}
                      className="cpp-textarea"
                      rows="6"
                      placeholder="Describe the project scope, deliverables, skills needed..."
                    />
                    {errors.description && <p className="text-danger small mt-1">{errors.description.message}</p>}
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="cpp-actions">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="cpp-btn-cancel d-inline-flex align-items-center gap-2"
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button type="submit" className="cpp-btn-publish">
                    <FaPaperPlane /> Publish Project
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ClientPostProject
