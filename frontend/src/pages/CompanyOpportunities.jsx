import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Trash2, BriefcaseBusiness } from "lucide-react";
import { api } from "../api";
import PageHeader from "../components/PageHeader";

export default function CompanyOpportunities() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const load = () => api.myOpportunities().then(setItems).catch(e => setMessage(e.message));

  useEffect(() => { load(); }, []);

  const remove = async id => {
    if (!window.confirm("Delete this opportunity and all its applications?")) return;
    try {
      await api.deleteOpportunity(id);
      load();
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="RECRUITER"
        title="My Opportunities"
        description="Review and manage your placement drives."
        action={
          <Link className="button primary" to="/company/post">
            <PlusCircle size={17} /> New Drive
          </Link>
        }
      />

      {message && <div className="error-message">{message}</div>}

      <div className="opportunity-list">
        {items.map(o => {
          const isOpen = new Date(o.deadline) >= new Date();
          return (
            <article className="opportunity-card" key={o._id}>
              <div className="opportunity-main">
                <div className="company-logo">
                  <BriefcaseBusiness size={20} />
                </div>
                <div>
                  <h3>{o.title}</h3>
                  <p className="company-name">{o.location} · {o.package} · {o.jobType}</p>
                </div>
              </div>

              <p className="opportunity-description">{o.description}</p>

              <div className="eligibility">
                <strong>Eligibility</strong>
                <span>CGPA ≥ {o.eligibility?.minCGPA}</span>
                <span>Backlogs ≤ {o.eligibility?.maxBacklogs}</span>
                <span>Year ≥ {o.eligibility?.minYear}</span>
                <span>{o.eligibility?.branches?.length ? o.eligibility.branches.join(", ") : "All branches"}</span>
              </div>

              <div className="opportunity-footer">
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span className={isOpen ? "status-open" : "status-closed"}>
                    {isOpen ? "Open" : "Closed"}
                  </span>
                  <span className="deadline-text">
                    Deadline: {new Date(o.deadline).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <button className="button danger" onClick={() => remove(o._id)}>
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </article>
          );
        })}
        {!items.length && (
          <div className="empty-state">You have not posted any opportunities yet.</div>
        )}
      </div>
    </>
  );
}
