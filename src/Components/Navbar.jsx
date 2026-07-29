import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FaCheck, FaPhoneAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa'

const Navbar = () => {
  const [data, setData] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('info'));
    setData(info);
  }, [location.pathname]);



  const path = location.pathname;

  if (path.startsWith('/admin') && data?.type === 'admin') {
    return <AdminMenu />
  } else if (path.startsWith('/client') && data?.type === 'client') {
    return <ClientMenu />
  } else if (path.startsWith('/user') && data?.type === 'user') {
    return <UserMenu />
  } else {
    return <CommonMenu data={data} />
  }
}

const CommonMenu = ({ data }) => {
  const dashboardPath = data?.type ? `/${data.type}-dashboard` : null;

  return (<>
    <div className='row navbar-sticky-outer'>
      <div className="col-sm-2"></div>
      <div className="col-sm-8 menu">
        <nav className="navbar navbar-expand-lg navbar-light ">
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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-us">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pricing">
                    Pricing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact-us">
                    Contact us
                  </Link>
                </li>
                {data?.type ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link fw-semibold text-primary" to={dashboardPath}>
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-danger" to="/login" onClick={() => localStorage.removeItem('info')}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}

              </ul>
            </div>
          </div>
        </nav>

      </div>
      <div className="col-sm-2"></div>
    </div>

  </>)
}

const AdminMenu = () => {
    const navigate = useNavigate();
      const logout = () => {
    localStorage.removeItem('info');
    navigate('/');

  }
  return (<>

    <div className='row navbar-sticky-outer'>
      <div className="col-sm-2"></div>
      <div className="col-sm-8 menu">
        <nav className="navbar navbar-expand-lg navbar-light ">
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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/admin-dashboard">
                    Admin Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-clients">
                    Clients
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-project">
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-bids">
                    Admin Bids
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-plans">
                    Admin Plans
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin-profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link " onClick={logout} >
                    Logout
                  </button>
                </li>

              </ul>
            </div>
          </div>
        </nav>

      </div>
      <div className="col-sm-2"></div>
    </div>

  </>)
}

const ClientMenu = () => {
   const navigate = useNavigate();
      const logout = () => {
    localStorage.removeItem('info');
    navigate('/');

  }
  return (<>
    <div className='row navbar-sticky-outer'>
      <div className="col-sm-2"></div>
      <div className="col-sm-8 menu">
        <nav className="navbar navbar-expand-lg navbar-light ">
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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/client-dashboard">
                    Client Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/client-post-project">
                    Post Project
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/client-manage-project">
                    Manage Project
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/client-Review-bids">
                    Review Bids
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/client-profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                 <button className="nav-link " onClick={logout} >
                    Logout
                  </button>
                </li>

              </ul>
            </div>
          </div>
        </nav>

      </div>
      <div className="col-sm-2"></div>
    </div>

  </>)
}

const UserMenu = () => {
   const navigate = useNavigate();
      const logout = () => {
    localStorage.removeItem('info');
    navigate('/');

  }
  return (<>
    <div className='row navbar-sticky-outer'>
      <div className="col-sm-2"></div>
      <div className="col-sm-8 menu">
        <nav className="navbar navbar-expand-lg navbar-light ">
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
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/user-dashboard">
                    User Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user-plans">
                    User-Plans
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user-project">
                    User Project
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user-bids">
                    Bids
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user-profile">
                    User Profile
                  </Link>
                </li>
                
                <li className="nav-item">
                  <button className="nav-link " onClick={logout} >
                    Logout
                  </button>
                </li>


              </ul>
            </div>
          </div>
        </nav>

      </div>
      <div className="col-sm-2"></div>
    </div>

  </>)
}
export default Navbar
