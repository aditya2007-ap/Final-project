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
  FiTrash2,
  FiTag,
  FiZap,
  FiDollarSign,
  FiBookmark
} from 'react-icons/fi';
import axios from 'axios';
import Swal from 'sweetalert2';

const schema = yup.object({
  name: yup.string().required('Plan name is required').min(2, 'At least 2 characters'),
  credits: yup.string().required('Credits amount is required').min(1),
  price: yup.string().required('Price is required').min(1),
  tagline: yup.string().required('Tagline is required').min(3),
  popular: yup.boolean(),
});

const AdminPlans = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:9000/admin-get-plans');
      setData(res?.data?.result || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

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
          title: "Plan Created!",
          text: res?.data?.message || "New credit plan added successfully",
          icon: "success",
          confirmButtonColor: '#e65100'
        });
        reset();
        fetchData();
      } else {
        Swal.fire({
          title: "Notice",
          text: res?.data?.message || "Unable to add plan",
          icon: "warning"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong creating the plan",
        icon: "error"
      });
    }
  };

  const handleDelete = async (id, planName) => {
    const confirm = await Swal.fire({
      title: 'Delete Plan?',
      text: `Are you sure you want to delete the "${planName || 'selected'}" plan?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, delete it'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:9000/admin-delete-plan/${id}`);
        if (res?.data?.success === true) {
          Swal.fire('Deleted!', res?.data?.message || 'Plan has been removed.', 'success');
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
    <div className="admin-dashboard-wrapper py-5">
      <div className="container">
        {/* Header Title */}
        <div data-aos="fade-down" className="mb-4">
          <div className="dash-eyebrow">ZENTORA ADMIN</div>
          <h1 className="dash-heading d-flex align-items-center gap-3">
            <FiCreditCard className="text-color1" />
            Credit Plan Architecture &amp; Pricing
          </h1>
          <p className="admin-lead mb-4">
            Configure subscription credit packages for freelancers to submit proposals and unlock client briefs.
          </p>
        </div>

        {/* Main Card */}
        <div className="dash-card" data-aos="fade-up" data-aos-duration="800">
          <div className="admin-plan-header-block mb-4 pb-3 border-bottom">
            <h4 className="fw-bold mb-2 d-flex align-items-center" style={{ fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
              <FiZap className="text-color1 me-2" />
              Freelancer Bidding Credit Rules
            </h4>
            <p className="text-muted mb-0 small" style={{ fontFamily: 'var(--font-body)' }}>
              Each submitted proposal deducts 1 credit from the freelancer's active balance. Configured tiers dynamically update on the public pricing page and member dashboards.
            </p>
          </div>

          {/* Form Box */}
          <div className="admin-plan-form-box p-4 rounded-4 border mb-5" style={{ background: '#fafbfc' }} data-aos="zoom-in" data-aos-delay="150">
            <h5 className="fw-bold mb-4 d-flex align-items-center" style={{ fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
              <FiPlusCircle className="text-color1 me-2 fs-5" />
              Create New Credit Tier
            </h5>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-4">
                <div className="col-md-3 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiTag className="me-1 text-muted" /> Plan Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. STARTER PRO"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-danger small mt-1 mb-0">{errors.name.message}</p>}
                </div>

                <div className="col-md-3 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiZap className="me-1 text-muted" /> Monthly Credits
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 100"
                    {...register("credits")}
                  />
                  {errors.credits && <p className="text-danger small mt-1 mb-0">{errors.credits.message}</p>}
                </div>

                <div className="col-md-3 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiDollarSign className="me-1 text-muted" /> Price (₹ / month)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 999"
                    {...register("price")}
                  />
                  {errors.price && <p className="text-danger small mt-1 mb-0">{errors.price.message}</p>}
                </div>

                <div className="col-md-3 col-sm-6">
                  <label className="admin-plan-label fw-semibold d-flex align-items-center">
                    <FiBookmark className="me-1 text-muted" /> Tagline / Highlight
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. For High Volume Bidding"
                    {...register("tagline")}
                  />
                  {errors.tagline && <p className="text-danger small mt-1 mb-0">{errors.tagline.message}</p>}
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-4 pt-3 border-top">
                <div className="form-check m-0 d-flex align-items-center">
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    id="popularCheck"
                    style={{ accentColor: '#e65100', cursor: 'pointer' }}
                    {...register("popular")}
                  />
                  <label className="form-check-label fw-semibold text-dark ms-2 mb-0" htmlFor="popularCheck" style={{ cursor: 'pointer' }}>
                    Highlight as "Most Popular"
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn text-white px-4 py-2 fw-bold border-0 d-inline-flex align-items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #ff5722 0%, #e65100 100%)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 14px rgba(230, 81, 0, 0.3)'
                  }}
                >
                  <FiPlus className="fs-5" />
                  Publish Plan
                </button>
              </div>
            </form>
          </div>

          {/* Existing Plans Table */}
          <div className="existing-plans-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0 d-flex align-items-center" style={{ fontFamily: 'var(--font-heading)', color: '#0f172a' }}>
                <FiLayers className="text-color1 me-2" />
                Active Platform Plans ({data?.length || 0})
              </h5>
            </div>

            <div className="table-responsive">
              <table className="table dash-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Credits Allowed</th>
                    <th>Pricing</th>
                    <th>Tagline</th>
                    <th>Tier Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="spinner-border text-warning" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : data && data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item?._id}>
                        <td>
                          <div className="fw-bold text-dark" style={{ fontFamily: 'var(--font-heading)', fontSize: '15px' }}>
                            {item?.name}
                          </div>
                        </td>
                        <td>
                          <span className="admin-credit-badge">
                            <FiZap /> {item?.credits} Credits
                          </span>
                        </td>
                        <td>
                          <span className="fw-bold" style={{ color: '#0f172a', fontFamily: 'var(--font-brand)', fontSize: '16px' }}>
                            ₹{item?.price} <small className="text-muted fw-normal">/mo</small>
                          </span>
                        </td>
                        <td className="text-muted small">{item?.tagline}</td>
                        <td>
                          {item?.popular ? (
                            <span className="badge rounded-pill px-3 py-1" style={{ background: 'rgba(230, 81, 0, 0.12)', color: '#e65100', border: '1px solid rgba(230, 81, 0, 0.3)' }}>
                              <FiStar className="me-1" /> Featured / Popular
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-light text-muted border px-3 py-1">
                              Standard
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleDelete(item?._id, item?.name)}
                            className="action-btn action-btn-delete"
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">
                        <FiCreditCard className="fs-1 text-muted mb-2 d-block mx-auto opacity-50" />
                        <div className="fw-semibold text-dark fs-6">No credit plans existed currently</div>
                        <small className="text-muted">Create your first credit tier using the form above to enable freelancer bidding.</small>
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
