import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span className="logo-icon">⚡</span>
        <span className="logo-text">Snip</span>
      </Link>

      <div className="nav-links">
        <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
          About
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
              Dashboard
            </Link>
            <button className="nav-btn-logout" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={`nav-link ${isActive("/login") ? "active" : ""}`}>
              Log in
            </Link>
            <Link to="/register" className="nav-btn-cta">
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
