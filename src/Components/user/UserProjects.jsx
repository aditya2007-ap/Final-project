import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaBriefcase, FaClock, FaTag, FaCalendarAlt, FaPaperPlane, FaGavel, FaRegCommentDots, FaShieldAlt, FaCheckCircle, FaBan, FaCoins, FaLock } from 'react-icons/fa';
import Aos from 'aos';

const UserProjects = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [userBids, setUserBids] = useState([])
  const [isUserBlocked, setIsUserBlocked] = useState(false)
  const [userCredits, setUserCredits] = useState(0)
  const [projectId, setProjectId] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [filterTab, setFilterTab] = useState('all') // 'all', 'open', 'closed'
  const [searchTerm, setSearchTerm] = useState('')
  const [activeBidProject, setActiveBidProject] = useState(null)
  const [userInfo, setUserInfo] = useState(() => {
    try { return JSON.parse(localStorage.getItem('info')) || null } catch { return null }
  })

  const isProjectClosed = (item) => item?.status === 'closed' || item?.status === true || item?.status === 'completed';

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const info = (() => {
      try {
        return JSON.parse(localStorage.getItem('info')) || null;
      } catch {
        return null;
      }
    })();
    const userId = info?._id;

    try {
      const res = await axios.get('http://localhost:9000/user-projects-list')
      const visibleProjects = (res?.data?.result || []).filter(
        (item) => item?.status !== 'rejected by admin' && item?.status !== 'rejected'
      )
      setData(visibleProjects)

      if (userId) {
        // Check fresh user status to verify if blocked and fetch credit balance
        try {
          const profileRes = await axios.get(`http://localhost:9000/get-profile?userId=${userId}`);
          if (profileRes?.data?.result) {
            const u = profileRes.data.result;
            const blocked = u.status === 'blocked' || u.status === false || u.status === 'false';
            setIsUserBlocked(blocked);
            const freshCredits = parseInt(u.credit) || 0;
            setUserCredits(freshCredits);
            try {
              const merged = { ...info, ...u, credit: freshCredits };
              localStorage.setItem('info', JSON.stringify(merged));
              setUserInfo(merged);
            } catch (err) {
              console.error(err);
            }
          }
        } catch (e) {
          console.error(e);
        }

        const bidsRes = await axios.get(`http://localhost:9000/user-get-bids?userId=${userId}`);
        setUserBids(bidsRes?.data?.result || []);
      }
    } catch (err) {
      console.error(err)
      setData([])
    } finally {
      setTimeout(() => {
        Aos.refreshHard()
      }, 100)
    }
  }

  const handleStartBid = (targetProjectOrId) => {
    const targetProject = typeof targetProjectOrId === 'object' && targetProjectOrId !== null
      ? targetProjectOrId
      : data.find((p) => p._id === targetProjectOrId);

    if (!targetProject) return;

    if (isProjectClosed(targetProject)) {
      Swal.fire({
        title: 'Project Closed',
        text: 'This project has already been awarded to a freelancer and is closed for new bids.',
        icon: 'info'
      });
      return;
    }

    if (isUserBlocked) {
      Swal.fire({
        title: 'Account Blocked',
        text: 'Your account has been blocked by the admin. You cannot place bids on any projects.',
        icon: 'error',
        confirmButtonColor: '#dc2626'
      });
      return;
    }

    if (userCredits <= 0) {
      Swal.fire({
        title: 'Bidding Credits Required',
        html: `<div class="text-start" style="font-size: 0.94rem; color: #374151;">
          <p class="mb-2">You currently have <strong class="text-danger">0 bidding credits</strong>.</p>
          <div class="p-3 bg-light rounded-3 border mb-3">
            <p class="small text-muted mb-0">Only freelancers who have purchased a credit plan can place bids on client projects. Please purchase a plan to unlock bidding.</p>
          </div>
          <p class="small text-secondary mb-0">Would you like to visit the plans page and top up your credits now?</p>
        </div>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4f46e5',
        cancelButtonColor: '#64748b',
        confirmButtonText: '⚡ Purchase Bidding Plan',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/user-plans');
        }
      });
      return;
    }

    setActiveBidProject(targetProject);
    setProjectId(targetProject._id);
    setAmount(targetProject.budget ? String(targetProject.budget) : '');
    setMessage('');
  }

  const handlePostBid = async () => {
    const targetProject = data.find((p) => p._id === projectId);
    if (targetProject && isProjectClosed(targetProject)) {
      Swal.fire({
        title: 'Project Closed',
        text: 'This project has already been awarded and is closed for new bids.',
        icon: 'info'
      });
      return;
    }

    if (isUserBlocked) {
      Swal.fire({
        title: 'Account Blocked',
        text: 'Your account has been blocked by the admin. You cannot place bids on any projects.',
        icon: 'error',
        confirmButtonColor: '#dc2626'
      });
      return;
    }

    if (userCredits <= 0) {
      Swal.fire({
        title: 'Credits Required',
        text: 'You do not have bidding credits. Redirecting you to bidding plans...',
        icon: 'warning',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/user-plans');
      });
      return;
    }

    const info = JSON.parse(localStorage.getItem('info'));
    const userId = info?._id;
    if (!amount) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please enter your proposed bid amount.',
        icon: 'error'
      });
      return 0;
    }

    if (targetProject && (targetProject.status === 'rejected' || targetProject.status === 'rejected by admin')) {
      Swal.fire({
        title: 'Bidding Disabled',
        text: 'This project has been rejected by admin. Bidding is not allowed.',
        icon: 'error'
      });
      return;
    }

    const postData = { userId, projectId, amount, message };
    try {
      const res = await axios.post('http://localhost:9000/user-create-bids', postData);
      if (res?.data?.success === true) {
        Swal.fire({
          title: 'Bid Submitted!',
          html: `<div style="font-size: 0.95rem; color: #374151;">
            <p class="mb-2">${res?.data?.message || 'Your proposal and bid have been submitted to the client.'}</p>
            <p class="small text-muted mb-0">1 credit was deducted. Remaining balance: <strong>${res?.data?.remainingCredits ?? Math.max(0, userCredits - 1)} credits</strong>.</p>
          </div>`,
          icon: 'success'
        });
        setUserCredits(prev => Math.max(0, prev - 1));
        setActiveBidProject(null);
        setProjectId('');
        setAmount('');
        setMessage('');
        await fetchData();
      } else {
        if (res?.data?.redirectToPlans || res?.data?.code === 403 || (res?.data?.code === 400 && res?.data?.message?.toLowerCase().includes('credit'))) {
          Swal.fire({
            title: 'Credit Plan Required',
            text: res?.data?.message || 'You do not have sufficient bidding credits. Please purchase a plan.',
            icon: 'warning',
            confirmButtonText: '⚡ View Plans',
            confirmButtonColor: '#4f46e5'
          }).then(() => {
            navigate('/user-plans');
          });
        } else {
          Swal.fire({
            title: 'Bidding Notice',
            text: res?.data?.message || 'Bidding failed',
            icon: 'error'
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to place bid. Please try again.',
        icon: 'error'
      });
    }
  }

  return (
    <div className="container py-5">
      {/* Blocked by Admin Alert Banner */}
      {isUserBlocked && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 rounded-4 shadow-sm mb-4 border-danger" data-aos="fade-down">
          <div className="d-flex align-items-center gap-3">
            <FaBan className="fs-2 text-danger flex-shrink-0" />
            <div>
              <h6 className="alert-heading fw-bold mb-1 text-danger">Bidding Suspended: Account Blocked by Admin</h6>
              <p className="small mb-0 text-dark">
                Your freelancer account has been restricted by the administration. You cannot place bids or submit proposals.
              </p>
            </div>
          </div>
          <span className="badge bg-danger text-white px-3 py-2 rounded-pill fw-bold">BLOCKED</span>
        </div>
      )}

      {/* Header Section */}
      <div className="row align-items-center mb-4 g-3" data-aos="fade-down">
        <div className="col-md-7">
          <span className="badge bg-primary mb-2 px-3 py-2 rounded-pill fw-bold text-uppercase">
            Zentora Freelance Jobs
          </span>
          <h2 className="display-6 fw-bold mb-2 text-dark">Explore Live Projects</h2>
          <p className="text-secondary lead fs-6 m-0">
            Browse open project scopes posted by global clients, evaluate requirements, and submit competitive proposal bids.
          </p>
          <div className="mt-2 text-muted small fw-semibold d-flex align-items-center gap-2 flex-wrap">
            <span>{data.length} {data.length === 1 ? 'project' : 'projects'} total</span>
            <span>•</span>
            {userCredits > 0 ? (
              <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill fw-bold d-inline-flex align-items-center gap-1">
                <FaCoins className="text-warning" /> {userCredits} Bidding Credit{userCredits > 1 ? 's' : ''} Available
              </span>
            ) : (
              <span
                className="badge bg-warning-subtle text-warning-emphasis border border-warning px-3 py-1 rounded-pill fw-bold d-inline-flex align-items-center gap-1"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/user-plans')}
                title="Click to view and purchase credit plans"
              >
                ⚠️ 0 Credits (Plan Required to Bid)
              </span>
            )}
          </div>
        </div>
        <div className="col-md-5 text-md-end">
          <button
            type="button"
            className="btn btn-outline-primary fw-bold px-4 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2"
            onClick={() => navigate('/user-plans')}
          >
            <FaCoins className="text-warning" /> Buy Credits / View Plans
          </button>
        </div>
      </div>

      {/* ── Search & Filter Toolbar ── */}
      {(() => {
        const openCount = data.filter((p) => !isProjectClosed(p)).length;
        const closedCount = data.filter((p) => isProjectClosed(p)).length;

        return (
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 p-3 bg-white rounded-4 shadow-sm border" data-aos="fade-up">
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 fw-bold ${filterTab === 'all' ? 'btn-primary shadow-sm' : 'btn-light border text-secondary'}`}
                onClick={() => setFilterTab('all')}
              >
                All Projects ({data.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-1 ${filterTab === 'open' ? 'btn-success text-white shadow-sm' : 'btn-light border text-secondary'}`}
                onClick={() => setFilterTab('open')}
              >
                <FaBriefcase size={12} /> Open Contracts ({openCount})
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill px-3 fw-bold d-inline-flex align-items-center gap-1 ${filterTab === 'closed' ? 'btn-secondary text-white shadow-sm' : 'btn-light border text-secondary'}`}
                onClick={() => setFilterTab('closed')}
              >
                <FaLock size={11} /> Closed / Awarded ({closedCount})
              </button>
            </div>
            <div className="input-group" style={{ maxWidth: '280px' }}>
              <span className="input-group-text bg-light border-end-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <input
                type="text"
                className="form-control form-control-sm bg-light border-start-0"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        );
      })()}

      {/* Grid of Projects */}
      <div className="row g-4">
        {(() => {
          const filteredProjects = data.filter((item) => {
            const closed = isProjectClosed(item);
            if (filterTab === 'open' && closed) return false;
            if (filterTab === 'closed' && !closed) return false;

            if (searchTerm) {
              const q = searchTerm.toLowerCase();
              const matchTitle = (item?.title || '').toLowerCase().includes(q);
              const matchDesc = (item?.description || item?.desc || '').toLowerCase().includes(q);
              return matchTitle || matchDesc;
            }
            return true;
          });

          if (!filteredProjects || filteredProjects.length === 0) {
            return (
              <div className="col-12 text-center py-5">
                <div className="p-5 bg-white rounded-4 shadow-sm border">
                  <FaBriefcase className="text-muted fs-1 mb-3" />
                  <h5 className="text-muted fw-bold">
                    {filterTab === 'closed' ? 'No closed projects found' : filterTab === 'open' ? 'No open contracts currently available' : 'No projects found'}
                  </h5>
                  <p className="text-secondary small m-0">
                    {searchTerm ? `No results match your search "${searchTerm}".` : 'Check back later for newly posted client opportunities.'}
                  </p>
                </div>
              </div>
            );
          }

          return filteredProjects.map((item, index) => {
            const isClosed = isProjectClosed(item);
            const existingBid = userBids.find(b => String(b.projectId) === String(item?._id));
            const isAlreadySubmitted = Boolean(existingBid);
            const isMyBidAccepted = existingBid && (existingBid.status === 'accepted' || existingBid.status === 'accept');

            return (
              <div className="col-lg-6 col-md-12" key={item?._id || index} data-aos="fade-up" data-aos-delay={(index + 1) * 80}>
                <div className={`card h-100 border-0 p-4 rounded-4 shadow-sm project-glass-card ${isClosed ? 'project-card-closed' : ''}`}>
                  <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                        {isClosed ? (
                          <span className="badge bg-secondary text-white px-3 py-1 rounded-pill fw-bold small d-inline-flex align-items-center gap-1 shadow-sm">
                            <FaLock size={10} /> Closed / Awarded
                          </span>
                        ) : (
                          <span className="badge bg-danger-subtle text-danger px-3 py-1 rounded-pill fw-semibold small">
                            <FaBriefcase className="me-1" /> Open Contract
                          </span>
                        )}
                        {isMyBidAccepted ? (
                          <span className="badge bg-success text-white px-3 py-1 rounded-pill fw-bold small d-inline-flex align-items-center gap-1 shadow-sm">
                            <FaCheckCircle /> Your Bid Was Accepted! 🎉
                          </span>
                        ) : isAlreadySubmitted ? (
                          <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill fw-bold small d-inline-flex align-items-center gap-1 shadow-sm">
                            <FaCheckCircle className="text-success" /> Already Submitted
                          </span>
                        ) : null}
                      </div>
                      <h4 className="fw-bold text-dark mb-1 project-title">{item.title}</h4>
                      {/* Client Info with Avatar */}
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <div
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            background: '#e0e7ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            color: '#4338ca',
                            flexShrink: 0
                          }}
                        >
                          {item.clientProfile ? (
                            <img
                              src={item.clientProfile}
                              alt={item.clientName || 'Client'}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            (item.clientName || 'C')[0].toUpperCase()
                          )}
                        </div>
                        <span className="small text-muted fw-semibold text-truncate" style={{ fontSize: '0.78rem' }}>
                          Client: {item.clientName || 'Hiring Employer'}
                        </span>
                      </div>
                    </div>
                    <div className="text-end flex-shrink-0">
                      <span className="fs-4 fw-bold text-success d-block">₹{item.budget}</span>
                      <small className="text-muted fw-semibold">Budget</small>
                    </div>
                  </div>

                  <p className="text-secondary small mb-4 project-desc flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description || item.desc || 'No detailed description provided by the client.'}
                  </p>

                  <div className="d-flex flex-wrap align-items-center justify-content-between pt-3 border-top gap-3 mt-auto">
                    <div className="d-flex align-items-center gap-3 text-muted small">
                      <span className="d-flex align-items-center gap-1">
                        <FaClock className="text-primary" /> {item.timeline || item.duration || item.time || 'Flexible'}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <FaCalendarAlt className="text-warning" /> 
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>

                    {isClosed ? (
                      isMyBidAccepted ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-success fw-bold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
                          onClick={() => navigate('/user-bids')}
                        >
                          <FaCheckCircle /> View Accepted Contract
                        </button>
                      ) : isAlreadySubmitted ? (
                        <span className="badge bg-light text-muted border px-3 py-2 rounded-pill small fw-medium d-inline-flex align-items-center gap-1">
                          <FaLock size={11} className="text-muted" /> Contract Awarded (Closed)
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary fw-semibold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2"
                          disabled
                          style={{ cursor: 'not-allowed', opacity: 0.75 }}
                          title="This project has been awarded and is closed for new bids"
                        >
                          <FaLock size={11} /> Project Closed
                        </button>
                      )
                    ) : isAlreadySubmitted ? (
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-light border border-success-subtle text-success fw-bold px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
                          disabled
                          style={{ cursor: 'not-allowed', background: '#f0fdf4' }}
                        >
                          <FaCheckCircle className="text-success" /> Already Submitted
                        </button>
                      </div>
                    ) : isUserBlocked ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger fw-semibold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
                        onClick={() => {
                          Swal.fire({
                            title: 'Account Blocked by Admin',
                            text: 'Your account has been blocked by the admin. You cannot place bids on any projects.',
                            icon: 'error',
                            confirmButtonColor: '#dc2626'
                          });
                        }}
                      >
                        <FaBan /> Blocked by Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartBid(item)}
                        type="button"
                        className={`btn btn-sm ${userCredits > 0 ? 'btn-primary' : 'btn-outline-primary'} fw-bold px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm`}
                        title={userCredits <= 0 ? 'Bidding credits required. Click to view plans.' : 'Submit a proposal bid on this project'}
                      >
                        {userCredits <= 0 ? (
                          <><FaLock /> Place Bid (Plan Required)</>
                        ) : (
                          <><FaGavel /> Place Bid</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          });
        })()}
      </div>

      {/* ── Bidding Pop-up Modal Window ── */}
      {activeBidProject && (
        <div
          className="bid-modal-backdrop"
          onClick={() => { setActiveBidProject(null); setProjectId(''); setAmount(''); setMessage(''); }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bid-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bid-modal-header d-flex align-items-center justify-content-between p-4 border-bottom">
              <div>
                <span className="badge bg-primary-subtle text-primary rounded-pill mb-1 fw-bold" style={{ fontSize: '0.72rem' }}>
                  ⚡ Proposal Submission
                </span>
                <h5 className="modal-title fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                  <FaPaperPlane className="text-primary" /> {activeBidProject.title}
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => { setActiveBidProject(null); setProjectId(''); setAmount(''); setMessage(''); }}
                aria-label="Close"
              />
            </div>

            {/* Modal Body */}
            <div className="bid-modal-body p-4" style={{ maxHeight: 'calc(85vh - 140px)', overflowY: 'auto' }}>
              {/* Project & Client Summary Card */}
              <div className="p-3 rounded-4 mb-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        background: '#e0e7ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#4338ca',
                        flexShrink: 0
                      }}
                    >
                      {activeBidProject.clientProfile ? (
                        <img
                          src={activeBidProject.clientProfile}
                          alt={activeBidProject.clientName || 'Client'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        (activeBidProject.clientName || 'C')[0].toUpperCase()
                      )}
                    </div>
                    <div>
                      <span className="fw-bold text-dark small d-block">{activeBidProject.clientName || 'Client'}</span>
                      <span className="text-muted" style={{ fontSize: '0.72rem' }}>Hiring Employer</span>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="fs-5 fw-bold text-success">₹{activeBidProject.budget}</span>
                    <span className="text-muted d-block" style={{ fontSize: '0.72rem' }}>Client Budget</span>
                  </div>
                </div>
                <p className="text-secondary small mb-0" style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                  {activeBidProject.description || activeBidProject.desc || 'No detailed description provided.'}
                </p>
              </div>

              {/* Bidding Freelancer Identity Card (with DP) */}
              <div className="d-flex align-items-center gap-3 p-3 rounded-4 mb-3" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.06), rgba(99,102,241,0.08))', border: '1px solid rgba(99,102,241,0.2)' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    border: '2px solid #6366f1',
                    boxShadow: '0 2px 8px rgba(99,102,241,0.2)'
                  }}
                >
                  {userInfo?.profile ? (
                    <img
                      src={userInfo.profile}
                      alt={userInfo?.name || 'Freelancer'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    (userInfo?.name || 'U')[0].toUpperCase()
                  )}
                </div>
                <div className="flex-grow-1 min-w-0">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold text-dark">{userInfo?.name || 'Freelancer'}</span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill" style={{ fontSize: '0.68rem' }}>
                      ● Verified Talent
                    </span>
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.76rem' }}>
                    Your profile picture, portfolio &amp; ratings will be attached to this bid proposal
                  </div>
                </div>
              </div>

              {/* Proposed Budget */}
              <div className="mb-3">
                <label className="form-label small text-secondary mb-1 fw-semibold d-flex justify-content-between">
                  <span>Your Proposed Budget (INR) *</span>
                  <span className="text-muted fw-normal" style={{ fontSize: '0.75rem' }}>
                    Client expects around: ₹{activeBidProject.budget}
                  </span>
                </label>
                <div className="bid-input-container">
                  <span className="bid-currency-symbol">₹</span>
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    type="number"
                    className="form-control rounded-3 bg-white bid-amount-field"
                    placeholder="e.g. 20000"
                    autoFocus
                  />
                </div>
              </div>

              {/* Proposal Message Section */}
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label small text-secondary mb-0 fw-semibold d-flex align-items-center gap-1">
                    <FaRegCommentDots className="text-primary" /> Proposal Message / Cover Pitch
                  </label>
                  <span className="bid-privacy-badge">
                    <FaShieldAlt style={{ fontSize: '0.65rem' }} /> Client Only
                  </span>
                </div>

                <textarea
                  rows="4"
                  className="form-control rounded-3 bid-textarea-field"
                  placeholder="Explain why you are the best fit, your approach, tech stack, and estimated delivery milestones..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                {/* Quick Pitch Starter Chips */}
                <div className="bid-quick-chips-wrapper mt-2">
                  <span className="text-muted" style={{ fontSize: '0.72rem', alignSelf: 'center', marginRight: '2px' }}>
                    ⚡ Quick add:
                  </span>
                  <button
                    type="button"
                    className="bid-quick-chip"
                    onClick={() => setMessage(prev => prev ? `${prev} I have hands-on experience delivering similar projects with clean architecture.` : 'I have hands-on experience delivering similar projects with clean architecture.')}
                  >
                    💼 Relevant Experience
                  </button>
                  <button
                    type="button"
                    className="bid-quick-chip"
                    onClick={() => setMessage(prev => prev ? `${prev} I can guarantee fast turnaround and regular milestone updates.` : 'I can guarantee fast turnaround and regular milestone updates.')}
                  >
                    ⚡ Fast Delivery
                  </button>
                  <button
                    type="button"
                    className="bid-quick-chip"
                    onClick={() => setMessage(prev => prev ? `${prev} I provide complete post-launch support and free revisions.` : 'I provide complete post-launch support and free revisions.')}
                  >
                    🤝 Full Support
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <small className="text-muted" style={{ fontSize: '0.72rem' }}>
                    🔒 Kept private between you and this hiring client.
                  </small>
                  <small className="text-muted fw-semibold" style={{ fontSize: '0.72rem' }}>
                    {message.length} character{message.length !== 1 ? 's' : ''}
                  </small>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bid-modal-footer d-flex align-items-center justify-content-between p-3 px-4 border-top bg-light rounded-bottom-4">
              <div className="small text-muted d-flex align-items-center gap-1">
                <FaCoins className="text-warning" /> 1 bidding credit used per proposal
              </div>
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="btn btn-light border px-4 rounded-pill text-secondary fw-semibold"
                  onClick={() => { setActiveBidProject(null); setProjectId(''); setAmount(''); setMessage(''); }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostBid}
                  type="button"
                  className="btn btn-primary fw-bold px-4 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
                >
                  <FaPaperPlane /> Submit Bid &amp; Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProjects
