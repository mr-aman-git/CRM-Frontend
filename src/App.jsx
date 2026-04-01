import PWABadge from "./PWABadge.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import ProtectedRoute from "./api/ProtectedRoute.jsx";

import LeadsUpload from "./components/uploads-leads/LeadsUpload.jsx";
import Leads from "./components/leads/Leads.jsx";
import Staff from "./components/staff/Staff.jsx";
import StaffPage from "./components/staff/sepratePage/StaffPage.jsx";
import MyLeads from "./components/staff/staff-leads/MyLeads.jsx";
function App() {
  return (
    <>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          {/* 1. Public Routes (Bina Sidebar ke) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/upload-leads" element={<LeadsUpload />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/my-leads" element={<MyLeads />} />
                    <Route path="staff/:id" element={<StaffPage />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <PWABadge />
    </>
  );
}

export default App;
