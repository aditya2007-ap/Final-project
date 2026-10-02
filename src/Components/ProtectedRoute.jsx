import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Route protection guard for authenticated routes.
 * Checks whether user info exists in localStorage and matches required role.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('info')) || null;
    } catch {
      return null;
    }
  })();

  // 1. Not authenticated -> redirect to login
  if (!user || !user._id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Role restriction check -> redirect to user's authorized home/dashboard
  if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(user.type)) {
    const fallbackPath = user.type ? `/${user.type}-dashboard` : '/';
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
