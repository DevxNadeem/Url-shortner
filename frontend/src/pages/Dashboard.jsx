import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const API = "http://localhost:3000";

export default function Dashboard() {
  const { user } = useAuth();
  const [longUrl, setLongUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [newUrl, setNewUrl] = useState(null);

  const fetchUrls = useCallback(async () => {
    try {
      setFetchLoading(true);
      const res = await fetch(`${API}/urls`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUrls(Array.isArray(data) ? data : []);
      }
    } catch {
      // silently handle — no GET all urls endpoint in backend
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return;
    setError("");
    setLoading(true);
    setNewUrl(null);
    try {
      const res = await fetch(`${API}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ longUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to shorten URL");
      setNewUrl(data);
      setUrls((prev) => [
        {
          ShortUrl: data.shortUrl.split("/").pop(),
          LongUrl: data.longUrl,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          _fresh: true,
        },
        ...prev,
      ]);
      setLongUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortCode, id) => {
    try {
      const res = await fetch(`${API}/delete/${shortCode}`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUrls((prev) => prev.filter((u) => u._id !== id));
        if (newUrl && newUrl.shortUrl.endsWith(shortCode)) setNewUrl(null);
      }
    } catch {
      setError("Failed to delete URL");
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const truncate = (str, n = 45) =>
    str.length > n ? str.slice(0, n) + "…" : str;

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="dashboard">
      <div className="dash-header">
        <h1>Your links</h1>
        <p className="dash-sub">
          Shorten a URL and share it anywhere.
        </p>
      </div>

      <div className="shorten-box">
        <form className="shorten-form" onSubmit={handleShorten}>
          <input
            type="url"
            className="shorten-input"
            placeholder="Paste your long URL here…"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
          <button className="shorten-btn" type="submit" disabled={loading}>
            {loading ? "Snipping…" : "Snip it"}
          </button>
        </form>

        {error && <div className="error-msg" style={{ marginTop: "12px" }}>{error}</div>}

        {newUrl && (
          <div className="new-url-result">
            <span className="result-label">Your short link</span>
            <div className="result-row">
              <a
                href={newUrl.shortUrl}
                className="result-link"
                target="_blank"
                rel="noreferrer"
              >
                {newUrl.shortUrl}
              </a>
              <button
                className={`copy-btn ${copiedId === "new" ? "copied" : ""}`}
                onClick={() => handleCopy(newUrl.shortUrl, "new")}
              >
                {copiedId === "new" ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="urls-section">
        <div className="urls-header">
          <span className="urls-count">
            {urls.length} {urls.length === 1 ? "link" : "links"}
          </span>
        </div>

        {fetchLoading ? (
          <div className="empty-state">
            <div className="spinner" />
          </div>
        ) : urls.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔗</span>
            <p>No links yet. Snip your first URL above.</p>
          </div>
        ) : (
          <div className="url-list">
            {urls.map((url) => {
              const shortCode = url.ShortUrl;
              const fullShort = `${API}/${shortCode}`;
              const isCopied = copiedId === url._id;

              return (
                <div
                  className={`url-card ${url._fresh ? "url-card--fresh" : ""}`}
                  key={url._id}
                >
                  <div className="url-card-main">
                    <div className="url-short-row">
                      <a
                        href={fullShort}
                        className="url-short"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {fullShort}
                      </a>
                      {url._fresh && <span className="badge-new">New</span>}
                    </div>
                    <div className="url-long" title={url.LongUrl}>
                      {truncate(url.LongUrl)}
                    </div>
                    {url.createdAt && (
                      <div className="url-date">{formatDate(url.createdAt)}</div>
                    )}
                  </div>
                  <div className="url-card-actions">
                    <button
                      className={`copy-btn ${isCopied ? "copied" : ""}`}
                      onClick={() => handleCopy(fullShort, url._id)}
                    >
                      {isCopied ? "✓ Copied" : "Copy"}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(shortCode, url._id)}
                      title="Delete this link"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
