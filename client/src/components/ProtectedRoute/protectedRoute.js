import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminContext } from '../../App';

const ProtectedRoute = () => {
  const { admin } = useContext(AdminContext);
  const isAuthenticated = () => !!admin.token;

  return isAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" replace/>
};

export default ProtectedRoute;