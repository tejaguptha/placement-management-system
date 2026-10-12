import React from "react";

export default function Field({ label, error, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}
