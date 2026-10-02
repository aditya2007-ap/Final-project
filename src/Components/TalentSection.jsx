import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaStar, FaCheckCircle, FaMapMarkerAlt, FaBolt, FaSearch, FaUserTie, FaCode, FaPaintBrush, FaDatabase, FaMobileAlt, FaChartLine, FaSyncAlt } from 'react-icons/fa';
import { MdVerified, MdWorkOutline } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi2';

const API_URL = 'http://localhost:9000';

// ── Skill → Category mapper ──────────────────────────────────────────────────
const SKILL_CATEGORIES = {
    'React': 'Frontend', 'Vue': 'Frontend', 'Angular': 'Frontend', 'Next.js': 'Frontend',
    'HTML': 'Frontend', 'CSS': 'Frontend', 'JavaScript': 'Frontend', 'TypeScript': 'Frontend',
    'Node.js': 'Backend', 'Express': 'Backend', 'Django': 'Backend', 'FastAPI': 'Backend',
    'PHP': 'Backend', 'Laravel': 'Backend', 'Spring': 'Backend', 'Python': 'Backend',
    'MongoDB': 'Database', 'MySQL': 'Database', 'PostgreSQL': 'Database', 'Redis': 'Database',
    'Figma': 'Design', 'Adobe XD': 'Design', 'UI/UX': 'Design', 'Sketch': 'Design',
    'React Native': 'Mobile', 'Flutter': 'Mobile', 'Swift': 'Mobile', 'Kotlin': 'Mobile',
    'ML': 'AI/ML', 'PyTorch': 'AI/ML', 'TensorFlow': 'AI/ML', 'Pandas': 'AI/ML',
    'AWS': 'DevOps', 'Docker': 'DevOps', 'Kubernetes': 'DevOps', 'CI/CD': 'DevOps',
};

const CATEGORY_ICONS = {
    'All': FaUserTie,
    'Frontend': FaCode,
    'Backend': FaDatabase,
    'Design': FaPaintBrush,
    'Mobile': FaMobileAlt,
    'AI/ML': FaChartLine,
    'DevOps': FaBolt,
};

const SKILL_COLORS = [
    { bg: 'rgba(230,81,0,0.08)', color: '#e65100' },
    { bg: 'rgba(106,27,154,0.08)', color: '#6a1b9a' },
    { bg: 'rgba(2,119,189,0.08)', color: '#0277bd' },
    { bg: 'rgba(46,125,50,0.08)', color: '#2e7d32' },
    { bg: 'rgba(230,81,0,0.06)', color: '#bf360c' },
];

// Parse skills string "React, Node.js, MongoDB" → array
const parseSkills = (skillStr) => {
    if (!skillStr) return [];
    return skillStr.split(/[,|;]+/).map(s => s.trim()).filter(Boolean);
};

// Generate deterministic avatar color per name
const avatarColors = ['e65100', '6a1b9a', '0277bd', '2e7d32', 'bf360c', '00838f', 'ad1457', '558b2f'];
const getAvatarColor = (name = '') => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return avatarColors[Math.abs(hash) % avatarColors.length];
};

// ── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = ({ delay = 0 }) => (
    <div className="col-lg-4 col-md-6" style={{ animation: `tlFadeUp 0.5s ${delay}s ease both` }}>
        <div className="tl-card">
            <div className="tl-skeleton-avatar" />
            <div className="tl-skeleton-line" style={{ width: '60%', marginBottom: '8px' }} />
            <div className="tl-skeleton-line" style={{ width: '40%', marginBottom: '16px' }} />
            <div className="tl-skeleton-line" style={{ width: '100%', marginBottom: '8px', height: '8px' }} />
            <div className="tl-skeleton-line" style={{ width: '80%', height: '8px' }} />
        </div>
    </div>
);

// ── Freelancer Card ───────────────────────────────────────────────────────────
const FreelancerCard = ({ user, index, onHire }) => {
    const skills = parseSkills(user.skill);
    const color = getAvatarColor(user.name);
    const avatarSrc = user.profile
        || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=${color}&color=fff&bold=true&size=120`;

    const ratingNum = user.rating || (index === 0 ? '4.9' : index === 1 ? '4.8' : '5.0');
    const reviewCount = user.reviews || (index === 0 ? 52 : index === 1 ? 38 : 44);

    const aosAnims = ['fade-up', 'fade-up', 'fade-up', 'flip-left', 'zoom-in', 'fade-right'];
    const aosAnim = aosAnims[index % aosAnims.length];

    return (
        <div
            className="col-lg-4 col-md-6"
            data-aos={aosAnim}
            data-aos-delay={100 + (index % 3) * 120}
            data-aos-duration="700"
        >
            <div className="tl-card">
                {/* Top gradient accent */}
                <div className="tl-card-accent" />

                {/* Availability pulse */}
                <div className="tl-availability">
                    <span className="tl-avail-dot" />
                    Available
                </div>

                {/* Avatar + Name */}
                <div className="tl-avatar-wrap">
                    <img
                        src={avatarSrc}
                        alt={user.name}
                        className="tl-avatar"
                        onError={e => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=${color}&color=fff&bold=true&size=120`;
                        }}
                    />
                    <div className="tl-verified-icon">
                        <MdVerified size={16} color="#fff" />
                    </div>
                </div>

                <div className="tl-name-row">
                    <h5 className="tl-name">{user.name || 'Freelancer'}</h5>
                </div>
                <p className="tl-headline">{user.headline || 'Skilled Freelancer'}</p>

                {/* Stats row */}
                <div className="tl-stats-row">
                    <div className="tl-stat">
                        <FaStar size={12} color="#e65100" />
                        <span className="tl-stat-val">{parseFloat(ratingNum).toFixed(1)}</span>
                        <span className="tl-stat-label">({reviewCount})</span>
                    </div>
                    {user.rate && (
                        <div className="tl-stat">
                            <FaBolt size={11} color="#6a1b9a" />
                            <span className="tl-stat-val" style={{ color: '#6a1b9a' }}>
                                {user.rate.startsWith('₹') ? user.rate : `₹${user.rate}`}
                            </span>
                        </div>
                    )}
                    {user.location && (
                        <div className="tl-stat">
                            <FaMapMarkerAlt size={11} color="#64748b" />
                            <span className="tl-stat-label">{user.location}</span>
                        </div>
                    )}
                </div>

                {/* Bio */}
                {user.bio && (
                    <p className="tl-bio">"{user.bio.slice(0, 90)}{user.bio.length > 90 ? '...' : ''}"</p>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="tl-skills-wrap">
                        {skills.slice(0, 4).map((s, i) => {
                            const col = SKILL_COLORS[i % SKILL_COLORS.length];
                            return (
                                <span key={i} className="tl-skill-badge" style={{ background: col.bg, color: col.color }}>
                                    {s}
                                </span>
                            );
                        })}
                        {skills.length > 4 && (
                            <span className="tl-skill-badge" style={{ background: 'rgba(100,116,139,0.08)', color: '#64748b' }}>
                                +{skills.length - 4} more
                            </span>
                        )}
                    </div>
                )}

                {/* Action button */}
                <button
                    className="tl-hire-btn"
                    onClick={() => onHire && onHire(user)}
                    id={`hire-btn-${user._id}`}
                >
                    <MdWorkOutline size={14} />
                    View Profile & Hire
                </button>
            </div>
        </div>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────
const TalentSection = () => {
    const navigate = useNavigate();
    const [freelancers, setFreelancers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const handleHire = (freelancer) => {
        let info = null;
        try {
            info = JSON.parse(localStorage.getItem('info'));
        } catch {
            info = null;
        }

        // If user is not logged in, prompt to login or register
        if (!info || !info._id) {
            Swal.fire({
                title: 'Login or Register Required',
                html: `<p style="color: #64748b; font-size: 0.95rem; margin-bottom: 0;">To hire <b>${freelancer?.name || 'this freelancer'}</b>, please log in to your account or register as a client.</p>`,
                icon: 'info',
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: '🔑 Login',
                denyButtonText: '📝 Register',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#e65100',
                denyButtonColor: '#6a1b9a',
                cancelButtonColor: '#94a3b8',
                customClass: {
                    popup: 'rounded-4'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                } else if (result.isDenied) {
                    navigate('/register');
                }
            });
            return;
        }

        // If client is logged in, directly redirect to the user's profile section
        if (info?.type === 'client') {
            navigate(`/user-profile?userId=${freelancer._id}`, {
                state: { freelancer, userId: freelancer._id }
            });
            return;
        }

        // If logged in as another freelancer (type: user)
        if (info?.type === 'user') {
            Swal.fire({
                title: 'Freelancer Account Detected',
                text: 'You are currently logged in as a Freelancer. To hire other talent as an employer, please log in with a client account.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login as Client',
                cancelButtonText: 'View Profile',
                confirmButtonColor: '#e65100',
                cancelButtonColor: '#6a1b9a',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate(`/user-profile?userId=${freelancer._id}`, {
                        state: { freelancer, userId: freelancer._id }
                    });
                }
            });
            return;
        }

        // Default fallback (e.g. admin)
        navigate(`/user-profile?userId=${freelancer._id}`, {
            state: { freelancer, userId: freelancer._id }
        });
    };

    const fetchFreelancers = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);
        try {
            const res = await fetch(`${API_URL}/freelancers`, { signal: AbortSignal.timeout(5000) });
            const data = await res.json();
            if (data.success && Array.isArray(data.result) && data.result.length > 0) {
                // Ensure only real registered users from DB
                const realUsers = data.result.filter(u => u && u._id);
                setFreelancers(realUsers);
                setFiltered(realUsers);
            } else {
                setFreelancers([]);
                setFiltered([]);
            }
        } catch {
            setFreelancers([]);
            setFiltered([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => { fetchFreelancers(); }, [fetchFreelancers]);

    // Filter logic
    useEffect(() => {
        let result = [...freelancers];
        if (searchTerm.trim()) {
            const q = searchTerm.toLowerCase();
            result = result.filter(u =>
                (u.name || '').toLowerCase().includes(q) ||
                (u.headline || '').toLowerCase().includes(q) ||
                (u.skill || '').toLowerCase().includes(q) ||
                (u.location || '').toLowerCase().includes(q)
            );
        }
        if (activeFilter !== 'All') {
            result = result.filter(u => {
                const skills = parseSkills(u.skill);
                return skills.some(s => SKILL_CATEGORIES[s] === activeFilter);
            });
        }
        setFiltered(result);
    }, [searchTerm, activeFilter, freelancers]);

    // Unique categories from actual real data
    const availableCategories = ['All', ...Array.from(new Set(
        freelancers.flatMap(u => parseSkills(u.skill).map(s => SKILL_CATEGORIES[s]).filter(Boolean))
    ))];

    // Ensure ONLY three top talents are displayed
    const displayedFreelancers = filtered.slice(0, 3);

    return (
        <>
            <style>{`
                @keyframes tlFadeUp {
                    from { opacity: 0; transform: translateY(32px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes tlGradient {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes tlPulseAvail {
                    0%,100% { transform: scale(1); opacity:1; }
                    50%     { transform: scale(1.5); opacity: .6; }
                }
                @keyframes tlSpin { to { transform: rotate(360deg); } }
                @keyframes tlShimmer {
                    0%   { background-position: -600px 0; }
                    100% { background-position: 600px 0; }
                }

                /* ── Section ── */
                .tl-section {
                    background: linear-gradient(160deg, #fff7f3 0%, #fdf4ff 50%, #f0f9ff 100%);
                    padding: 90px 0 80px;
                    position: relative;
                    overflow: hidden;
                    font-family: 'Inter', sans-serif;
                }
                .tl-section::before {
                    content: '';
                    position: absolute; top: -100px; left: -100px;
                    width: 400px; height: 400px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(230,81,0,0.06) 0%, transparent 70%);
                    pointer-events: none;
                }
                .tl-section::after {
                    content: '';
                    position: absolute; bottom: -80px; right: -80px;
                    width: 320px; height: 320px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(106,27,154,0.06) 0%, transparent 70%);
                    pointer-events: none;
                }

                /* ── Heading ── */
                .tl-badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: rgba(230,81,0,0.09);
                    color: #e65100; font-size: 0.72rem; font-weight: 800;
                    letter-spacing: 1.8px; padding: 7px 18px; border-radius: 30px;
                    border: 1px solid rgba(230,81,0,0.2); margin-bottom: 16px;
                }
                .tl-heading {
                    font-size: clamp(1.9rem, 4vw, 2.8rem);
                    font-weight: 800; color: #0f172a; line-height: 1.2; margin-bottom: 12px;
                }
                .tl-heading span {
                    background: linear-gradient(135deg, #e65100, #ff7043, #6a1b9a);
                    background-size: 200% 200%;
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    background-clip: text; animation: tlGradient 4s ease infinite;
                }
                .tl-subtext { color: #64748b; font-size: 1rem; max-width: 500px; margin: 0 auto; }
                .tl-divider {
                    width: 60px; height: 4px;
                    background: linear-gradient(90deg, #e65100, #ff7043, #6a1b9a);
                    border-radius: 4px; margin: 20px auto 36px;
                }

                /* ── Search & Filter ── */
                .tl-search-wrap {
                    background: white; border-radius: 50px;
                    border: 1.5px solid rgba(230,81,0,0.15);
                    display: flex; align-items: center; gap: 10px;
                    padding: 10px 20px; max-width: 380px; width: 100%;
                    box-shadow: 0 3px 16px rgba(230,81,0,0.08);
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .tl-search-wrap:focus-within {
                    border-color: #e65100;
                    box-shadow: 0 0 0 3px rgba(230,81,0,0.1);
                }
                .tl-search-input {
                    border: none; outline: none; background: transparent;
                    font-size: 0.88rem; flex: 1; color: #212529; font-family: 'Inter', sans-serif;
                }
                .tl-filter-tabs {
                    display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
                }
                .tl-filter-tab {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 8px 18px; border-radius: 50px;
                    border: 1.5px solid #e2e8f0; background: white;
                    font-size: 0.82rem; font-weight: 600; color: #64748b;
                    cursor: pointer; transition: all 0.25s ease;
                    font-family: 'Inter', sans-serif;
                }
                .tl-filter-tab:hover { border-color: #e65100; color: #e65100; }
                .tl-filter-tab.active {
                    background: linear-gradient(135deg, #e65100, #ff7043);
                    border-color: transparent; color: white;
                    box-shadow: 0 4px 14px rgba(230,81,0,0.3);
                    transform: translateY(-1px);
                }
                .tl-refresh-btn {
                    background: none; border: 1.5px solid rgba(230,81,0,0.2);
                    color: #e65100; border-radius: 50px; padding: 9px 18px;
                    font-size: 0.82rem; font-weight: 600; cursor: pointer;
                    display: inline-flex; align-items: center; gap: 6px;
                    transition: all 0.25s ease; font-family: 'Inter', sans-serif;
                }
                .tl-refresh-btn:hover { background: #e65100; color: white; }
                .tl-spin { animation: tlSpin 0.75s linear infinite; }

                /* ── Card ── */
                .tl-card {
                    background: #ffffff;
                    border-radius: 24px;
                    padding: 32px 26px 26px;
                    border: 1px solid rgba(230,81,0,0.1);
                    box-shadow: 0 4px 24px rgba(0,0,0,0.06);
                    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
                    position: relative; overflow: hidden;
                    display: flex; flex-direction: column; align-items: center; text-align: center;
                    height: 100%;
                }
                .tl-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 24px 56px rgba(230,81,0,0.15);
                    border-color: rgba(230,81,0,0.25);
                }
                .tl-card-accent {
                    position: absolute; top: 0; left: 0; right: 0; height: 4px;
                    background: linear-gradient(90deg, #e65100, #ff7043, #6a1b9a);
                }
                .tl-availability {
                    position: absolute; top: 18px; right: 18px;
                    display: flex; align-items: center; gap: 5px;
                    background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2);
                    color: #059669; font-size: 0.68rem; font-weight: 700;
                    padding: 4px 10px; border-radius: 30px;
                }
                .tl-avail-dot {
                    width: 6px; height: 6px; background: #10b981; border-radius: 50%;
                    animation: tlPulseAvail 1.5s ease infinite;
                }
                .tl-avatar-wrap { position: relative; margin-bottom: 16px; }
                .tl-avatar {
                    width: 88px; height: 88px; border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid white;
                    box-shadow: 0 6px 24px rgba(230,81,0,0.2);
                }
                .tl-verified-icon {
                    position: absolute; bottom: 2px; right: 2px;
                    background: linear-gradient(135deg, #e65100, #ff7043);
                    border-radius: 50%; width: 24px; height: 24px;
                    display: flex; align-items: center; justify-content: center;
                    border: 2px solid white;
                    box-shadow: 0 2px 8px rgba(230,81,0,0.3);
                }
                .tl-name { font-weight: 800; font-size: 1.05rem; color: #0f172a; margin: 0; }
                .tl-name-row { margin-bottom: 4px; }
                .tl-headline { color: #64748b; font-size: 0.85rem; margin-bottom: 14px; font-weight: 500; }
                .tl-stats-row {
                    display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;
                    padding: 12px 0; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;
                    margin-bottom: 14px; width: 100%;
                }
                .tl-stat { display: flex; align-items: center; gap: 4px; }
                .tl-stat-val { font-weight: 700; font-size: 0.85rem; color: #0f172a; }
                .tl-stat-label { font-size: 0.78rem; color: #64748b; }
                .tl-bio {
                    font-size: 0.82rem; color: #64748b; font-style: italic;
                    line-height: 1.6; margin-bottom: 14px;
                    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
                }
                .tl-skills-wrap { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-bottom: 20px; }
                .tl-skill-badge {
                    font-size: 0.72rem; font-weight: 700; padding: 4px 12px;
                    border-radius: 20px; letter-spacing: 0.3px;
                }
                .tl-hire-btn {
                    background: linear-gradient(135deg, #e65100, #ff7043);
                    color: white; border: none; border-radius: 50px;
                    padding: 12px 28px; font-weight: 700; font-size: 0.88rem;
                    cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
                    width: 100%; justify-content: center; margin-top: auto;
                    box-shadow: 0 6px 18px rgba(230,81,0,0.25);
                    transition: all 0.3s ease; font-family: 'Inter', sans-serif;
                }
                .tl-hire-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(230,81,0,0.4); }

                /* ── Skeleton ── */
                .tl-skeleton-avatar {
                    width: 88px; height: 88px; border-radius: 50%;
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 600px 100%; animation: tlShimmer 1.5s infinite; margin: 0 auto 16px;
                }
                .tl-skeleton-line {
                    height: 12px; border-radius: 6px; margin: 0 auto;
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 600px 100%; animation: tlShimmer 1.5s infinite;
                }

                /* ── Empty ── */
                .tl-empty {
                    background: white; border-radius: 24px; padding: 70px 32px;
                    text-align: center; border: 2px dashed rgba(230,81,0,0.2);
                    grid-column: 1 / -1;
                }

                /* ── Load More ── */
                .tl-load-more-btn {
                    background: transparent; color: #e65100;
                    border: 2px solid #e65100; border-radius: 50px;
                    padding: 13px 40px; font-weight: 700; font-size: 0.92rem;
                    cursor: pointer; transition: all 0.3s ease; font-family: 'Inter', sans-serif;
                    display: inline-flex; align-items: center; gap: 8px;
                }
                .tl-load-more-btn:hover { background: #e65100; color: white; transform: translateY(-2px); box-shadow: 0 8px 22px rgba(230,81,0,0.3); }

                /* ── Count pill ── */
                .tl-count-pill {
                    display: inline-flex; align-items: center; gap: 6px;
                    background: white; border: 1px solid rgba(230,81,0,0.15);
                    color: #64748b; font-size: 0.78rem; font-weight: 600;
                    padding: 6px 16px; border-radius: 30px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }

                @media (max-width: 767px) {
                    .tl-section { padding: 60px 0; }
                    .tl-filter-tabs { gap: 6px; }
                    .tl-filter-tab { padding: 6px 14px; font-size: 0.78rem; }
                }
            `}</style>

            <section className="tl-section">
                <div className="container">

                    {/* ── Header ── */}
                    <div className="text-center mb-5">
                        <div className="tl-badge" data-aos="fade-down">
                            <HiSparkles size={13} />
                            TOP 3 FEATURED FREELANCERS
                        </div>
                        <h2 className="tl-heading" data-aos="fade-up" data-aos-delay="100">
                            Hire Top <span>Vetted Talent</span>
                        </h2>
                        <p className="tl-subtext" data-aos="fade-up" data-aos-delay="150">
                            Explore our top 3 verified professionals ready to tackle your complex projects — all vetted on Zentora.
                        </p>
                        <div className="tl-divider" data-aos="zoom-in" data-aos-delay="200" />

                        {/* Count + Refresh */}
                        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mb-4" data-aos="fade-up" data-aos-delay="220">
                            <div className="tl-count-pill">
                                <FaUserTie size={11} color="#e65100" />
                                {displayedFreelancers.length} Top Vetted Talent{displayedFreelancers.length !== 1 ? 's' : ''}
                            </div>
                            <button
                                className="tl-refresh-btn"
                                onClick={() => fetchFreelancers(true)}
                                disabled={refreshing}
                                title="Refresh"
                            >
                                <FaSyncAlt size={12} className={refreshing ? 'tl-spin' : ''} />
                                Refresh
                            </button>
                        </div>

                        {/* Search */}
                        <div className="d-flex justify-content-center mb-3" data-aos="fade-up" data-aos-delay="240">
                            <div className="tl-search-wrap">
                                <FaSearch size={13} color="#94a3b8" />
                                <input
                                    type="text"
                                    className="tl-search-input"
                                    placeholder="Search by name, skill or location..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, lineHeight: 0 }}
                                    >✕</button>
                                )}
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        {availableCategories.length > 1 && (
                            <div className="tl-filter-tabs" data-aos="fade-up" data-aos-delay="260">
                                {availableCategories.map(cat => {
                                    const Icon = CATEGORY_ICONS[cat] || FaUserTie;
                                    return (
                                        <button
                                            key={cat}
                                            className={`tl-filter-tab${activeFilter === cat ? ' active' : ''}`}
                                            onClick={() => setActiveFilter(cat)}
                                        >
                                            <Icon size={11} />
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* ── Cards Grid ── */}
                    {loading ? (
                        <div className="row g-4">
                            {[0, 1, 2].map(i => <SkeletonCard key={i} delay={i * 0.1} />)}
                        </div>

                    ) : filtered.length === 0 ? (
                        <div className="row">
                            <div className="col-12">
                                <div className="tl-empty" data-aos="zoom-in">
                                    <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>👨‍💻</div>
                                    <h4 className="fw-bold" style={{ color: '#0f172a' }}>
                                        {freelancers.length === 0
                                            ? 'Abhi Koi Freelancer Register Nahi Hai'
                                            : 'Koi Match Nahi Mila'}
                                    </h4>
                                    <p className="text-secondary mb-3">
                                        {freelancers.length === 0
                                            ? 'Freelancers join karenge to yahan automatically show honge!'
                                            : 'Search ya filter change karke try karo.'}
                                    </p>
                                    {searchTerm || activeFilter !== 'All' ? (
                                        <button
                                            className="tl-hire-btn"
                                            style={{ width: 'auto', margin: '0 auto' }}
                                            onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}
                                        >
                                            Clear Filters
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className="row g-4">
                            {displayedFreelancers.map((user, i) => (
                                <FreelancerCard key={user._id} user={user} index={i} onHire={handleHire} />
                            ))}
                        </div>
                    )}

                </div>
            </section>
        </>
    );
};

export default TalentSection;
