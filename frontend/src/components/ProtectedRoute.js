// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('authToken');
  return token ? <Navigate to="/" /> : element; // Redirect to home if token exists
};

export default ProtectedRoute;
