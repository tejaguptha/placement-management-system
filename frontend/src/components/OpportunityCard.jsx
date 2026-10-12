import React from "react";
import { Building2, Trophy, Clock3, ArrowRight } from "lucide-react";

export default function OpportunityCard({ opportunity: o, onApply, compact = false }) {
  const deadline = o.deadline ? new Date(o.deadline).toLocaleDateString() : "—";
  const company = o.company?.companyName || o.company?.name || "Company";

  return (
    <article className={`opportunity-card ${compact ? "compact" : ""}`}>
      <div className="opportunity-main">
        <div className="company-logo">{company.charAt(0)}</div>
        <div>
          <h3>{o.title}</h3>
          <p className="company-name">{company}</p>
        </div>
      </div>

      {!compact && (
        <>
          <p className="opportunity-description">{o.description}</p>

          <div className="opportunity-meta">
            <span><Building2 size={15} /> {o.location || "Not specified"}</span>
            <span><Trophy size={15} /> {o.package || "Not specified"}</span>
            <span><Clock3 size={15} /> Deadline: {deadline}</span>
          </div>

          <div className="eligibility">
            <strong>Eligibility</strong>
            <span>CGPA ≥ {o.eligibility?.minCGPA ?? 0}</span>
            <span>Backlogs ≤ {o.eligibility?.maxBacklogs ?? 0}</span>
            <span>Year ≥ {o.eligibility?.minYear ?? 1}</span>
            <span>{o.eligibility?.branches?.length ? o.eligibility.branches.join(", ") : "All branches"}</span>
          </div>
        </>
      )}

      <div className="opportunity-footer">
        {o.eligible !== undefined && (
          <span className={o.eligible ? "eligible-badge" : "not-eligible-badge"}>
            {o.eligible ? "Eligible" : "Not eligible"}
          </span>
        )}
        {onApply && (
          <button className="button primary" disabled={!o.eligible} onClick={onApply}>
            Apply Now <ArrowRight size={16} />
          </button>
        )}
      </div>
    </article>
  );
}
