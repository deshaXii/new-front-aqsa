import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../features/auth/authStore.js";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
