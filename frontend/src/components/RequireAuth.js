// src/components/RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ element }) => {
  const token = localStorage.getItem('authToken');
  return token ? element : <Navigate to="/login" />; // Redirect to login if no token
};

export default RequireAuth;
