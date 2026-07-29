import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* common url */}
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/services' element={<Services />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/about-us' element={<AboutUs />} />

          {/* ADMIN URL */}
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/admin-users' element={<AdminUsers />} />
          <Route path='/admin-clients' element={<AdminClients />} />
          <Route path='/admin-project' element={<AdminProject />} />
          <Route path='/admin-bids' element={<AdminBids />} />
          <Route path='/admin-profile' element={<AdminProfile />} />
          <Route path='/admin-plans' element={<AdminPlans />} />
          {/* CLIENT URL */}
          <Route path='/client-dashboard' element={<ClientDashboard />} />
          <Route path='/client-post-project' element={<ClientPostProject />} />
          <Route path='/client-manage-project' element={<ClientManageProject />} />
          <Route path='/client-Review-bids' element={<ClientReviewBids />} />
          <Route path='/client-profile' element={<ClientProfile />} />

          {/* USERS URL */}
          <Route path='/user-dashboard' element={<UserDashboard />} />
          <Route path='/user-project' element={<UserProject />} />
          <Route path='/user-bids' element={<UserBids />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/user-plans' element={<UserPlans />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
export default App