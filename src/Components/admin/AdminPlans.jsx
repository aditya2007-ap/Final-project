import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FiCreditCard,
  FiPlusCircle,
  FiPlus,
  FiLayers,
  FiStar,
  FiEdit2,
  FiTrash2,
  FiTag,
  FiZap,
  FiDollarSign,
  FiBookmark
} from 'react-icons/fi';
import axios from 'axios';
import Swal from 'sweetalert2';

const schema = yup.object({
  name: yup.string().required().min(2),
  credits: yup.string().required().min(1),
  price: yup.string().required().min(1),
  tagline: yup.string().required().min(3),
  popular: yup.boolean(),
});

const AdminPlans = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:9000/admin-get-plans');
      setData(res?.data?.result || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      const res = await axios.post('http://localhost:9000/admin-create-plans', formData);
      if (res?.data?.success === true) {
        Swal.fire({
          title: "Success",
          text: res?.data?.message || "Plan added successfully",
          icon: "success"
        })
        reset()
        fetchData()
      } else {
        Swal.fire({
          title: "Notice",
          text: res?.data?.message || "Unable to add plan",
          icon: "warning"
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong creating the plan",
        icon: "error"
      })
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this credit plan?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:9000/admin-delete-plan/${id}`);
        if (res?.data?.success === true) {
          Swal.fire('Deleted!', res?.data?.message || 'Plan has been deleted.', 'success');
          fetchData();
        } else {
          Swal.fire('Error', res?.data?.message || 'Could not delete plan', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to connect to server', 'error');
      }
    }
  };


  return (
    <div className="admin-plans-wrapper py-5">
      <div className="container">
        {/* Header Title */}
        <span className="admin-subtitle text-uppercase fw-bold">ZENTORA ADMIN</span>
        <h1 className="admin-title fw-bold mb-4">Admin Management Dashboard</h1>

        {/* Main Card */}
        <div className="admin-plans-card bg-white p-4 p-md-5 rounded-4 shadow-sm border">
          <div className="admin-plan-header-block mb-4 pb-3 border-bottom">
            <h3 className="admin-plan-header-title fw-bold mb-2 align-items-center">
              <FiCreditCard className="text-color1 me-2" />
              Freelancer Credit Plan Management
            </h3>
            <p className="admin-plan-header-desc text-muted mb-0">
              Add new credit plans from here. Each bid deducts 1 credit from the freelancer's balance. New plans appear on the landing page and freelancer dashboard.
            </p>
          </div>

          {/* Form Box */}
          <div className="admin-plan-form-box p-4 rounded-4 border bg-light mb-5">
            <h5 className="admin-plan-form-title fw-bold mb-4 align-items-center">
              <FiPlusCircle className="text-color1 me-2 fs-5" />
              Add New Credit Plan
            </h5>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-4">
                <div className="col-md-3 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiTag className="me-1 text-muted" /> Plan Name
                  </label>
                  <input type="text" className="form-control" placeholder="e.g. BUSINESS"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>

                <div className="col-md-3 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiZap className="me-1 text-muted" /> Monthly Credits
                  </label>
                  <input type="number" className="form-control" placeholder="e.g. 100"
                    {...register("credits")}
                  />
                  {errors.credits && <p className="text-danger">{errors.credits.message}</p>}
                </div>

                <div className="col-md-3 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiDollarSign className="me-1 text-muted" /> Price (₹ / month)
                  </label>
                  <input type="number" className="form-control" placeholder="e.g. 999"
                    {...register("price")}
                  />
                  {errors.price && <p className="text-danger">{errors.price.message}</p>}
                </div>

                <div className="col-md-3 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiBookmark className="me-1 text-muted" /> Short Tagline
                  </label>
                  <input type="text" className="form-control" placeholder="e.g. For Growing Freelancers"
                    {...register("tagline")}
                  />
                  {errors.tagline && <p className="text-danger">{errors.tagline.message}</p>}
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-4 pt-3 border-top">
                <div className="form-check m-0 d-flex align-items-center">
                  <input className="form-check-input mt-0" type="checkbox" id="popularCheck"
                    {...register("popular")}
                  />
                  {errors.popular && <p className="text-danger">{errors.popular.message}</p>}
                  <label className="form-check-label fw-semibold text-dark ms-2 mb-0" htmlFor="popularCheck">
                    Mark as Most Popular Plan
                  </label>
                </div>

                <button type="submit" className="btn btn-danger text-white px-4 py-2 fw-bold border-0 btn-add-plan d-inline-flex align-items-center gap-2">
                  <FiPlus className="fs-5" />
                  Add Credit Plan
                </button>
              </div>
            </form>
          </div>

          {/* Existing Plans Table */}
          <div className="existing-plans-section">
            <div className="existing-plans-header mb-3">
              <h5 className="fw-bold m-0 d-flex align-items-center">
                <FiLayers className="text-color1 me-2" />
                Active Credit Plans ({data?.length || 0})
              </h5>
            </div>

            <div className="table-responsive border rounded-3 overflow-hidden shadow-sm">
              <table className="table align-middle mb-0 admin-plans-table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Plan Name</th>
                    <th scope="col">Monthly Credits</th>
                    <th scope="col">Price</th>
                    <th scope="col">Tagline</th>
                    <th scope="col">Badge</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item?._id}>
                        <td className="fw-bold text-dark">{item?.name}</td>
                        <td><span className="badge bg-info text-dark">{item?.credits} Credits</span></td>
                        <td className="fw-bold text-success">₹{item?.price}</td>
                        <td>{item?.tagline}</td>
                        <td>
                          {item?.popular ? (
                            <span className="badge bg-warning text-dark"><FiStar className="me-1" />Most Popular</span>
                          ) : (
                            <span className="badge bg-secondary">Standard</span>
                          )}
                        </td>
                        <td>
                          <button 
                            type='button' 
                            onClick={() => handleDelete(item?._id)}
                            className='btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1'
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No credit plans found. Add your first plan above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPlans;
