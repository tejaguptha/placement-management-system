import React, { useState } from "react";
import { api } from "../api";
import { getStoredUser } from "../utils/auth";
import PageHeader from "../components/PageHeader";
import Field from "../components/Field";

export default function Profile() {
  const initial = getStoredUser();
  const [form, setForm] = useState(initial || {});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const isStudent = initial?.role === "student";

  const update = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setIsError(false);
    try {
      const updated = await api.updateProfile(form);
      localStorage.setItem("placement_user", JSON.stringify({ ...initial, ...updated }));
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.message);
      setIsError(true);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow={isStudent ? "STUDENT PROFILE" : "COMPANY PROFILE"}
        title="My Profile"
        description="Keep your placement information accurate and up to date."
      />

      <form className="panel form-stack" onSubmit={submit}>
        {/* Avatar Header */}
        <div className="profile-header">
          <div className="large-avatar">{form.name?.charAt(0)?.toUpperCase()}</div>
          <div>
            <h2>{form.name}</h2>
            <p>{form.email}</p>
            <span className="role-pill">{form.role}</span>
          </div>
        </div>

        {/* Common Fields */}
        <div className="form-section-title">
          <h2>Personal Information</h2>
        </div>
        <div className="field-grid">
          <Field label="Full Name">
            <input name="name" value={form.name || ""} onChange={update} />
          </Field>
          <Field label="Phone Number">
            <input name="phone" value={form.phone || ""} onChange={update} />
          </Field>
        </div>

        {/* Student Fields */}
        {isStudent ? (
          <>
            <div className="form-section-title" style={{ marginTop: "1rem" }}>
              <h2>Academic Information</h2>
            </div>
            <div className="field-grid three">
              <Field label="Branch">
                <input name="branch" value={form.branch || ""} onChange={update} placeholder="e.g. CSE" />
              </Field>
              <Field label="Year">
                <input type="number" name="year" value={form.year || ""} onChange={update} min="1" max="6" />
              </Field>
              <Field label="CGPA">
                <input type="number" step="0.1" name="cgpa" value={form.cgpa || ""} onChange={update} min="0" max="10" />
              </Field>
            </div>
            <Field label="Active Backlogs">
              <input type="number" name="backlogs" value={form.backlogs ?? 0} onChange={update} min="0" />
            </Field>
          </>
        ) : (
          <>
            <div className="form-section-title" style={{ marginTop: "1rem" }}>
              <h2>Company Information</h2>
            </div>
            <Field label="Company Name">
              <input name="companyName" value={form.companyName || ""} onChange={update} />
            </Field>
            <Field label="Website">
              <input name="website" value={form.website || ""} onChange={update} placeholder="https://company.com" />
            </Field>
            <Field label="Company Description">
              <textarea name="description" value={form.description || ""} onChange={update} rows={3} />
            </Field>
          </>
        )}

        {message && (
          <div className={isError ? "error-message" : "success-message"}>{message}</div>
        )}

        <button className="button primary submit-button">Save Changes</button>
      </form>
    </>
  );
}
