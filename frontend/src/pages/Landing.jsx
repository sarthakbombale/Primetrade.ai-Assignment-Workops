import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import "../styles/Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      {/* HERO */}
      <section className="hero">
        <h1>
          Manage tasks like a <span>product team</span>
        </h1>

        <p>
          TaskFlow helps you organize, track, and complete tasks with a clean
          productivity-first workflow used by modern SaaS teams.
        </p>

        <div className="hero-actions">
          <button className="primary" onClick={() => navigate("/register")}>
            Start Free <ArrowRight size={16} />
          </button>

          <button onClick={() => navigate("/login")}>Sign In</button>
        </div>

        <div className="hero-badges">
          <div><CheckCircle size={16} /> No credit card</div>
          <div><CheckCircle size={16} /> Fast & lightweight</div>
          <div><CheckCircle size={16} /> Secure auth</div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <h3>Smart Task Tracking</h3>
          <p>Organize tasks with status, filters, and search.</p>
        </div>

        <div className="feature-card">
          <h3>Real-time UI</h3>
          <p>Instant updates with smooth UX interactions.</p>
        </div>

        <div className="feature-card">
          <h3>Productivity Focused</h3>
          <p>Built for speed, clarity, and execution.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} TaskFlow. Built for productivity.</p>
      </footer>
    </div>
  );
}