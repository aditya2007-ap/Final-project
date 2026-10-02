import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaGavel, FaUser, FaEnvelope, FaRupeeSign, FaArrowLeft,
  FaBriefcase, FaClock, FaCheck, FaTimes, FaHourglassHalf,
  FaRegCheckCircle, FaTimesCircle, FaSyncAlt, FaTrophy,
  FaCalendarAlt, FaComments, FaQuoteLeft, FaCopy, FaRegCommentDots,
  FaEye, FaExternalLinkAlt, FaMapMarkerAlt, FaPhoneAlt
} from "react-icons/fa";
import ChatModal from "../ChatModal";

/* ── helpers ── */
const normalise = (s) => (s || "pending").toLowerCase();

const statusBadge = (s) => {
  const v = normalise(s);
  if (v === "accept" || v === "accepted")
    return { cls: "badge-accept", label: "Accepted", icon: <FaRegCheckCircle /> };
  if (v === "reject" || v === "rejected")
    return { cls: "badge-reject", label: "Rejected", icon: <FaTimesCircle /> };
  return { cls: "badge-pending", label: "Pending", icon: <FaHourglassHalf /> };
};

const ClientReviewBids = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location?.state;

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [chatPartner, setChatPartner] = useState(null);
  const [expandedBids, setExpandedBids] = useState({});
  const [previewFreelancer, setPreviewFreelancer] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBids((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Proposal message copied!',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const clientInfo = (() => {
    try {
      return JSON.parse(localStorage.getItem("info")) || null;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (project?._id) fetchData();
  }, [location]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:9000/client-biding-list?projectId=${project._id}`
      );
      setBids(res?.data?.result || []);
    } catch {
      Swal.fire({ title: "Error", text: "Failed to load bids.", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (status, userId) => {
    const isAccepting = status === "accept" || status === "accepted";
    const action = isAccepting ? "Accept" : "Reject";
    const confirm = await Swal.fire({
      title: `${action} this proposal?`,
      text: isAccepting
        ? "This will update the proposal status to Accepted and immediately send an official acceptance email to the freelancer's Gmail with full project & client details."
        : "This will mark their bid proposal as Rejected.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      confirmButtonColor: isAccepting ? "#16a34a" : "#dc2626",
    });
    if (!confirm.isConfirmed) return;

    setActionLoading(userId);
    try {
      const res = await axios.put("http://localhost:9000/client-biding-action", {
        projectId: project._id,
        status: isAccepting ? "accepted" : "rejected",
        userId,
      });
      if (res?.data?.success) {
        await fetchData();
        if (isAccepting) {
          const acceptedBidder = bids.find((b) => b.userId === userId) || { userId };
          Swal.fire({
            title: "Proposal Accepted! 🎉",
            html: `<div class="text-start" style="font-size: 0.93rem; color: #374151;">
              <p class="mb-2">Proposal status is now updated to <strong class="text-success">Accepted</strong>.</p>
              <div class="p-3 bg-light rounded-3 border mb-2">
                <div class="d-flex align-items-center gap-2 text-primary fw-semibold mb-1">
                  <span>✉️</span> Freelancer Gmail Notification
                </div>
                <p class="small text-muted mb-0">An acceptance notification containing project details (title, budget, timeline, scope) and your client contact details has been dispatched to the freelancer's email address.</p>
              </div>
              <p class="small text-secondary mb-0">You can start direct messaging right now to align on project requirements and timelines.</p>
            </div>`,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#64748b",
            confirmButtonText: "💬 Chat with Freelancer Now",
            cancelButtonText: "Close",
          }).then((alertRes) => {
            if (alertRes.isConfirmed) {
              setChatPartner(acceptedBidder);
            }
          });
        } else {
          Swal.fire({
            title: "Proposal Rejected",
            text: res?.data?.message || "Proposal has been marked as Rejected.",
            icon: "info",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } else {
        Swal.fire({ title: "Notice", text: res?.data?.message, icon: "warning" });
      }
    } catch {
      Swal.fire({ title: "Error", text: "Server error while updating.", icon: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  /* counts */
  const total = bids.length;
  const accepted = bids.filter((b) => normalise(b.status) === "accept" || normalise(b.status) === "accepted").length;
  const pending = bids.filter((b) => normalise(b.status) === "pending").length;
  const rejected = bids.filter((b) => normalise(b.status) === "reject" || normalise(b.status) === "rejected").length;

  const filtered = bids.filter((b) => {
    const q = search.toLowerCase();
    return (
      (b.user_name && b.user_name.toLowerCase().includes(q)) ||
      (b.user_email && b.user_email.toLowerCase().includes(q))
    );
  });

  if (!project) {
    return (
      <div className="container py-5 text-center">
        <FaGavel style={{ fontSize: "3rem", color: "#d1d5db" }} className="mb-3" />
        <h5 className="text-muted">No project selected.</h5>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/client-manage-project")}>
          ← Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* ── Back + Header ── */}
      <div className="mb-4" data-aos="fade-down">
        <button
          className="btn btn-sm btn-outline-secondary mb-3 d-inline-flex align-items-center gap-2"
          onClick={() => navigate("/client-manage-project")}
        >
          <FaArrowLeft /> Back to Projects
        </button>

        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <span className="admin-subtitle">CLIENT PORTAL</span>
            <h2 className="admin-title d-flex align-items-center gap-2 mb-1">
              <FaGavel className="text-primary" /> Competing Proposals
            </h2>
            <p className="text-muted small mb-0">
              All freelancers who bid on this project are listed below.
            </p>
          </div>
          <button
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
            onClick={fetchData}
            disabled={loading}
          >
            <FaSyncAlt className={loading ? "spin-icon" : ""} />
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {/* ── Project Info Card ── */}
      <div className="crb-project-card mb-4" data-aos="fade-up">
        <div className="crb-project-card-header">
          <FaBriefcase className="text-primary me-2" />
          Project Overview
        </div>
        <div className="row g-3 p-4">
          <div className="col-sm-6 col-md-3">
            <div className="crb-info-item">
              <div className="crb-info-label">Project Title</div>
              <div className="crb-info-value">{project?.title || "—"}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="crb-info-item">
              <div className="crb-info-label">Budget</div>
              <div className="crb-info-value text-success fw-bold">₹ {project?.budget || "—"}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="crb-info-item">
              <div className="crb-info-label">Duration</div>
              <div className="crb-info-value">{project?.duration || project?.time || "Flexible"}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="crb-info-item">
              <div className="crb-info-label">Posted On</div>
              <div className="crb-info-value">
                {project?.createdAt
                  ? new Date(project.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })
                  : "—"}
              </div>
            </div>
          </div>
          {(project?.desc || project?.description) && (
            <div className="col-12">
              <div className="crb-info-item">
                <div className="crb-info-label">Description</div>
                <div className="crb-info-value small text-secondary">
                  {project?.desc || project?.description}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Stat Pills ── */}
      <div className="d-flex flex-wrap gap-3 mb-4" data-aos="fade-up">
        <div className="crb-stat-pill crb-pill-indigo">
          <FaGavel /> <strong>{total}</strong> Total Bids
        </div>
        <div className="crb-stat-pill crb-pill-amber">
          <FaHourglassHalf /> <strong>{pending}</strong> Pending
        </div>
        <div className="crb-stat-pill crb-pill-green">
          <FaRegCheckCircle /> <strong>{accepted}</strong> Accepted
        </div>
        <div className="crb-stat-pill crb-pill-red">
          <FaTimesCircle /> <strong>{rejected}</strong> Rejected
        </div>
      </div>

      {/* ── Bids Section ── */}
      <div className="admin-main-card" data-aos="fade-up" data-aos-delay="100">

        {/* Toolbar */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <FaTrophy className="text-warning" />
            {total > 0
              ? `${total} freelancer${total > 1 ? "s" : ""} applied for this project`
              : "No proposals yet"}
          </h5>
          <div className="input-group" style={{ maxWidth: "260px" }}>
            <span className="input-group-text bg-light border-end-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search freelancer…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-3 text-muted">Loading proposals…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <FaGavel style={{ fontSize: "2.5rem", opacity: 0.2 }} className="mb-3 d-block mx-auto" />
            <h6>No proposals found{search ? ` for "${search}"` : " yet"}.</h6>
            <p className="small">
              {search ? "Try a different search term." : "Freelancers haven't bid on this project yet."}
            </p>
          </div>
        ) : (
          <>
            {/* Cards View */}
            <div className="row g-3">
              {filtered.map((item, idx) => {
                const badge = statusBadge(item.status);
                const isActioning = actionLoading === item.userId;
                const isAccepted = normalise(item.status) === "accept" || normalise(item.status) === "accepted";
                const isRejected = normalise(item.status) === "reject" || normalise(item.status) === "rejected";
                const skills = (item.user_skill || "")
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);

                return (
                  <div className="col-md-6 col-lg-4" key={item._id || idx}>
                    <div className={`crb-bid-card ${isAccepted ? "crb-card-accepted" : isRejected ? "crb-card-rejected" : ""}`}>
                      {/* Rank badge */}
                      <div className="crb-rank-badge">#{idx + 1}</div>

                      {/* Avatar + name with clickable profile link */}
                      <div className="mb-3">
                        <Link
                          to={`/user-profile/${item.userId}`}
                          state={{ project, from: "/client-Review-bids", userId: item.userId }}
                          className="crb-freelancer-link"
                          title="Click to view full freelancer profile & portfolio"
                        >
                          <div className="crb-freelancer-avatar">
                            {item.user_profile ? (
                              <img
                                src={item.user_profile}
                                alt={item.user_name || "Freelancer"}
                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                              />
                            ) : (
                              (item.user_name || item.user_email || "F")[0].toUpperCase()
                            )}
                          </div>
                          <div className="flex-grow-1 min-w-0">
                            <div className="d-flex align-items-center gap-1">
                              <span className="fw-bold text-dark crb-freelancer-name">
                                {item.user_name || "Unnamed Freelancer"}
                              </span>
                              <FaExternalLinkAlt size={10} className="crb-profile-hint text-primary flex-shrink-0" />
                            </div>
                            {item.user_headline ? (
                              <div className="crb-headline text-truncate mb-1">{item.user_headline}</div>
                            ) : (
                              <div className="text-muted small d-flex align-items-center gap-1 mb-1">
                                <FaEnvelope className="flex-shrink-0" />
                                <span className="text-truncate">{item.user_email || "N/A"}</span>
                              </div>
                            )}
                            <div className="crb-meta-tags">
                              {item.user_location && (
                                <span className="crb-meta-tag">
                                  <FaMapMarkerAlt size={9} /> {item.user_location}
                                </span>
                              )}
                              {item.user_rate && (
                                <span className="crb-meta-tag crb-rate-tag">
                                  <FaRupeeSign size={9} /> ₹{item.user_rate}/hr
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Freelancer Skill Badges (if present) */}
                      {skills.length > 0 && (
                        <div className="crb-skills-list mb-3">
                          {skills.slice(0, 3).map((sk, sIdx) => (
                            <span key={sIdx} className="crb-skill-badge">
                              {sk}
                            </span>
                          ))}
                          {skills.length > 3 && (
                            <span className="crb-skill-badge text-muted bg-light">
                              +{skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Bid Amount */}
                      <div className="crb-amount-box mb-3">
                        <span className="crb-amount-label">Bid Amount</span>
                        <span className="crb-amount-value">₹ {item.amount || "—"}</span>
                      </div>

                      {/* Proposal Message / Cover Letter */}
                      {item.message ? (
                        <div className="crb-proposal-card mb-3">
                          <FaQuoteLeft className="crb-quote-icon" />
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <span className="d-flex align-items-center gap-1 text-primary fw-semibold small">
                              <FaRegCommentDots /> Freelancer Proposal Pitch
                            </span>
                            <button
                              type="button"
                              className="btn btn-sm text-muted p-0 d-inline-flex align-items-center gap-1 border-0 bg-transparent"
                              style={{ fontSize: '0.72rem' }}
                              title="Copy pitch message"
                              onClick={() => handleCopy(item.message)}
                            >
                              <FaCopy style={{ fontSize: '0.7rem' }} /> Copy
                            </button>
                          </div>
                          <p className="crb-proposal-text">
                            {expandedBids[item._id || idx] || item.message.length <= 110
                              ? `"${item.message}"`
                              : `"${item.message.slice(0, 110)}..."`}
                          </p>
                          {item.message.length > 110 && (
                            <button
                              type="button"
                              className="crb-toggle-text-btn"
                              onClick={() => toggleExpand(item._id || idx)}
                            >
                              {expandedBids[item._id || idx] ? 'Show less ▴' : 'Read full message ▾'}
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="crb-proposal-empty mb-3">
                          <FaRegCommentDots className="text-muted flex-shrink-0 fs-6" />
                          <span>No custom pitch message provided with this bid.</span>
                        </div>
                      )}

                      {/* Profile Inspection Actions */}
                      <div className="d-flex gap-2 mb-3">
                        <Link
                          to={`/user-profile/${item.userId}`}
                          state={{ project, from: "/client-Review-bids", userId: item.userId }}
                          className="btn btn-outline-primary btn-sm flex-fill d-inline-flex align-items-center justify-content-center gap-2 fw-semibold crb-view-profile-btn py-2"
                          title="Open full freelancer profile with reviews, portfolio & stats"
                        >
                          <FaUser size={12} /> View Profile <FaExternalLinkAlt size={10} style={{ opacity: 0.7 }} />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-light btn-sm border d-inline-flex align-items-center justify-content-center gap-1 text-secondary crb-preview-btn px-3 py-2"
                          onClick={() => setPreviewFreelancer(item)}
                          title="Quick preview bio, skills & rate without navigating away"
                        >
                          <FaEye size={13} /> Quick View
                        </button>
                      </div>

                      {/* Status */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted small fw-medium">Status</span>
                        <span className={`bids-badge ${badge.cls}`}>
                          {badge.icon} {badge.label}
                        </span>
                      </div>

                      {/* Actions: Shown only when proposal is pending (disappears on accept or reject) */}
                      {!isAccepted && !isRejected && (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                            disabled={isActioning}
                            onClick={() => handleStatus("accept", item.userId)}
                          >
                            {isActioning ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <><FaCheck /> Accept</>
                            )}
                          </button>
                          <button
                            className="btn btn-danger btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                            disabled={isActioning}
                            onClick={() => handleStatus("reject", item.userId)}
                          >
                            {isActioning ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <><FaTimes /> Reject</>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Chat with Freelancer (Available once accepted; accept/reject buttons disappear) */}
                      {isAccepted && (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold rounded-pill shadow-sm py-2"
                          onClick={() => setChatPartner(item)}
                        >
                          <FaComments className="fs-6" /> Chat with Freelancer
                        </button>
                      )}

                      {/* Rejected status notice (once rejected; accept/reject buttons disappear) */}
                      {isRejected && (
                        <div
                          className="text-center py-2 px-3 text-danger small fw-semibold rounded-pill d-flex align-items-center justify-content-center gap-2"
                          style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2' }}
                        >
                          <FaTimesCircle className="text-danger" /> Proposal Rejected
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-muted small mt-4 mb-0">
              Showing <strong>{filtered.length}</strong> of <strong>{total}</strong> proposal{total > 1 ? "s" : ""}
            </p>
          </>
        )}
      </div>

      {/* Quick Profile Preview Modal */}
      {previewFreelancer && (
        <div
          className="crb-modal-backdrop"
          onClick={() => setPreviewFreelancer(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="crb-modal-box p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-3">
              <div className="d-flex align-items-center gap-2">
                <FaUser className="text-primary fs-5" />
                <h5 className="modal-title fw-bold mb-0 text-dark">Freelancer Profile Snapshot</h5>
              </div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setPreviewFreelancer(null)}
              />
            </div>

            {/* Profile Header */}
            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4 mb-3">
              <div
                className="crb-freelancer-avatar flex-shrink-0"
                style={{ width: "60px", height: "60px", fontSize: "1.4rem" }}
              >
                {previewFreelancer.user_profile ? (
                  <img
                    src={previewFreelancer.user_profile}
                    alt={previewFreelancer.user_name || "Freelancer"}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                  />
                ) : (
                  (previewFreelancer.user_name || previewFreelancer.user_email || "F")[0].toUpperCase()
                )}
              </div>
              <div className="flex-grow-1 min-w-0">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h5 className="fw-bold text-dark mb-0">
                    {previewFreelancer.user_name || "Unnamed Freelancer"}
                  </h5>
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
                    ● Verified
                  </span>
                </div>
                <div className="text-primary fw-medium small mb-1">
                  {previewFreelancer.user_headline || "Freelance Specialist"}
                </div>
                <div className="d-flex flex-wrap gap-3 small text-muted">
                  {previewFreelancer.user_location && (
                    <span className="d-flex align-items-center gap-1">
                      <FaMapMarkerAlt /> {previewFreelancer.user_location}
                    </span>
                  )}
                  {previewFreelancer.user_email && (
                    <span className="d-flex align-items-center gap-1">
                      <FaEnvelope /> {previewFreelancer.user_email}
                    </span>
                  )}
                  {previewFreelancer.user_phone && (
                    <span className="d-flex align-items-center gap-1">
                      <FaPhoneAlt /> {previewFreelancer.user_phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats / Numbers Cards */}
            <div className="row g-2 mb-3">
              <div className="col-4">
                <div className="p-2 border rounded-3 text-center bg-white">
                  <div className="small text-muted fw-semibold" style={{ fontSize: "0.72rem" }}>HOURLY RATE</div>
                  <div className="fw-bold text-success fs-6 mt-1">
                    {previewFreelancer.user_rate ? `₹${previewFreelancer.user_rate}/hr` : "Flexible"}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2 border rounded-3 text-center bg-white">
                  <div className="small text-muted fw-semibold" style={{ fontSize: "0.72rem" }}>PROJECT BID</div>
                  <div className="fw-bold text-dark fs-6 mt-1">
                    ₹{previewFreelancer.amount || "—"}
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2 border rounded-3 text-center bg-white">
                  <div className="small text-muted fw-semibold" style={{ fontSize: "0.72rem" }}>PROPOSAL STATUS</div>
                  <div className="fw-bold text-capitalize fs-6 mt-1" style={{ color: normalise(previewFreelancer.status) === 'accepted' ? '#16a34a' : normalise(previewFreelancer.status) === 'rejected' ? '#dc2626' : '#d97706' }}>
                    {normalise(previewFreelancer.status)}
                  </div>
                </div>
              </div>
            </div>

            {/* About / Bio */}
            <div className="mb-3">
              <h6 className="fw-bold text-dark small text-uppercase mb-2" style={{ letterSpacing: "0.5px" }}>
                About Freelancer
              </h6>
              <div className="p-3 bg-light rounded-3 text-secondary small" style={{ lineHeight: "1.6" }}>
                {previewFreelancer.user_bio
                  ? previewFreelancer.user_bio
                  : "This freelancer has not added a detailed bio yet. You can inspect their completed projects, skills, and portfolio on their full profile page."}
              </div>
            </div>

            {/* Skills */}
            {previewFreelancer.user_skill && (
              <div className="mb-3">
                <h6 className="fw-bold text-dark small text-uppercase mb-2" style={{ letterSpacing: "0.5px" }}>
                  Skills & Expertise
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {previewFreelancer.user_skill
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((sk, sIdx) => (
                      <span key={sIdx} className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-medium">
                        {sk}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Project Pitch Message */}
            {previewFreelancer.message && (
              <div className="mb-4">
                <h6 className="fw-bold text-dark small text-uppercase mb-2" style={{ letterSpacing: "0.5px" }}>
                  Bid Proposal Pitch for This Project
                </h6>
                <div className="p-3 border rounded-3 bg-white text-dark small fst-italic" style={{ borderLeft: "4px solid #4f46e5" }}>
                  "{previewFreelancer.message}"
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-3 border-top">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm px-3 rounded-pill"
                onClick={() => setPreviewFreelancer(null)}
              >
                Close Snapshot
              </button>
              <div className="d-flex align-items-center gap-2">
                {(normalise(previewFreelancer.status) === 'accepted' || normalise(previewFreelancer.status) === 'accept') && (
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm px-3 rounded-pill d-inline-flex align-items-center gap-1"
                    onClick={() => {
                      const partner = previewFreelancer;
                      setPreviewFreelancer(null);
                      setChatPartner(partner);
                    }}
                  >
                    <FaComments /> Direct Chat
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary btn-sm px-4 rounded-pill fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                  onClick={() => {
                    const targetId = previewFreelancer.userId;
                    setPreviewFreelancer(null);
                    navigate(`/user-profile/${targetId}`, {
                      state: { project, from: "/client-Review-bids", userId: targetId }
                    });
                  }}
                >
                  <FaExternalLinkAlt size={12} /> Open Full Profile & Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {chatPartner && (
        <ChatModal
          show={Boolean(chatPartner)}
          onClose={() => setChatPartner(null)}
          projectId={project?._id}
          projectTitle={project?.title}
          bidId={chatPartner?._id}
          partnerName={chatPartner?.user_name || chatPartner?.user_email || 'Freelancer'}
          partnerRole="Freelancer"
          receiverId={chatPartner?.userId}
          currentUserId={clientInfo?._id || clientInfo?.id || project?.clientId || project?.client}
          currentUserName={clientInfo?.name || 'Client'}
          currentUserRole="client"
        />
      )}
    </div>
  );
};

export default ClientReviewBids;