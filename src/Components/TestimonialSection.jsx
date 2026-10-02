import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaQuoteLeft, FaPaperPlane, FaTimes, FaComment, FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_URL = 'http://localhost:9000';

const DEFAULT_TESTIMONIALS = [
    {
        _id: 'default1',
        name: 'Sonu Kumar',
        role: 'Software Engineer',
        rating: 5,
        review: 'Zentora helped me find top-tier freelance projects easily. The platform is secure, intuitive, and the payment flow is completely seamless!',
        avatar: 'https://ui-avatars.com/api/?name=Sonu+Kumar&background=e65100&color=fff&bold=true&size=80',
        createdAt: '2026-08-10',
        isDefault: true
    },
    {
        _id: 'default2',
        name: 'Ananya Sharma',
        role: 'UI/UX Designer',
        rating: 5,
        review: 'As a client, finding verified skilled talent was super fast. The escrow system gives total peace of mind for every single milestone.',
        avatar: 'https://ui-avatars.com/api/?name=Ananya+Sharma&background=6a1b9a&color=fff&bold=true&size=80',
        createdAt: '2026-08-18',
        isDefault: true
    },
    {
        _id: 'default3',
        name: 'Rohan Verma',
        role: 'Full Stack Developer',
        rating: 5,
        review: 'Best freelancing platform I have used. The bid system is transparent and the client communication tools are top notch. Highly recommended!',
        avatar: 'https://ui-avatars.com/api/?name=Rohan+Verma&background=0ea5e9&color=fff&bold=true&size=80',
        createdAt: '2026-09-01',
        isDefault: true
    }
];

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'];

// ── Star Rating ───────────────────────────────────────────────────────────────
const StarRating = ({ rating, interactive = false, onRate, size = 14 }) => {
    const [hovered, setHovered] = useState(0);
    const display = interactive ? (hovered || rating) : rating;
    return (
        <div className="d-flex gap-1 align-items-center" style={{ cursor: interactive ? 'pointer' : 'default' }}>
            {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                    key={star}
                    size={size}
                    style={{
                        color: display >= star ? '#e65100' : '#dee2e6',
                        transition: 'color 0.15s ease, transform 0.15s ease',
                        transform: interactive && hovered === star ? 'scale(1.3)' : 'scale(1)'
                    }}
                    onMouseEnter={() => interactive && setHovered(star)}
                    onMouseLeave={() => interactive && setHovered(0)}
                    onClick={() => interactive && onRate && onRate(star)}
                />
            ))}
        </div>
    );
};

