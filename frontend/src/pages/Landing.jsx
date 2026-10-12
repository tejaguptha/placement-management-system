import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Trophy,
  Users,
  BarChart3,
  Zap,
  Globe
} from "lucide-react";

function RoleCard({ icon, title, text }) {
  return (
    <div className="role-card">
      <div className="role-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function FeatureRow({ icon, title, text, reverse }) {
  return (
    <div className={`feature-row ${reverse ? "reverse" : ""}`}>
      <div className="feature-icon-box">{icon}</div>
      <div className="feature-text">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="landing">
      {/* Nav */}
      <header className="landing-nav">
        <Link className="brand" to="/">
          <span className="brand-icon"><GraduationCap size={21} /></span>
          <span>PlacementHub</span>
        </Link>
        <div className="nav-buttons">
          <Link className="button secondary" to="/login">Login</Link>
          <Link className="button primary" to="/register">Register</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">COLLEGE PLACEMENT MANAGEMENT</span>
          <h1>Turn placement chaos into a clean digital workflow.</h1>
          <p>
            Manage student eligibility, company opportunities, applications,
            shortlisting and final placement results from one professional web
            application.
          </p>
          <div className="hero-actions">
            <Link className="button primary large" to="/register">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link className="button secondary large" to="/login">Sign In</Link>
          </div>
        </div>

        <div className="role-preview">
          <RoleCard icon={<GraduationCap />} title="Students" text="Register, maintain profiles, view eligible drives and apply." />
          <RoleCard icon={<Building2 />} title="Companies" text="Post jobs with CGPA, backlog, branch and year criteria." />
          <RoleCard icon={<ShieldCheck />} title="Administrator" text="Monitor candidates, applications and placement results." />
          <RoleCard icon={<CheckCircle2 />} title="Auto Eligibility" text="Eligibility is calculated from each company's criteria automatically." />
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing-stats">
        <div className="landing-stat">
          <span className="landing-stat-value">500+</span>
          <span className="landing-stat-label">Students Placed</span>
        </div>
        <div className="landing-stat">
          <span className="landing-stat-value">80+</span>
          <span className="landing-stat-label">Partner Companies</span>
        </div>
        <div className="landing-stat">
          <span className="landing-stat-value">₹45 LPA</span>
          <span className="landing-stat-label">Highest Package</span>
        </div>
        <div className="landing-stat">
          <span className="landing-stat-value">95%</span>
          <span className="landing-stat-label">Placement Rate</span>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="section-label">HOW IT WORKS</div>
        <h2 className="section-heading">Everything you need, in one place</h2>
        <div className="features-list">
          <FeatureRow
            icon={<Users size={32} />}
            title="Smart Student Profiles"
            text="Students register with branch, year, CGPA and backlog data. The system auto-calculates eligibility for every company's specific criteria."
          />
          <FeatureRow
            icon={<Building2 size={32} />}
            title="Streamlined Company Drives"
            text="Companies post placement drives with detailed eligibility filters, packages and deadlines. Manage candidates through a clean recruiter dashboard."
            reverse
          />
          <FeatureRow
            icon={<Trophy size={32} />}
            title="Real-time Results Tracking"
            text="Admins monitor applications, update shortlist or final selection status, and generate instant placement outcome reports."
          />
          <FeatureRow
            icon={<Zap size={32} />}
            title="One-click Application"
            text="Eligible students apply with a single click. Application history and status updates are tracked in real time on the student dashboard."
            reverse
          />
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Ready to streamline your campus placements?</h2>
        <p>Join PlacementHub and connect students with their dream careers.</p>
        <div className="hero-actions">
          <Link className="button primary large" to="/register">
            Create Free Account <ArrowRight size={18} />
          </Link>
          <Link className="button secondary large" to="/login">Sign In</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <Link className="brand" to="/">
          <span className="brand-icon"><GraduationCap size={18} /></span>
          <span>PlacementHub</span>
        </Link>
        <p className="footer-copy">© {new Date().getFullYear()} PlacementHub. All rights reserved.</p>
      </footer>
    </div>
  );
}
