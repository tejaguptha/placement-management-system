import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { api } from "../api";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

export default function AdminApplications() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const load = () => api.allApplications().then(setItems).catch(e => setMessage(e.message));

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.updateApplicationStatus(id, status);
      load();
    } catch (e) {
      setMessage(e.message);
    }
  };

  const filtered = items
    .filter(a => {
      const text = `${a.student?.name} ${a.student?.email} ${a.opportunity?.title} ${a.opportunity?.company?.companyName}`.toLowerCase();
      return text.includes(query.toLowerCase());
    })
    .filter(a => statusFilter === "all" || a.status === statusFilter);

  const counts = {
    all: items.length,
    Applied: items.filter(a => a.status === "Applied").length,
    Shortlisted: items.filter(a => a.status === "Shortlisted").length,
    Selected: items.filter(a => a.status === "Selected").length,
    Rejected: items.filter(a => a.status === "Rejected").length
  };

  return (
    <>
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Applications & Results"
        description="Monitor and update final placement results across all companies."
      />

      {message && <div className="error-message">{message}</div>}

      <div className="drives-toolbar">
        <div className="search-bar">
          <Search size={18} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by student, company, or role..."
          />
        </div>
        <div className="filter-tabs">
          {[["all", `All (${counts.all})`], ["Applied", `Applied (${counts.Applied})`], ["Shortlisted", `Shortlisted (${counts.Shortlisted})`], ["Selected", `Selected (${counts.Selected})`], ["Rejected", `Rejected (${counts.Rejected})`]].map(
            ([val, label]) => (
              <button
                key={val}
                className={`filter-tab ${statusFilter === val ? "active" : ""}`}
                onClick={() => setStatusFilter(val)}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Company</th>
                <th>Role</th>
                <th>CGPA</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Update Result</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a._id}>
                  <td><strong>{a.student?.name}</strong><small>{a.student?.email}</small></td>
                  <td>{a.opportunity?.company?.companyName || a.opportunity?.company?.name}</td>
                  <td>{a.opportunity?.title}</td>
                  <td>{a.student?.cgpa}</td>
                  <td>{a.student?.branch}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td>
                    <div className="table-actions">
                      <button className="mini-button" onClick={() => updateStatus(a._id, "Shortlisted")}>Shortlist</button>
                      <button className="mini-button success" onClick={() => updateStatus(a._id, "Selected")}>Select</button>
                      <button className="mini-button danger" onClick={() => updateStatus(a._id, "Rejected")}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!filtered.length && <div className="empty-state">No applications found.</div>}
      </div>
    </>
  );
}
