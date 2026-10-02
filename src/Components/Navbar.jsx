import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

/* ─── helper: always returns the correct active class ─── */
const navCls = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

const Navbar = () => {
  const [data, setData] = useState(null);
  const location = useLocation();

  /* Re-read user info on every route change AND on storage events
     (covers login/logout from another tab or user switch) */
  useEffect(() => {
    const readInfo = () => {
      const info = JSON.parse(localStorage.getItem('info'));
      setData(info);
    };

    readInfo();                                         // run on path change
    window.addEventListener('storage', readInfo);      // run on cross-tab change
    return () => window.removeEventListener('storage', readInfo);
  }, [location.pathname]);

  const path = location.pathname;

  if (path.startsWith('/admin') && data?.type === 'admin') {
    return <AdminMenu data={data} />
  } else if (path.startsWith('/client') && data?.type === 'client') {
    return <ClientMenu data={data} />
  } else if (path.startsWith('/user') && data?.type === 'user') {
    return <UserMenu data={data} />
  } else {
    return <CommonMenu data={data} />
  }
}

/* ════════════════════════════════════════════════════════
   COMMON MENU  (public / not fully in role-specific area)
   ════════════════════════════════════════════════════════ */
const CommonMenu = ({ data }) => {
  const dashboardPath = data?.type ? `/${data.type}-dashboard` : null;

  return (<>
    <div className='row navbar-sticky-outer justify-content-center mx-0'>
      <div className="col-12 col-xl-10 menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/logo-dark.svg" alt="Zentora" className="navbar-logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  {/* `end` ensures "/" only matches the exact root path */}
                  <NavLink className={navCls} to="/" end>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/about-us">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/services">
                    Services
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/pricing">
                    Pricing
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/contact-us">
                    Contact us
                  </NavLink>
                </li>
                {data?.type ? (
                  <>
                    <li className="nav-item">
                      <NavLink className={({ isActive }) => `nav-link fw-semibold text-primary${isActive ? ' active' : ''}`} to={dashboardPath}>
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={navCls} to={`/${data.type}-profile`}>
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link text-danger"
                        to="/login"
                        onClick={() => localStorage.removeItem('info')}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className={navCls} to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={navCls} to="/login">
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </>)
}

/* ════════════════════════════════════════════════════════
   ADMIN MENU
   ════════════════════════════════════════════════════════ */
const AdminMenu = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('info');
    navigate('/');
  }
  return (<>
    <div className='row navbar-sticky-outer justify-content-center mx-0'>
      <div className="col-12 col-xl-10 menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/logo-dark.svg" alt="Zentora" className="navbar-logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  <NavLink className={navCls} to="/admin-dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/admin-plans">
                    Plans
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/admin-users">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/admin-clients">
                    Clients
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/admin-project">
                    Projects
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/admin-bids">
                    Bids
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/admin-profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-danger border-0 bg-transparent" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </>)
}

/* ════════════════════════════════════════════════════════
   CLIENT MENU
   ════════════════════════════════════════════════════════ */
const ClientMenu = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('info');
    navigate('/');
  }
  return (<>
    <div className='row navbar-sticky-outer justify-content-center mx-0'>
      <div className="col-12 col-xl-10 menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/logo-dark.svg" alt="Zentora" className="navbar-logo" />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  <NavLink className={navCls} to="/client-dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/client-post-project">
                    Post Project
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/client-manage-project">
                    Manage Project
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/client-profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-danger border-0 bg-transparent" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </>)
}

/* ════════════════════════════════════════════════════════
   USER MENU
   ════════════════════════════════════════════════════════ */
const UserMenu = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('info');
    navigate('/');
  }
  return (<>
    <div className='row navbar-sticky-outer justify-content-center mx-0'>
      <div className="col-12 col-xl-10 menu">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/logo-dark.svg" alt="Zentora" className="navbar-logo" />
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  <NavLink className={navCls} to="/user-dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/user-plans">
                    Plans
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/user-project">
                    Projects
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/user-bids">
                    My Bids
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navCls} to="/user-profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link text-danger border-0 bg-transparent" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </>)
}

export default Navbar