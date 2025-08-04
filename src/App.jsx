import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout.jsx";

// Auth
import LoginPage from "./features/auth/LoginPage.jsx";
import ProtectedRoute from "./features/auth/ProtectedRoute.jsx";

// Repairs
import RepairsPage from "./features/repairs/RepairsPage.jsx";
import NewRepairPage from "./features/repairs/NewRepairPage.jsx";
import EditRepairPage from "./features/repairs/EditRepairPage.jsx";
import RepairDetailsPage from "./features/repairs/RepairDetailsPage.jsx";

// Technicians
import TechniciansPage from "./features/technicians/TechniciansPage.jsx";

// Invoices
import InvoicesPage from "./features/invoices/InvoicesPage.jsx";

// Backup
import BackupPage from "./features/backup/BackupPage.jsx";

// Notifications
import NotificationsPage from "./features/notifications/NotificationsPage.jsx";
import AccountsPage from "./features/accounts/AccountsPage.jsx";

const App = () => {
  return (
    <Routes>
      {/* إعادة توجيه الرئيسية لصفحة تسجيل الدخول */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* جميع الصفحات المحمية داخل MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          element={
            <ProtectedRoute adminOnly>
              <BackupPage />
            </ProtectedRoute>
          }
          path="/backup"
        />
        <Route
          element={
            <ProtectedRoute adminOnly>
              <AccountsPage />
            </ProtectedRoute>
          }
          path="/accounts"
        />
        <Route
          element={
            <ProtectedRoute adminOnly>
              <InvoicesPage />
            </ProtectedRoute>
          }
          path="/invoices"
        />
        <Route
          element={
            <ProtectedRoute adminOnly>
              <TechniciansPage />
            </ProtectedRoute>
          }
          path="/technicians"
        />
        <Route path="/repairs" element={<RepairsPage />} />
        <Route path="/repairs/new" element={<NewRepairPage />} />
        <Route path="/repairs/:id" element={<RepairDetailsPage />} />
        <Route path="/repairs/:id/edit" element={<EditRepairPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
