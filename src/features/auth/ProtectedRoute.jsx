import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../features/auth/authStore.js";
const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useAuthStore();
  const token = localStorage.getItem("token");
  const loginTime = localStorage.getItem("loginTime");

  // ✅ انتهاء صلاحية بعد ساعة
  if (token && loginTime) {
    const now = Date.now();
    if (now - parseInt(loginTime) > 3600000) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user?.role !== "admin")
    return <Navigate to="/backup" replace />;
  if (adminOnly && user?.role !== "admin")
    return <Navigate to="/technicians" replace />;
  return children;
};

export default ProtectedRoute;
