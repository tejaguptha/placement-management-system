import React, { useEffect, useState } from "react";
import { Search, Globe, Building2 } from "lucide-react";
import { api } from "../api";
import PageHeader from "../components/PageHeader";

export default function AdminCompanies() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => { api.companies().then(setItems).catch(() => {}); }, []);

  const filtered = items.filter(c =>
    `${c.companyName} ${c.name} ${c.email}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Companies"
        description={`${items.length} registered recruiter profiles.`}
      />

      <div className="search-bar" style={{ marginBottom: "1.25rem" }}>
        <Search size={18} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search companies..." />
      </div>

      <div className="table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Website</th>
                <th>About</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <div className="company-logo-sm">{(c.companyName || c.name || "C").charAt(0)}</div>
                      <strong>{c.companyName || c.name}</strong>
                    </div>
                  </td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>
                    {c.website ? (
                      <a href={c.website} target="_blank" rel="noreferrer" className="text-link" style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Globe size={13} /> Visit
                      </a>
                    ) : "—"}
                  </td>
                  <td>
                    <span className="desc-truncate">{c.description || "—"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!filtered.length && <div className="empty-state">No companies found.</div>}
      </div>
    </>
  );
}
