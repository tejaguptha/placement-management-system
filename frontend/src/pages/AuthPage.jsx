import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { api } from "../api";
import { saveSession } from "../utils/auth";
import Field from "../components/Field";

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    branch: "CSE",
    year: 3,
    cgpa: 8,
    backlogs: 0,
    companyName: "",
    website: "",
    description: ""
  });

  const update = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data =
        mode === "login"
          ? await api.login({ email: form.email, password: form.password, role })
          : await api.register({ ...form, role });
      saveSession(data);
      navigate(`/${data.user.role}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link className="auth-brand" to="/">
        <span className="brand-icon"><GraduationCap size={21} /></span>
        PlacementHub
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow">{mode === "login" ? "WELCOME BACK" : "GET STARTED"}</span>
          <h1>{mode === "login" ? "Sign in to PlacementHub" : "Create your account"}</h1>
          <p>
            {mode === "login"
              ? "Choose your profile and continue to your dashboard."
              : "Choose a profile and enter the details required for your placement portal."}
          </p>
        </div>

        {/* Role Tabs */}
        <div className="profile-tabs">
          {[["student", GraduationCap, "Student"], ["company", Building2, "Company"], ["admin", ShieldCheck, "Admin"]].map(
            ([value, Icon, label]) => (
              <button
                key={value}
                className={role === value ? "profile-tab active" : "profile-tab"}
                onClick={() => setRole(value)}
                type="button"
              >
                <Icon size={17} /> {label}
              </button>
            )
          )}
        </div>

        {role === "admin" && mode === "register" ? (
          <div className="admin-register-note">
            <ShieldCheck size={24} />
            <div>
              <strong>Administrator registration is disabled.</strong>
              <p>Use the administrator credentials configured in the backend <code>.env</code> file.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="form-stack">
            {/* Register fields */}
            {mode === "register" && role !== "admin" && (
              <>
                <div className="field-grid">
                  <Field label={role === "company" ? "Contact Name" : "Full Name"}>
                    <input name="name" value={form.name} onChange={update} required placeholder={role === "company" ? "Recruiter name" : "Your full name"} />
                  </Field>
                  <Field label="Email">
                    <input type="email" name="email" value={form.email} onChange={update} required placeholder="you@example.com" />
                  </Field>
                </div>
                <div className="field-grid">
                  <Field label="Password">
                    <input type="password" name="password" value={form.password} onChange={update} required placeholder="Minimum 6 characters" minLength={6} />
                  </Field>
                  <Field label="Phone">
                    <input name="phone" value={form.phone} onChange={update} placeholder="Phone number" />
                  </Field>
                </div>

                {role === "student" ? (
                  <>
                    <div className="field-grid three">
                      <Field label="Branch">
                        <input name="branch" value={form.branch} onChange={update} placeholder="CSE" />
                      </Field>
                      <Field label="Year">
                        <input type="number" name="year" value={form.year} onChange={update} min="1" max="6" />
                      </Field>
                      <Field label="CGPA">
                        <input type="number" step="0.1" name="cgpa" value={form.cgpa} onChange={update} min="0" max="10" />
                      </Field>
                    </div>
                    <Field label="Backlogs">
                      <input type="number" name="backlogs" value={form.backlogs} onChange={update} min="0" />
                    </Field>
                  </>
                ) : (
                  <>
                    <Field label="Company Name">
                      <input name="companyName" value={form.companyName} onChange={update} required placeholder="Company name" />
                    </Field>
                    <div className="field-grid">
                      <Field label="Website">
                        <input name="website" value={form.website} onChange={update} placeholder="https://company.com" />
                      </Field>
                      <Field label="About Company">
                        <input name="description" value={form.description} onChange={update} placeholder="Short company description" />
                      </Field>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Login fields */}
            {mode === "login" && (
              <>
                <Field label="Email">
                  <input type="email" name="email" value={form.email} onChange={update} required placeholder="you@example.com" />
                </Field>
                <Field label="Password">
                  <input type="password" name="password" value={form.password} onChange={update} required placeholder="Your password" />
                </Field>
              </>
            )}

            {error && <div className="error-message">{error}</div>}

            <button className="button primary full" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>
        )}

        <div className="auth-footer">
          {mode === "login" ? (
            <>New here? <Link to="/register">Create an account</Link></>
          ) : (
            <>Already registered? <Link to="/login">Sign in</Link></>
          )}
        </div>
      </div>
    </div>
  );
}
