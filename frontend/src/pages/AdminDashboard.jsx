import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Building2, BriefcaseBusiness, Trophy, ClipboardList, ArrowRight, TrendingUp } from "lucide-react";
import { api } from "../api";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, companies: 0, opportunities: 0, applications: 0, selected: 0 });

  useEffect(() => {
    api.adminStats().then(setStats).catch(() => {});
  }, []);

  const placementRate = stats.applications > 0
    ? Math.round((stats.selected / stats.applications) * 100)
    : 0;

  return (
    <>
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Placement Overview"
        description="Monitor students, recruiters, applications and final placement outcomes."
      />

      <div className="stats-grid">
        <StatCard icon={<Users />} value={stats.students} label="Students" />
        <StatCard icon={<Building2 />} value={stats.companies} label="Companies" />
        <StatCard icon={<BriefcaseBusiness />} value={stats.opportunities} label="Placement Drives" />
        <StatCard icon={<Trophy />} value={stats.selected} label="Students Selected" />
      </div>

      <div className="stats-grid" style={{ marginTop: "1rem" }}>
        <StatCard icon={<ClipboardList />} value={stats.applications} label="Total Applications" />
        <StatCard icon={<TrendingUp />} value={`${placementRate}%`} label="Placement Rate" />
      </div>

      <div className="admin-cards">
        <Link className="admin-card" to="/admin/students">
          <Users />
          <div><h3>Student Management</h3><p>View registered students and academic profiles.</p></div>
          <ArrowRight />
        </Link>
        <Link className="admin-card" to="/admin/companies">
          <Building2 />
          <div><h3>Company Management</h3><p>View recruiters and their placement drives.</p></div>
          <ArrowRight />
        </Link>
        <Link className="admin-card" to="/admin/applications">
          <ClipboardList />
          <div><h3>Applications & Results</h3><p>Monitor applications and final placement status.</p></div>
          <ArrowRight />
        </Link>
      </div>
    </>
  );
}
