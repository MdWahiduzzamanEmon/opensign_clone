import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };

  const isAuthenticated = () => {
    const user = getUser();
    if (user) {
      return true;
    }
    return false;
  };

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
