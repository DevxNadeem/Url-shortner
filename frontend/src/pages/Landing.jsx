import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-badge">URL Shortener</div>
        <h1 className="hero-title">
          Long URLs are<br />
          <span className="accent-text">noise.</span>
        </h1>
        <p className="hero-sub">
          Snip turns bloated links into clean, shareable URLs — instantly.
          Track them, kill them, reuse them.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn-hero-primary">
            Start snipping →
          </Link>
          <Link to="/login" className="btn-hero-ghost">
            Log in
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Instant</h3>
          <p>Short URLs generated in milliseconds. No queue, no wait.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔐</span>
          <h3>Yours only</h3>
          <p>Every link is tied to your account. Nobody else sees your URLs.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🗑️</span>
          <h3>Full control</h3>
          <p>Delete links you no longer need. Clean up your history any time.</p>
        </div>
      </section>
    </div>
  );
}
