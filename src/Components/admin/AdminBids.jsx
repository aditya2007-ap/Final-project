import React, { useEffect, useState, useMemo } from 'react'
import {
  FaGavel, FaCheck, FaTimes, FaSearch,
  FaRegCheckCircle, FaTimesCircle, FaHourglassHalf,
  FaUser, FaBriefcase, FaRupeeSign, FaCalendarAlt, FaClock,
  FaSyncAlt, FaChevronDown, FaChevronUp, FaTrophy, FaLayerGroup
} from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

/* ─── helpers ─────────────────────────────────────────────── */
const normalise = (s) => (s || 'pending').toLowerCase()

const isAccepted = (s) => ['accept', 'accepted'].includes(normalise(s))
const isRejected = (s) => ['reject', 'rejected'].includes(normalise(s))

const statusBadge = (s) => {
  if (isAccepted(s)) return { cls: 'badge-accept', label: 'Accepted', icon: <FaRegCheckCircle /> }
  if (isRejected(s)) return { cls: 'badge-reject', label: 'Rejected', icon: <FaTimesCircle /> }
  return { cls: 'badge-pending', label: 'Pending', icon: <FaHourglassHalf /> }
}

/* ─── Stat Card ──────────────────────────────────────────── */
const StatCard = ({ icon, label, value, accent }) => (
  <div className="col-6 col-md-3" data-aos="fade-up">
    <div className="bids-stat-card" style={{ '--accent': accent }}>
      <div className="bids-stat-icon">{icon}</div>
      <div className="bids-stat-value">{value}</div>
      <div className="bids-stat-label">{label}</div>
    </div>
  </div>
)

