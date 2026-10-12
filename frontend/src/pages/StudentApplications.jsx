import React, { useEffect, useState } from "react";
import { api } from "../api";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";

export default function StudentApplications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.myApplications().then(setItems).catch(() => {});
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="APPLICATIONS"
        title="My Applications"
        description="Track every placement application and its current status."
      />

      <div className="application-list">
        {items.map(a => (
          <div className="application-card" key={a._id}>
            <div className="app-card-left">
              <div className="company-logo-sm">
                {(a.opportunity?.company?.companyName || "C").charAt(0)}
              </div>
              <div>
                <span className="eyebrow">{a.opportunity?.company?.companyName || "Company"}</span>
                <h3>{a.opportunity?.title}</h3>
                <p className="app-meta">
                  {a.opportunity?.location && <span>{a.opportunity.location}</span>}
                  {a.opportunity?.package && <span>{a.opportunity.package}</span>}
                </p>
                <p className="app-date">Applied on {new Date(a.appliedAt || a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
            </div>
            <StatusBadge status={a.status} />
          </div>
        ))}
        {!items.length && (
          <div className="empty-state">You have not submitted any applications yet.</div>
        )}
      </div>
    </>
  );
}
