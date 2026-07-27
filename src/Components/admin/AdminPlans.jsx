import React from 'react';
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

const AdminPlans = () => {
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
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row g-4">
                <div className="col-md-3 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiTag className="me-1 text-muted" /> Plan Name
                  </label>
                  <input type="text" className="form-control" placeholder="e.g. BUSINESS" />
                </div>

                <div className="col-md-3 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiZap className="me-1 text-muted" /> Monthly Credits
                  </label>
                  <input type="number" className="form-control" placeholder="e.g. 100" />
                </div>

                <div className="col-md-3 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiDollarSign className="me-1 text-muted" /> Price (₹ / month)
                  </label>
                  <input type="number" className="form-control" placeholder="e.g. 999" />
                </div>

                <div className="col-md-3 col-sm-6">
                  <label className="form-label admin-plan-label fw-semibold d-flex align-items-center">
                    <FiBookmark className="me-1 text-muted" /> Short Tagline
                  </label>
                  <input type="text" className="form-control" placeholder="e.g. For Growing Freelancers" />
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-4 pt-3 border-top">
                <div className="form-check m-0 d-flex align-items-center">
                  <input className="form-check-input mt-0" type="checkbox" id="popularCheck" />
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
                Active Credit Plans
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
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold">Starter</td>
                    <td><span className="fw-semibold">10</span> credits / mo</td>
                    <td className="fw-bold text-color1">₹0 / mo</td>
                    <td className="text-muted">For new freelancers getting started</td>
                    <td><span className="text-muted">—</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-light border fw-semibold d-inline-flex align-items-center gap-1">
                          <FiEdit2 className="text-secondary" /> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger fw-semibold d-inline-flex align-items-center gap-1">
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Pro</td>
                    <td><span className="fw-semibold">50</span> credits / mo</td>
                    <td className="fw-bold text-color1">₹499 / mo</td>
                    <td className="text-muted">Best for active freelancers</td>
                    <td>
                      <span className="badge bg-warning text-dark px-2 py-1 d-inline-flex align-items-center gap-1">
                        <FiStar /> Most Popular
                      </span>
                    </td>
                  
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-light border fw-semibold d-inline-flex align-items-center gap-1">
                          <FiEdit2 className="text-secondary" /> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger fw-semibold d-inline-flex align-items-center gap-1">
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Elite</td>
                    <td><span className="fw-semibold">200</span> credits / mo</td>
                    <td className="fw-bold text-color1">₹1,499 / mo</td>
                    <td className="text-muted">For power users &amp; small agencies</td>
                    <td><span className="text-muted">—</span></td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-light border fw-semibold d-inline-flex align-items-center gap-1">
                          <FiEdit2 className="text-secondary" /> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger fw-semibold d-inline-flex align-items-center gap-1">
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
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
