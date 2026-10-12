import React from "react";
import { Clock3, CheckCircle2, Trophy, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  const config = {
    Applied: ["status-applied", Clock3],
    Shortlisted: ["status-shortlisted", CheckCircle2],
    Selected: ["status-selected", Trophy],
    Rejected: ["status-rejected", XCircle]
  };

  const [className, Icon] = config[status] || config.Applied;

  return (
    <span className={`status-badge ${className}`}>
      <Icon size={14} /> {status}
    </span>
  );
}