// ── Testimonial Card ──────────────────────────────────────────────────────────
const TestimonialCard = ({ item, isNew = false }) => {
    const formatDate = d => new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    return (
        <div
            className="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column justify-content-between testi-card"
            style={isNew ? { animation: 'tNewCard 0.6s ease both', borderColor: 'rgba(230,81,0,0.3)' } : {}}
        >
            <div>
                <div className="d-flex align-items-center mb-3">
                    <img
                        src={item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=e65100&color=fff&bold=true&size=80`}
                        className="rounded-circle me-3 border border-2 border-warning-subtle"
                        style={{ width: '56px', height: '56px', objectFit: 'cover', flexShrink: 0 }}
                        alt={item.name}
                        onError={e => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=e65100&color=fff&bold=true&size=80`;
                        }}
                    />
                    <div>
                        <div className="d-flex align-items-center gap-2">
                            <h6 className="fw-bold mb-0 fs-6">{item.name}</h6>
                            {isNew && (
                                <span className="badge rounded-pill" style={{ background: '#e65100', color: 'white', fontSize: '0.6rem', padding: '3px 8px' }}>
                                    NEW
                                </span>
                            )}
                        </div>
                        {item.role && <small className="text-secondary fw-medium">{item.role}</small>}
                        {item.isDefault && (
                            <div>
                                <small className="badge rounded-pill" style={{ background: 'rgba(230,81,0,0.1)', color: '#e65100', fontSize: '0.62rem' }}>
                                    Featured
                                </small>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-2">
                    <FaQuoteLeft size={12} style={{ color: '#e65100', opacity: 0.5, marginBottom: '6px' }} />
                </div>
                <p className="text-secondary fs-6 mb-3 lh-base">"{item.review}"</p>
            </div>
            <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                <div className="d-flex align-items-center gap-1">
                    <StarRating rating={item.rating} size={13} />
                    <span className="text-dark fw-bold ms-1 fs-6">{item.rating}.0</span>
                </div>
                <small className="text-muted" style={{ fontSize: '0.72rem' }}>{formatDate(item.createdAt)}</small>
            </div>
        </div>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────
const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState('');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [newestId, setNewestId] = useState(null); // track just-submitted review for NEW badge

    // Get logged-in user info from localStorage
    const loggedUser = (() => {
        try { return JSON.parse(localStorage.getItem('info')) || null; } catch { return null; }
    })();

    const [form, setForm] = useState({
        name: loggedUser?.name || '',
        role: loggedUser?.type === 'client' ? 'Client' : loggedUser?.type === 'user' ? 'Freelancer' : '',
        rating: 0,
        review: ''
    });

    const formRef = useRef(null);
    const autoRef = useRef(null);
    const pollRef = useRef(null);
    const touchX = useRef(null);

    // ── Fetch from backend ──────────────────────────────────────────────────
    const fetchTestimonials = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            const res = await fetch(`${API_URL}/testimonials`, { signal: AbortSignal.timeout(5000) });
            const data = await res.json();
            if (data.success && Array.isArray(data.result) && data.result.length > 0) {
                setTestimonials(data.result);
            } else {
                setTestimonials(DEFAULT_TESTIMONIALS);
            }
        } catch {
            setTestimonials(DEFAULT_TESTIMONIALS);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

    // Poll every 30s to catch reviews posted by other users
    useEffect(() => {
        pollRef.current = setInterval(() => fetchTestimonials(true), 30000);
        return () => clearInterval(pollRef.current);
    }, [fetchTestimonials]);

    // ── Carousel auto-play ──────────────────────────────────────────────────
    const next = useCallback(() => setCurrentIdx(p => (p + 1) % (testimonials.length || 1)), [testimonials.length]);
    const prev = useCallback(() => setCurrentIdx(p => (p - 1 + (testimonials.length || 1)) % (testimonials.length || 1)), [testimonials.length]);

    useEffect(() => {
        if (isPlaying && testimonials.length > 3) {
            autoRef.current = setInterval(next, 4500);
        }
        return () => clearInterval(autoRef.current);
    }, [isPlaying, next, testimonials.length]);

    useEffect(() => {
        if (showForm) setIsPlaying(false); else setIsPlaying(true);
    }, [showForm]);

    // Touch swipe
    const handleTouchStart = e => { touchX.current = e.touches[0].clientX; };
    const handleTouchEnd = e => {
        if (!touchX.current) return;
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        touchX.current = null;
    };

    const handleChange = e => { setForm({ ...form, [e.target.name]: e.target.value }); setError(''); };

    // ── Submit Review ────────────────────────────────────────────────────────
    const handleSubmit = async e => {
        e.preventDefault();
        if (!form.name.trim() || !form.review.trim()) { setError('Name aur Review required hain!'); return; }
        if (form.rating === 0) { setError('Please rating select karo!'); return; }
        setSubmitting(true);

        // Build local review object (for optimistic update)
        const tempId = 'local_' + Date.now();
        const localReview = {
            _id: tempId,
            name: form.name.trim(),
            role: form.role.trim(),
            rating: parseInt(form.rating),
            review: form.review.trim(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name.trim())}&background=e65100&color=fff&bold=true&size=80`,
            createdAt: new Date().toISOString(),
            isDefault: false
        };

        try {
            const res = await fetch(`${API_URL}/testimonials`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name.trim(),
                    role: form.role.trim(),
                    rating: form.rating,
                    review: form.review.trim()
                })
            });
            const data = await res.json();

            if (data.success) {
                // ✅ Saved to DB — use actual saved doc (with real _id)
                const savedReview = { ...data.result, isDefault: false };
                setTestimonials(prev => {
                    const withoutDefaults = prev.filter(t => !t.isDefault);
                    return [savedReview, ...withoutDefaults, ...DEFAULT_TESTIMONIALS];
                });
                setNewestId(data.result._id);
                setCurrentIdx(0);
                setSubmitSuccess(true);
                setForm({
                    name: loggedUser?.name || '',
                    role: loggedUser?.type === 'client' ? 'Client' : loggedUser?.type === 'user' ? 'Freelancer' : '',
                    rating: 0,
                    review: ''
                });
                // Refresh from DB after 3s to get server-side data
                setTimeout(() => {
                    setSubmitSuccess(false);
                    setShowForm(false);
                    fetchTestimonials(true);
                }, 2500);
            } else {
                setError(data.message || 'Kuch gadbad ho gayi, dobara try karo!');
            }
        } catch {
            // Backend offline — optimistic update locally
            setTestimonials(prev => {
                const withoutDefaults = prev.filter(t => !t.isDefault);
                return [localReview, ...withoutDefaults, ...DEFAULT_TESTIMONIALS];
            });
            setNewestId(tempId);
            setCurrentIdx(0);
            setSubmitSuccess(true);
            setForm({
                name: loggedUser?.name || '',
                role: loggedUser?.type === 'client' ? 'Client' : loggedUser?.type === 'user' ? 'Freelancer' : '',
                rating: 0,
                review: ''
            });
            setTimeout(() => { setSubmitSuccess(false); setShowForm(false); }, 2500);
        } finally {
            setSubmitting(false);
        }
    };

    const realCount = testimonials.filter(t => !t.isDefault).length;
    const avgRating = testimonials.length > 0
        ? (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1) : '5.0';
    const useCarousel = testimonials.length > 3;

    return (
        <>
            <style>{`
                @keyframes tFadeUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes tNewCard {
                    0%   { opacity: 0; transform: translateY(-20px) scale(0.97); box-shadow: 0 0 0 0 rgba(230,81,0,0.4); }
                    60%  { box-shadow: 0 0 0 10px rgba(230,81,0,0); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes tFormSlide {
                    from { opacity: 0; max-height: 0; }
                    to   { opacity: 1; max-height: 1200px; }
                }
                @keyframes tSuccessPop {
                    0%  { transform: scale(0.8); opacity: 0; }
                    60% { transform: scale(1.05); }
                    100%{ transform: scale(1); opacity: 1; }
                }
                @keyframes tSpin { to { transform: rotate(360deg); } }
                @keyframes tLivePulse {
                    0%,100% { opacity:1; }
                    50%     { opacity:.3; }
                }
                .testi-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border-top: 3px solid #e65100 !important;
                }
                .testi-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 16px 40px rgba(230,81,0,0.12) !important;
                }
                .testi-write-btn {
                    background: linear-gradient(135deg, #e65100, #ff7043);
                    color: white; border: none; border-radius: 50px;
                    padding: 11px 26px; font-weight: 700; font-size: 0.88rem;
                    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
                    box-shadow: 0 6px 18px rgba(230,81,0,0.3);
                    transition: all 0.3s ease; font-family: 'Inter', sans-serif;
                }
                .testi-write-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(230,81,0,0.4); }
                .testi-form-wrapper {
                    animation: tFormSlide 0.4s ease both;
                    background: white; border-radius: 20px; padding: 32px;
                    box-shadow: 0 8px 36px rgba(230,81,0,0.1);
                    border: 1px solid rgba(230,81,0,0.15);
                    margin-top: 32px; overflow: hidden;
                }
                .testi-field {
                    border: 1.5px solid #dee2e6; border-radius: 10px;
                    padding: 10px 14px; font-size: 0.9rem; width: 100%; outline: none;
                    color: #212529; background: #f8f9fa; font-family: 'Inter', sans-serif;
                    box-sizing: border-box; transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .testi-field:focus {
                    border-color: #e65100;
                    box-shadow: 0 0 0 3px rgba(230,81,0,0.1);
                    background: white;
                }
                .testi-field:read-only { background: #f0f0f0; color: #666; cursor: not-allowed; }
                .testi-field-label { font-size: 0.83rem; font-weight: 700; color: #495057; margin-bottom: 6px; display: block; }
                .testi-submit-btn {
                    background: linear-gradient(135deg, #e65100, #ff7043);
                    color: white; border: none; border-radius: 10px; padding: 12px 28px;
                    font-weight: 700; font-size: 0.95rem; cursor: pointer; width: 100%;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    transition: all 0.3s ease; font-family: 'Inter', sans-serif;
                }
                .testi-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(230,81,0,0.35); }
                .testi-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
                .testi-error { background: #fff3cd; border: 1px solid #ffc107; color: #856404; border-radius: 10px; padding: 10px 14px; font-size: 0.85rem; }
                .testi-success {
                    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
                    border: 1px solid #6ee7b7; border-radius: 16px;
                    padding: 32px; text-align: center; color: #047857;
                    animation: tSuccessPop 0.45s ease both;
                }
                .testi-nav-btn {
                    background: white; border: 2px solid rgba(230,81,0,0.2); border-radius: 50%;
                    width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: #e65100; box-shadow: 0 3px 12px rgba(0,0,0,0.08);
                    transition: all 0.25s ease; flex-shrink: 0;
                }
                .testi-nav-btn:hover { background: #e65100; color: white; border-color: #e65100; transform: scale(1.1); box-shadow: 0 6px 18px rgba(230,81,0,0.3); }
                .testi-dot { width: 8px; height: 8px; border-radius: 50%; background: #dee2e6; cursor: pointer; border: none; padding: 0; transition: all 0.3s ease; }
                .testi-dot.active { background: #e65100; width: 22px; border-radius: 4px; }
                .testi-live {
                    display: inline-flex; align-items: center; gap: 4px;
                    background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2);
                    color: #059669; font-size: 0.68rem; font-weight: 700;
                    padding: 3px 9px; border-radius: 30px; margin-left: 8px; vertical-align: middle;
                }
                .testi-live-dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; animation: tLivePulse 1.4s ease infinite; }
                .testi-spinner { width: 40px; height: 40px; border: 3px solid rgba(230,81,0,0.15); border-top-color: #e65100; border-radius: 50%; animation: tSpin 0.8s linear infinite; margin: 0 auto 12px; }
                .testi-stats-pill {
                    display: inline-flex; align-items: center; gap: 10px;
                    background: white; border-radius: 50px; padding: 10px 22px;
                    box-shadow: 0 3px 16px rgba(230,81,0,0.1); border: 1px solid rgba(230,81,0,0.12);
                }
                .testi-user-info {
                    background: rgba(230,81,0,0.05); border: 1px solid rgba(230,81,0,0.15);
                    border-radius: 10px; padding: 10px 14px; margin-bottom: 16px;
                    font-size: 0.83rem; color: #495057; display: flex; align-items: center; gap: 8px;
                }
            `}</style>

            <div className="row py-5 testimonials">
                <div className="col-sm-10 mx-auto">

                    {/* ── Section Header ── */}
                    <div className="webheading" data-aos="fade-down">
                        Our <b className="text-color1">Testimonials</b>
                    </div>
                    <hr className="w-25 mx-auto text-color1" data-aos="zoom-in" data-aos-delay="100" />

                    <div className="row mt-4 align-items-stretch g-4">

                        {/* ── Left Info Col ── */}
                        <div
                            className="col-lg-4 col-md-12 d-flex flex-column justify-content-center px-4"
                            data-aos="fade-right" data-aos-delay="100"
                        >
                            <div>
                                <span className="badge bg-color1 px-3 py-2 rounded-pill fs-6 fw-normal text-white mb-2">
                                    Testimonials
                                </span>
                                <h3 className="fw-bold my-3" style={{ fontFamily: 'Inter' }}>
                                    What Our <span className="text-color1">Zentora Community</span> Says
                                </h3>
                                <p className="text-secondary mb-3 lh-base">
                                    Clients and Freelancers worldwide trust Zentora to connect, collaborate, and deliver exceptional projects.
                                </p>

                                {/* Stats Pill */}
                                <div className="mb-3">
                                    <div className="testi-stats-pill">
                                        <div>
                                            <div className="fw-bold" style={{ fontSize: '1.6rem', color: '#e65100', lineHeight: 1 }}>{avgRating}</div>
                                            <StarRating rating={Math.round(parseFloat(avgRating))} size={13} />
                                        </div>
                                        <div>
                                            <div className="fw-semibold" style={{ fontSize: '0.8rem', color: '#212529' }}>
                                                {testimonials.length} Reviews
                                                {realCount > 0 && (
                                                    <span className="testi-live">
                                                        <span className="testi-live-dot" /> LIVE
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ fontSize: '0.73rem', color: '#6c757d' }}>Verified Community</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex gap-2 flex-wrap">
                                    <button
                                        className="testi-write-btn"
                                        onClick={() => {
                                            setShowForm(v => !v);
                                            if (!showForm) setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
                                        }}
                                    >
                                        <FaComment size={12} />
                                        {showForm ? 'Form Close Karo' : 'Review Likho'}
                                    </button>
                                    <Link to="#" className="btn btn-outline-secondary rounded-pill px-3 py-2 fw-semibold" style={{ fontSize: '0.85rem' }}>
                                        View All
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* ── Cards Area ── */}
                        <div className="col-lg-8 col-md-12">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="testi-spinner" />
                                    <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Reviews load ho rahe hain...</p>
                                </div>

                            ) : !useCarousel ? (
                                /* Grid (≤3 cards) */
                                <div className="row g-3">
                                    {testimonials.map((item, i) => (
                                        <div
                                            key={item._id}
                                            className="col-md-6 col-lg-6"
                                            style={{ animation: `tFadeUp 0.5s ${i * 0.1}s ease both` }}
                                            data-aos="fade-up"
                                            data-aos-delay={100 + i * 100}
                                        >
                                            <TestimonialCard item={item} isNew={item._id === newestId} />
                                        </div>
                                    ))}
                                </div>

                            ) : (
                                /* Carousel (>3 cards) */
                                <div
                                    onMouseEnter={() => setIsPlaying(false)}
                                    onMouseLeave={() => !showForm && setIsPlaying(true)}
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <button className="testi-nav-btn" onClick={prev} aria-label="Previous">
                                            <FaChevronLeft size={13} />
                                        </button>
                                        <div style={{ overflow: 'hidden', flex: 1 }}>
                                            <div style={{
                                                display: 'flex',
                                                transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                                                transform: `translateX(-${currentIdx * 100}%)`
                                            }}>
                                                {testimonials.map((item, i) => (
                                                    <div key={item._id} style={{
                                                        flex: '0 0 100%', maxWidth: '100%',
                                                        opacity: i === currentIdx ? 1 : 0.4,
                                                        transform: i === currentIdx ? 'scale(1)' : 'scale(0.95)',
                                                        transition: 'all 0.4s ease',
                                                        padding: '4px 2px'
                                                    }}>
                                                        <TestimonialCard item={item} isNew={item._id === newestId} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="testi-nav-btn" onClick={next} aria-label="Next">
                                            <FaChevronRight size={13} />
                                        </button>
                                    </div>
                                    {/* Dots */}
                                    <div className="d-flex justify-content-center gap-2 mt-3">
                                        {testimonials.map((_, i) => (
                                            <button
                                                key={i}
                                                className={`testi-dot${i === currentIdx ? ' active' : ''}`}
                                                onClick={() => setCurrentIdx(i)}
                                                aria-label={`Slide ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="text-center mt-1" style={{ color: '#adb5bd', fontSize: '0.75rem' }}>
                                        {currentIdx + 1} / {testimonials.length}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Review Form ── */}
                    {showForm && (
                        <div ref={formRef} className="testi-form-wrapper">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0" style={{ fontFamily: 'Inter', color: '#212529' }}>
                                    ✍️ Share Your Experience
                                </h5>
                                <button
                                    onClick={() => setShowForm(false)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#adb5bd', padding: '4px', lineHeight: 0 }}
                                >
                                    <FaTimes size={16} />
                                </button>
                            </div>

                            {/* Logged-in user info strip */}
                            {loggedUser && (
                                <div className="testi-user-info">
                                    <span>👤</span>
                                    <span>
                                        Logged in as <strong>{loggedUser.name}</strong>
                                        {loggedUser.type && <> · <span className="text-capitalize">{loggedUser.type}</span></>}
                                    </span>
                                </div>
                            )}

                            {submitSuccess ? (
                                <div className="testi-success">
                                    <FaCheckCircle size={44} color="#10b981" style={{ marginBottom: '12px' }} />
                                    <h5 className="fw-bold mb-1">Thank You! 🎉</h5>
                                    <p className="mb-0">Aapka review submit ho gaya aur ab page pe show ho raha hai!</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="testi-field-label">
                                                Your Name *
                                                {loggedUser?.name && <span className="text-muted fw-normal ms-1">(auto-filled)</span>}
                                            </label>
                                            <input
                                                type="text" name="name" className="testi-field"
                                                placeholder="e.g. Rahul Sharma"
                                                value={form.name} onChange={handleChange} required
                                                readOnly={!!loggedUser?.name}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="testi-field-label">Your Role / Profession</label>
                                            <input
                                                type="text" name="role" className="testi-field"
                                                placeholder="e.g. Software Engineer"
                                                value={form.role} onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="testi-field-label">Rating *</label>
                                            <div className="d-flex align-items-center gap-3 mt-1">
                                                <StarRating
                                                    rating={form.rating} interactive={true} size={26}
                                                    onRate={r => { setForm({ ...form, rating: r }); setError(''); }}
                                                />
                                                {form.rating > 0 && (
                                                    <span style={{ fontSize: '0.85rem', color: '#e65100', fontWeight: 700 }}>
                                                        {RATING_LABELS[form.rating]}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="testi-field-label">Your Review *</label>
                                            <textarea
                                                name="review" className="testi-field" rows={4}
                                                placeholder="Share your experience with Zentora — how did we help you?"
                                                value={form.review} onChange={handleChange} required
                                                style={{ resize: 'vertical', minHeight: '100px' }}
                                            />
                                        </div>

                                        {error && (
                                            <div className="col-12">
                                                <div className="testi-error">⚠️ {error}</div>
                                            </div>
                                        )}

                                        <div className="col-12">
                                            <button type="submit" className="testi-submit-btn" disabled={submitting}>
                                                {submitting ? (
                                                    <><span className="spinner-border spinner-border-sm" /> Submitting...</>
                                                ) : (
                                                    <><FaPaperPlane size={13} /> Submit Review</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default TestimonialSection;
