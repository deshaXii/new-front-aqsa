import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import NotificationBell from "../components/NotificationBell.jsx";
import useAuthStore from "../features/auth/authStore.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

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
        <h1 className="font-bold text-xl">الأقصي ستور</h1>
        <div className="flex items-center gap-4">
          {/* <NotificationBell /> */}
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            تسجيل الخروج
          </button>
        </div>
      </header>

      <nav className="navbar bg-gray-200 dark:bg-gray-700 p-2 flex gap-[5px] sm:gap-3.5 justify-center text-sm font-semibold">
        <NavLink
          to="/repairs"
          className={({ isActive }) =>
            `${isActive ? "active" : ""} text-[12px] sm:text-[16px]`
          }
        >
          الصيانات
        </NavLink>

        {user?.role === "admin" && (
          <>
            <NavLink
              to="/technicians"
              className={({ isActive }) =>
                `${isActive ? "active" : ""} text-[12px] sm:text-[16px]`
              }
            >
              الفنيين
            </NavLink>

            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                `${isActive ? "active" : ""} text-[12px] sm:text-[16px]`
              }
            >
              الفواتير
            </NavLink>

            <NavLink
              to="/accounts"
              className={({ isActive }) =>
                `${isActive ? "active" : ""} text-[12px] sm:text-[16px]`
              }
            >
              الحسابات
            </NavLink>

            <NavLink
              to="/backup"
              className={({ isActive }) =>
                `${isActive ? "active" : ""} text-[12px] sm:text-[16px]`
              }
            >
              النسخ الاحتياطي
            </NavLink>
          </>
        )}
      </nav>

      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
