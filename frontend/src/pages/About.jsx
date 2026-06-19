import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-label">About Snip</div>
        <h1>Built for people who hate ugly URLs</h1>
        <p>
          Snip is a minimal URL shortener — no bloat, no analytics dashboards, no pricing tiers.
          You paste a long URL, get a short one, share it. That's it.
        </p>
        <p>
          Every link is tied to your account. You can delete what you don't need.
          No third-party trackers attached to your links.
        </p>

        <div className="about-stack">
          <span className="stack-label">Built with</span>
          <div className="stack-pills">
            <span className="pill">Node.js</span>
            <span className="pill">Express</span>
            <span className="pill">MongoDB</span>
            <span className="pill">React</span>
            <span className="pill">JWT</span>
          </div>
        </div>

        <Link to="/register" className="about-cta">
          Create a free account →
        </Link>
      </div>
    </div>
  );
}
