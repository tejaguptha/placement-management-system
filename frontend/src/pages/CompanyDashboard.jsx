import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BriefcaseBusiness, Users, CheckCircle2, Clock3, PlusCircle, ArrowRight } from "lucide-react";
import { api } from "../api";
import { getStoredUser } from "../utils/auth";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";

export default function CompanyDashboard() {
  const user = getStoredUser();
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    Promise.all([api.myOpportunities(), api.companyApplications()])
      .then(([o, a]) => { setOpportunities(o); setApplications(a); })
      .catch(() => {});
  }, []);

  const selected = applications.filter(a => a.status === "Selected").length;
  const shortlisted = applications.filter(a => a.status === "Shortlisted").length;
  const rejected = applications.filter(a => a.status === "Rejected").length;

  return (
    <>
      <PageHeader
        eyebrow="RECRUITER DASHBOARD"
        title={`Welcome, ${user?.companyName || user?.name}`}
        description="Manage placement opportunities and candidate applications."
        action={
          <Link className="button primary" to="/company/post">
            <PlusCircle size={17} /> Post Opportunity
          </Link>
        }
      />

      <div className="stats-grid">
        <StatCard icon={<BriefcaseBusiness />} value={opportunities.length} label="Opportunities" />
        <StatCard icon={<Users />} value={applications.length} label="Applicants" />
        <StatCard icon={<CheckCircle2 />} value={selected} label="Selected" />
        <StatCard icon={<Clock3 />} value={shortlisted} label="Shortlisted" />
      </div>

      <section className="dashboard-panel">
        <div>
          <div className="panel-icon"><Users /></div>
          <h2>Candidate pipeline</h2>
          <p>Review applications, shortlist suitable candidates and update final results.</p>
        </div>
        <div className="journey-actions">
          <Link className="button secondary" to="/company/applicants">View Applicants</Link>
          <Link className="button secondary" to="/company/opportunities">Manage Drives</Link>
        </div>
      </section>

      {/* Recent applications preview */}
      {applications.length > 0 && (
        <>
          <div className="section-title-row">
            <div>
              <h2>Recent Applications</h2>
              <p>Latest candidates who applied to your drives.</p>
            </div>
            <Link className="text-link" to="/company/applicants">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="table-panel">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Drive</th>
                    <th>CGPA</th>
                    <th>Branch</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 5).map(a => (
                    <tr key={a._id}>
                      <td><strong>{a.student?.name}</strong><small>{a.student?.email}</small></td>
                      <td>{a.opportunity?.title}</td>
                      <td>{a.student?.cgpa}</td>
                      <td>{a.student?.branch}</td>
                      <td>
                        <span className={`status-badge status-${a.status?.toLowerCase()}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
