import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { api } from "../api";
import PageHeader from "../components/PageHeader";

export default function AdminStudents() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => { api.students().then(setItems).catch(() => {}); }, []);

  const filtered = items.filter(s =>
    `${s.name} ${s.email} ${s.branch}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Students"
        description={`${items.length} registered student profiles.`}
      />

      <div className="search-bar" style={{ marginBottom: "1.25rem" }}>
        <Search size={18} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search students..." />
      </div>

      <div className="table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Year</th>
                <th>CGPA</th>
                <th>Backlogs</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s._id}>
                  <td>{i + 1}</td>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.email}</td>
                  <td><span className="branch-chip-sm">{s.branch}</span></td>
                  <td>{s.year}</td>
                  <td>
                    <span className={`cgpa-badge ${s.cgpa >= 8 ? "high" : s.cgpa >= 6.5 ? "mid" : "low"}`}>
                      {s.cgpa}
                    </span>
                  </td>
                  <td>
                    <span className={s.backlogs === 0 ? "backlog-zero" : "backlog-some"}>
                      {s.backlogs}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!filtered.length && <div className="empty-state">No students found.</div>}
      </div>
    </>
  );
}
