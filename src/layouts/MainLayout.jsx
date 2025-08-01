import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NotificationBell from "../components/NotificationBell.jsx";
import useAuthStore from "../features/auth/authStore.js";

const MainLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">نظام صيانة الأجهزة</h1>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            تسجيل الخروج
          </button>
        </div>
      </header>

      <nav className="bg-gray-200 dark:bg-gray-700 p-2 flex gap-4 justify-center text-sm font-semibold">
        <Link to="/repairs" className="hover:underline">
          الصيانات
        </Link>
        {user?.role === "admin" && (
          <>
            <Link className="hover:underline" to="/technicians">
              الفنيين
            </Link>
            <Link className="hover:underline" to="/invoices">
              الفواتير
            </Link>
            <Link className="hover:underline" to="/backup">
              النسخ الاحتياطي
            </Link>
          </>
        )}
      </nav>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