/* ─── Single Bidder Row inside a project group ───────────── */
const BidderRow = ({ item, rank, onAction, actionLoading }) => {
  const badge = statusBadge(item.status)
  const busy  = actionLoading === item._id
  return (
    <div className={`abg-bidder-row ${isAccepted(item.status) ? 'abg-row-accepted' : isRejected(item.status) ? 'abg-row-rejected' : ''}`}>
      {/* rank */}
      <div className="abg-rank">#{rank}</div>

      {/* avatar + name */}
      <div className="abg-bidder-identity">
        <div className={`abg-avatar ${isAccepted(item.status) ? 'abg-avatar-accepted' : ''}`}>
          {(item.freelancerName || 'F')[0].toUpperCase()}
        </div>
        <div>
          <div className="abg-freelancer-name">{item.freelancerName || 'Unknown'}</div>
          <div className="abg-bid-date text-muted">
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
              : 'N/A'}
          </div>
        </div>
      </div>

      {/* amount */}
      <div className="abg-amount">
        <span className="abg-amount-label">Bid</span>
        <span className="abg-amount-value">₹{item.amount || '—'}</span>
      </div>

      {/* status badge */}
      <div className="abg-status">
        <span className={`bids-badge ${badge.cls}`}>{badge.icon} {badge.label}</span>
      </div>

      {/* actions */}
      <div className="abg-actions">
        {isAccepted(item.status) ? (
          /* ── Already accepted: show locked label only ── */
          <span className="abg-action-locked abg-action-locked-accepted">
            <FaRegCheckCircle /> Accepted
          </span>
        ) : isRejected(item.status) ? (
          /* ── Already rejected: show locked label only ── */
          <span className="abg-action-locked abg-action-locked-rejected">
            <FaTimesCircle /> Rejected
          </span>
        ) : (
          /* ── Pending: show both buttons ── */
          <>
            <button
              className="btn btn-sm btn-success d-flex align-items-center gap-1"
              disabled={busy}
              onClick={() => onAction(item._id, 'accept')}
              title="Accept this bid"
            >
              {busy ? <span className="spinner-border spinner-border-sm" /> : <><FaCheck /> Accept</>}
            </button>
            <button
              className="btn btn-sm btn-danger d-flex align-items-center gap-1"
              disabled={busy}
              onClick={() => onAction(item._id, 'reject')}
              title="Reject this bid"
            >
              {busy ? <span className="spinner-border spinner-border-sm" /> : <><FaTimes /> Reject</>}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── Project Group Card ─────────────────────────────────── */
const ProjectGroup = ({ projectTitle, clientName, bids, onAction, actionLoading, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen || false)

  const total    = bids.length
  const accepted = bids.filter(b => isAccepted(b.status)).length
  const pending  = bids.filter(b => !isAccepted(b.status) && !isRejected(b.status)).length
  const rejected = bids.filter(b => isRejected(b.status)).length

  /* lowest bid */
  const lowestBid = bids.reduce((min, b) => {
    const amt = parseFloat(b.amount)
    return (!isNaN(amt) && (min === null || amt < min)) ? amt : min
  }, null)

  return (
    <div className={`abg-project-group ${open ? 'abg-group-open' : ''}`} data-aos="fade-up">
      {/* ── Project Header (clickable) ── */}
      <div className="abg-group-header" onClick={() => setOpen(o => !o)}>
        <div className="abg-group-left">
          <div className="abg-project-icon">
            <FaBriefcase />
          </div>
          <div>
            <div className="abg-project-title">{projectTitle}</div>
            <div className="abg-project-client">
              Client: <strong>{clientName || 'N/A'}</strong>
            </div>
          </div>
        </div>

        {/* pills summary */}
        <div className="abg-group-pills">
          <span className="abg-pill abg-pill-total">
            <FaLayerGroup /> {total} bid{total !== 1 ? 's' : ''}
          </span>
          {pending > 0 && (
            <span className="abg-pill abg-pill-pending">
              <FaHourglassHalf /> {pending} Pending
            </span>
          )}
          {accepted > 0 && (
            <span className="abg-pill abg-pill-accepted">
              <FaRegCheckCircle /> {accepted} Accepted
            </span>
          )}
          {rejected > 0 && (
            <span className="abg-pill abg-pill-rejected">
              <FaTimesCircle /> {rejected} Rejected
            </span>
          )}
          {lowestBid !== null && (
            <span className="abg-pill abg-pill-amount">
              <FaTrophy /> Lowest ₹{lowestBid}
            </span>
          )}
        </div>

        {/* chevron */}
        <div className="abg-chevron">
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {/* ── Bidders List (collapsible) ── */}
      {open && (
        <div className="abg-bidders-list">
          {bids.length === 0 ? (
            <div className="text-center py-4 text-muted small">No bids for this project.</div>
          ) : (
            bids.map((bid, idx) => (
              <BidderRow
                key={bid._id}
                item={bid}
                rank={idx + 1}
                onAction={onAction}
                actionLoading={actionLoading}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
const AdminBids = () => {
  const [bids, setBids]             = useState([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [activeTab, setActiveTab]   = useState('all')
  const [actionLoading, setActionLoading] = useState(null)

  useEffect(() => { fetchData() }, [])

  /* ── Fetch ── */
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:9000/admin-bids-list')
      setBids(res?.data?.result || [])
    } catch {
      Swal.fire({ title: 'Error', text: 'Failed to load bids.', icon: 'error' })
    } finally {
      setLoading(false)
    }
  }

  /* ── Accept / Reject ── */
  const handleAction = async (bidId, status) => {
    const action = status === 'accept' ? 'Accept' : 'Reject'
    const confirm = await Swal.fire({
      title: `${action} this bid?`,
      text: `Are you sure you want to ${action.toLowerCase()} this bid?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      confirmButtonColor: status === 'accept' ? '#16a34a' : '#dc2626',
    })
    if (!confirm.isConfirmed) return

    setActionLoading(bidId)
    try {
      const res = await axios.put('http://localhost:9000/admin-bid-action', { bidId, status })
      if (res?.data?.success) {
        await fetchData()
        Swal.fire({ title: 'Done!', text: res.data.message, icon: 'success', timer: 1600, showConfirmButton: false })
      } else {
        Swal.fire({ title: 'Notice', text: res?.data?.message, icon: 'warning' })
      }
    } catch {
      Swal.fire({ title: 'Error', text: 'Server error.', icon: 'error' })
    } finally {
      setActionLoading(null)
    }
  }

  /* ── Global counts ── */
  const total    = bids.length
  const pending  = bids.filter(b => normalise(b.status) === 'pending').length
  const accepted = bids.filter(b => isAccepted(b.status)).length
  const rejected = bids.filter(b => isRejected(b.status)).length
  const projects = useMemo(() => [...new Set(bids.map(b => b.projectId))].length, [bids])

  /* ── Tab filter ── */
  const tabFiltered = useMemo(() => bids.filter(b => {
    if (activeTab === 'pending')  return normalise(b.status) === 'pending'
    if (activeTab === 'accepted') return isAccepted(b.status)
    if (activeTab === 'rejected') return isRejected(b.status)
    return true
  }), [bids, activeTab])

  /* ── Search filter ── */
  const searchFiltered = useMemo(() => tabFiltered.filter(b => {
    const q = search.toLowerCase()
    return (
      (b.projectTitle   && b.projectTitle.toLowerCase().includes(q))   ||
      (b.freelancerName && b.freelancerName.toLowerCase().includes(q)) ||
      (b.clientName     && b.clientName.toLowerCase().includes(q))
    )
  }), [tabFiltered, search])

  /* ── Group by projectId ── */
  const grouped = useMemo(() => {
    const map = new Map()
    searchFiltered.forEach(bid => {
      const key = bid.projectId || bid.projectTitle || 'unknown'
      if (!map.has(key)) {
        map.set(key, {
          projectTitle: bid.projectTitle || 'Unknown Project',
          clientName:   bid.clientName   || 'N/A',
          bids: []
        })
      }
      map.get(key).bids.push(bid)
    })
    return [...map.values()]
  }, [searchFiltered])

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <div className="admin-dashboard-wrapper py-5">
      <div className="container">

        {/* ── Page Header ── */}
        <div className="row mb-4" data-aos="fade-down">
          <div className="col-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <div className="dash-eyebrow">ZENTORA ADMIN</div>
              <h1 className="dash-heading d-flex align-items-center gap-3 mb-1">
                <FaGavel className="text-color1" />
                Bidding &amp; Proposal Monitoring
              </h1>
              <p className="admin-lead mb-0">
                Proposals are grouped by project. Expand any project to compare competing freelancers and inspect submitted rates.
              </p>
            </div>
            <button
              className="action-btn action-btn-block"
              onClick={fetchData}
              disabled={loading}
            >
              <FaSyncAlt className={loading ? 'spin-icon' : ''} />
              {loading ? 'Refreshing…' : 'Refresh Bids'}
            </button>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="row g-3 mb-4">
          <StatCard icon={<FaLayerGroup />}       label="Projects with Bids" value={projects}  accent="#e65100" />
          <StatCard icon={<FaGavel />}            label="Total Bids"         value={total}     accent="#ff5722" />
          <StatCard icon={<FaHourglassHalf />}    label="Pending"            value={pending}   accent="#6a1b9a" />
          <StatCard icon={<FaRegCheckCircle />}   label="Accepted"           value={accepted}  accent="#10b981" />
        </div>

        {/* ── Main Card ── */}
        <div className="admin-main-card" data-aos="fade-up" data-aos-duration="800">

          {/* Toolbar */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            {/* Tabs */}
            <div className="bids-tabs">
              {[
                { key: 'all',      label: 'All Bids', count: total    },
                { key: 'pending',  label: 'Pending',  count: pending  },
                { key: 'accepted', label: 'Accepted', count: accepted },
                { key: 'rejected', label: 'Rejected', count: rejected },
              ].map(t => (
                <button
                  key={t.key}
                  className={`bids-tab-btn ${activeTab === t.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label}
                  <span className="bids-tab-count">{t.count}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="admin-search-wrapper">
              <FaSearch className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search project or freelancer…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status" />
              <p className="mt-3 text-muted">Loading bids…</p>
            </div>
          ) : grouped.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <FaGavel style={{ fontSize: '2.5rem', opacity: 0.2 }} className="mb-3 d-block mx-auto text-color1" />
              <h6>No bids found{search ? ` for "${search}"` : ''}.</h6>
            </div>
          ) : (
            <div className="abg-groups-container">
              {grouped.map((group, idx) => (
                <ProjectGroup
                  key={group.projectTitle + idx}
                  projectTitle={group.projectTitle}
                  clientName={group.clientName}
                  bids={group.bids}
                  onAction={handleAction}
                  actionLoading={actionLoading}
                  defaultOpen={idx === 0}   /* first group open by default */
                />
              ))}
            </div>
          )}

          {/* Footer count */}
          {!loading && grouped.length > 0 && (
            <p className="text-muted small mt-4 mb-0">
              <strong>{grouped.length}</strong> project{grouped.length !== 1 ? 's' : ''} ·{' '}
              <strong>{searchFiltered.length}</strong> bid{searchFiltered.length !== 1 ? 's' : ''} shown
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminBids
