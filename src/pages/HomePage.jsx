import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'retailer') {
    return <Navigate to="/retailer/dashboard" replace />;
  }

  if (user.role === 'industry') {
    return <Navigate to="/industry/dashboard" replace />;
  }
  
  return <Navigate to="/login" replace />; // Fallback
};

export default HomePage;