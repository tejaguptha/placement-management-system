import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { api } from "../api";
import PageHeader from "../components/PageHeader";
import Field from "../components/Field";

const JOB_TYPES = ["Full Time", "Internship", "Internship + Full Time"];

const BRANCH_OPTIONS = [
  "CSE", "CST", "IT", "ECE", "EEE", "MECH", "CIVIL", "AIDS", "AI&ML", "Data Science"
];

export default function PostOpportunity() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    package: "",
    jobType: "Full Time",
    deadline: "",
    minCGPA: 7,
    maxBacklogs: 0,
    branches: [],
    minYear: 3
  });

  const update = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleBranch = branch => {
    setForm(prev => ({
      ...prev,
      branches: prev.branches.includes(branch)
        ? prev.branches.filter(b => b !== branch)
        : [...prev.branches, branch]
    }));
  };

  const submit = async e => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await api.createOpportunity({
        ...form,
        branches: form.branches.join(",")
      });
      setMessage("Opportunity posted successfully!");
      setTimeout(() => navigate("/company/opportunities"), 700);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate a future min date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <PageHeader
        eyebrow="RECRUITER"
        title="Post Opportunity"
        description="Create a placement drive and define clear eligibility criteria."
      />

      <form className="panel form-stack" onSubmit={submit}>
        <div className="form-section-title">
          <h2>Opportunity Details</h2>
          <p>Give students enough information to understand the role.</p>
        </div>

        <div className="field-grid">
          <Field label="Job Title">
            <input name="title" value={form.title} onChange={update} required placeholder="e.g. Software Engineer" />
          </Field>
          <Field label="Job Type">
            <select name="jobType" value={form.jobType} onChange={update}>
              {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Job Description">
          <textarea
            name="description"
            value={form.description}
            onChange={update}
            required
            rows={4}
            placeholder="Describe the role, responsibilities and required skills..."
          />
        </Field>

        <div className="field-grid">
          <Field label="Location">
            <input name="location" value={form.location} onChange={update} placeholder="Hyderabad / Remote" />
          </Field>
          <Field label="Package / Stipend">
            <input name="package" value={form.package} onChange={update} placeholder="₹8 LPA" />
          </Field>
        </div>

        <div className="field-grid">
          <Field label="Application Deadline">
            <input type="date" name="deadline" value={form.deadline} onChange={update} required min={today} />
          </Field>
          <Field label="Minimum Year of Study">
            <input type="number" name="minYear" value={form.minYear} onChange={update} min="1" max="6" />
          </Field>
        </div>

        <div className="form-section-title" style={{ marginTop: "1.5rem" }}>
          <h2>Eligibility Criteria</h2>
          <p>Students are automatically marked eligible based on these criteria.</p>
        </div>

        <div className="field-grid">
          <Field label="Minimum CGPA">
            <input type="number" step="0.1" name="minCGPA" value={form.minCGPA} onChange={update} min="0" max="10" />
          </Field>
          <Field label="Maximum Backlogs Allowed">
            <input type="number" name="maxBacklogs" value={form.maxBacklogs} onChange={update} min="0" />
          </Field>
        </div>

        <div className="field">
          <span>Eligible Branches <small>(leave empty for all branches)</small></span>
          <div className="branch-selector">
            {BRANCH_OPTIONS.map(b => (
              <button
                key={b}
                type="button"
                className={`branch-chip ${form.branches.includes(b) ? "selected" : ""}`}
                onClick={() => toggleBranch(b)}
              >
                {b}
              </button>
            ))}
          </div>
          {form.branches.length > 0 && (
            <p className="branch-selected-text">Selected: {form.branches.join(", ")}</p>
          )}
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <button className="button primary submit-button" disabled={loading}>
          {loading ? "Publishing..." : "Publish Placement Drive"} <ArrowRight size={17} />
        </button>
      </form>
    </>
  );
}
