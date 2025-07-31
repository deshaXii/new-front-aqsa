import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./features/auth/LoginPage.jsx";
import RepairsPage from "./features/repairs/RepairsPage.jsx";
import NewRepairPage from "./features/repairs/NewRepairPage.jsx";
import EditRepairPage from "./pages/repairs/EditRepairPage.jsx";
import RepairDetailsPage from "./pages/repairs/RepairDetailsPage.jsx";
import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx";
import TechniciansPage from "./features/technicians/TechniciansPage.jsx";
import InvoicesPage from "./features/invoices/InvoicesPage.jsx";
import BackupPage from "./features/backup/BackupPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/repairs" element={<RepairsPage />} />
        <Route path="/repairs/new" element={<NewRepairPage />} />
        <Route path="/repairs/:id" element={<RepairDetailsPage />} />
        <Route path="/repairs/:id/edit" element={<EditRepairPage />} />
        <Route path="/technicians" element={<TechniciansPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/backup" element={<BackupPage />} />
      </Route>
    </Routes>
  );
};

export default App;
