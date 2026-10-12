import React from "react";
import { Link, NavLink, useNavigate, Outlet } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  BriefcaseBusiness,
  ClipboardList,
  UserRound,
  Building2,
  PlusCircle,
  Users,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { getStoredUser, clearSession } from "../utils/auth";

export default function DashboardShell() {
  const user = getStoredUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const logout = () => {
    clearSession();
    navigate("/login");
  };

  const groups = {
    student: [
      ["/student", "Overview", LayoutDashboard],
      ["/student/drives", "Placement Drives", BriefcaseBusiness],
      ["/student/applications", "My Applications", ClipboardList],
      ["/student/profile", "My Profile", UserRound]
    ],
    company: [
      ["/company", "Overview", LayoutDashboard],
      ["/company/post", "Post Opportunity", PlusCircle],
      ["/company/opportunities", "My Opportunities", BriefcaseBusiness],
      ["/company/applicants", "Applicants", Users],
      ["/company/profile", "Company Profile", Building2]
    ],
    admin: [
      ["/admin", "Overview", LayoutDashboard],
      ["/admin/students", "Students", Users],
      ["/admin/companies", "Companies", Building2],
      ["/admin/applications", "Applications & Results", ClipboardList]
    ]
  };

  const links = groups[user?.role] || [];

  return (
    <div className="app">
      <header className="topbar">
        <Link className="brand" to={`/${user?.role || ""}`}>
          <span className="brand-icon"><GraduationCap size={21} /></span>
          <span>PlacementHub</span>
        </Link>

        <div className="top-actions">
          <div className="user-chip">
            <div className="avatar">{user?.name?.charAt(0)?.toUpperCase()}</div>
            <div className="user-meta">
              <strong>{user?.name}</strong>
              <span>{user?.role}</span>
            </div>
          </div>

          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <button className="logout-button" onClick={logout}>
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
          <div className="sidebar-heading">
            {user?.role === "student" && "STUDENT"}
            {user?.role === "company" && "RECRUITER"}
            {user?.role === "admin" && "ADMINISTRATION"}
          </div>

          <nav className="sidebar-nav">
            {links.map(([to, label, Icon]) => (
              <NavLink
                key={to}
                to={to}
                end={to === `/${user?.role}`}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
