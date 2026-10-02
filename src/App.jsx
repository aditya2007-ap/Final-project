import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './App.css';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Services from './Components/Services';
import Pricing from './Components/Pricing';
import ContactUs from './Components/ContactUs';
import AboutUs from './Components/AboutUs';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AdminDashboard from './Components/admin/AdminDashboard';
import AdminUsers from './Components/admin/AdminUsers';
import AdminClients from './Components/admin/AdminClients';
import AdminProject from './Components/admin/AdminProjects';
import AdminBids from './Components/admin/AdminBids';
import AdminProfile from './Components/admin/AdminProfile';
import AdminPlans from './Components/admin/AdminPlans';
import ClientDashboard from './Components/client/ClientDashboard';
import ClientPostProject from './Components/client/ClientPostProject';
import ClientManageProject from './Components/client/ClientManageProjects';
import ClientReviewBids from './Components/client/ClientReviewBids';
import ClientProfile from './Components/client/ClientProfile';
import UserDashboard from './Components/user/UserDashboard';
import UserProject from './Components/user/UserProjects';
import UserBids from './Components/user/UserBids';
import UserProfile from './Components/user/UserProfile';
import UserPlans from './Components/user/UserPlans';
import Error from './Components/Error';
import ProtectedRoute from './Components/ProtectedRoute';
import 'aos/dist/aos.css';
import Aos from 'aos';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    Aos.init({
      offset: 50,
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });

    if (typeof window !== 'undefined') {
      window.AOS = Aos;
    }

    // Observe dynamic React DOM mutations to automatically discover and animate new [data-aos] elements
    let mutationTimer;
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(() => {
        Aos.refreshHard();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      clearTimeout(mutationTimer);
    };
  }, []);

  useEffect(() => {
    // Refresh AOS on route change once new page DOM has mounted
    const routeTimer = setTimeout(() => {
      Aos.refreshHard();
    }, 120);

    return () => clearTimeout(routeTimer);
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public common URLs */}
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/services' element={<Services />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/about-us' element={<AboutUs />} />

        {/* ADMIN URLS - Protected */}
        <Route path='/admin-dashboard' element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path='/admin-users' element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
        <Route path='/admin-clients' element={<ProtectedRoute allowedRoles={['admin']}><AdminClients /></ProtectedRoute>} />
        <Route path='/admin-project' element={<ProtectedRoute allowedRoles={['admin']}><AdminProject /></ProtectedRoute>} />
        <Route path='/admin-bids' element={<ProtectedRoute allowedRoles={['admin']}><AdminBids /></ProtectedRoute>} />
        <Route path='/admin-profile' element={<ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>} />
        <Route path='/admin-plans' element={<ProtectedRoute allowedRoles={['admin']}><AdminPlans /></ProtectedRoute>} />

        {/* CLIENT URLS - Protected */}
        <Route path='/client-dashboard' element={<ProtectedRoute allowedRoles={['client']}><ClientDashboard /></ProtectedRoute>} />
        <Route path='/client-post-project' element={<ProtectedRoute allowedRoles={['client']}><ClientPostProject /></ProtectedRoute>} />
        <Route path='/client-manage-project' element={<ProtectedRoute allowedRoles={['client']}><ClientManageProject /></ProtectedRoute>} />
        <Route path='/client-Review-bids' element={<ProtectedRoute allowedRoles={['client']}><ClientReviewBids /></ProtectedRoute>} />
        <Route path='/client-profile' element={<ProtectedRoute allowedRoles={['client']}><ClientProfile /></ProtectedRoute>} />

        {/* FREELANCER (USER) URLS - Protected */}
        <Route path='/user-dashboard' element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
        <Route path='/user-project' element={<UserProject />} />
        <Route path='/user-bids' element={<ProtectedRoute allowedRoles={['user']}><UserBids /></ProtectedRoute>} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/user-profile/:id' element={<UserProfile />} />
        <Route path='/user-plans' element={<ProtectedRoute allowedRoles={['user']}><UserPlans /></ProtectedRoute>} />

        {/* 404 Catch-All */}
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;