import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getStoredUser } from "./utils/auth";

// Layout
import DashboardShell from "./components/DashboardShell";

// Public Pages
import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";

// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import StudentDrives from "./pages/StudentDrives";
import StudentApplications from "./pages/StudentApplications";

// Company Pages
import CompanyDashboard from "./pages/CompanyDashboard";
import PostOpportunity from "./pages/PostOpportunity";
import CompanyOpportunities from "./pages/CompanyOpportunities";
import CompanyApplicants from "./pages/CompanyApplicants";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminCompanies from "./pages/AdminCompanies";
import AdminApplications from "./pages/AdminApplications";

// Shared Page
import Profile from "./pages/Profile";

function ProtectedLayout() {
  const user = getStoredUser();
  if (!user || !localStorage.getItem("placement_token")) {
    return <Navigate to="/login" replace />;
  }
  return <DashboardShell />;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />

      {/* Protected — all under DashboardShell layout */}
      <Route element={<ProtectedLayout />}>
        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/drives" element={<StudentDrives />} />
        <Route path="/student/applications" element={<StudentApplications />} />
        <Route path="/student/profile" element={<Profile />} />

        {/* Company */}
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/company/post" element={<PostOpportunity />} />
        <Route path="/company/opportunities" element={<CompanyOpportunities />} />
        <Route path="/company/applicants" element={<CompanyApplicants />} />
        <Route path="/company/profile" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
