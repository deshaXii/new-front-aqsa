import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ToggleTheme from "../components/ThemeToggle.jsx";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">نظام صيانة الأجهزة</h1>
        <div className="flex items-center gap-4">
          <ToggleTheme />
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
        <Link to="/technicians" className="hover:underline">
          الفنيين
        </Link>
        <Link to="/invoices" className="hover:underline">
          الفواتير
        </Link>
        <Link to="/backup" className="hover:underline">
          النسخ الاحتياطي
        </Link>
      </nav>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
