import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BriefcaseBusiness,
  Trophy,
  XCircle,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { api } from "../api";
import { getStoredUser } from "../utils/auth";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import OpportunityCard from "../components/OpportunityCard";

export default function StudentDashboard() {
  const user = getStoredUser();
  const [applications, setApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    Promise.all([api.myApplications(), api.opportunities()])
      .then(([a, o]) => { setApplications(a); setOpportunities(o); })
      .catch(() => {});
  }, []);

  const eligible = opportunities.filter(o => o.eligible);
  const selected = applications.filter(a => a.status === "Selected").length;
  const shortlisted = applications.filter(a => a.status === "Shortlisted").length;

  return (
    <>
      <PageHeader
        eyebrow="STUDENT DASHBOARD"
        title={`Welcome, ${user?.name}`}
        description="Track your placement journey from one place."
      />

      <div className="stats-grid">
        <StatCard icon={<GraduationCap />} value={user?.branch || "—"} label="Branch" />
        <StatCard icon={<BarChart3 />} value={user?.year || "—"} label="Year" />
        <StatCard icon={<Trophy />} value={user?.cgpa ?? "—"} label="CGPA" />
        <StatCard icon={<XCircle />} value={user?.backlogs ?? 0} label="Backlogs" />
      </div>

      {/* Application Summary */}
      <div className="stats-grid" style={{ marginTop: "1rem" }}>
        <StatCard icon={<BriefcaseBusiness />} value={applications.length} label="Total Applications" />
        <StatCard icon={<Trophy />} value={selected} label="Selected" />
        <StatCard icon={<BarChart3 />} value={shortlisted} label="Shortlisted" />
        <StatCard icon={<GraduationCap />} value={eligible.length} label="Eligible Drives" />
      </div>

      <section className="dashboard-panel">
        <div>
          <div className="panel-icon"><BriefcaseBusiness /></div>
          <h2>Your placement journey</h2>
          <p>Browse eligible opportunities, apply before deadlines and track your results here.</p>
        </div>
        <div className="journey-actions">
          <Link className="button primary" to="/student/drives">
            Browse Placement Drives <ArrowRight size={17} />
          </Link>
          <Link className="button secondary" to="/student/applications">
            View My Applications ({applications.length})
          </Link>
        </div>
      </section>

      <div className="section-title-row">
        <div>
          <h2>Recommended drives</h2>
          <p>Opportunities that match your academic profile.</p>
        </div>
        <Link className="text-link" to="/student/drives">View all</Link>
      </div>

      <div className="mini-grid">
        {eligible.slice(0, 3).map(o => (
          <OpportunityCard key={o._id} opportunity={o} compact />
        ))}
        {!eligible.length && (
          <div className="empty-state">No eligible drives are available right now.</div>
        )}
      </div>
    </>
  );
}
