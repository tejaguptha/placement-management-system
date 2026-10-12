import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { api } from "../api";
import PageHeader from "../components/PageHeader";
import OpportunityCard from "../components/OpportunityCard";

export default function StudentDrives() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | eligible | noteligible
  const [message, setMessage] = useState("");
  const [appliedIds, setAppliedIds] = useState(new Set());

  const load = () =>
    api.opportunities().then(data => {
      setItems(data);
    }).catch(e => setMessage(e.message));

  useEffect(() => {
    load();
    api.myApplications()
      .then(apps => setAppliedIds(new Set(apps.map(a => a.opportunity?._id))))
      .catch(() => {});
  }, []);

  const apply = async id => {
    setMessage("");
    try {
      await api.apply(id);
      setMessage("Application submitted successfully!");
      setAppliedIds(prev => new Set([...prev, id]));
    } catch (e) {
      setMessage(e.message);
    }
  };

  const filtered = items
    .filter(o => {
      const text = `${o.title} ${o.company?.companyName || o.company?.name || ""}`.toLowerCase();
      return text.includes(query.toLowerCase());
    })
    .filter(o => {
      if (filter === "eligible") return o.eligible;
      if (filter === "noteligible") return !o.eligible;
      return true;
    });

  return (
    <>
      <PageHeader
        eyebrow="OPPORTUNITIES"
        title="Placement Drives"
        description="Find opportunities that match your academic profile."
      />

      <div className="drives-toolbar">
        <div className="search-bar">
          <Search size={18} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by company or role..."
          />
        </div>
        <div className="filter-tabs">
          {[["all", "All Drives"], ["eligible", "Eligible"], ["noteligible", "Not Eligible"]].map(
            ([val, label]) => (
              <button
                key={val}
                className={`filter-tab ${filter === val ? "active" : ""}`}
                onClick={() => setFilter(val)}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      {message && (
        <div className={message.toLowerCase().includes("success") ? "success-message" : "error-message"}>
          {message}
        </div>
      )}

      <div className="opportunity-list">
        {filtered.map(o => (
          <OpportunityCard
            key={o._id}
            opportunity={{ ...o, applied: appliedIds.has(o._id) }}
            onApply={appliedIds.has(o._id) ? undefined : () => apply(o._id)}
          />
        ))}
        {!filtered.length && <div className="empty-state">No placement drives found.</div>}
      </div>
    </>
  );
}
