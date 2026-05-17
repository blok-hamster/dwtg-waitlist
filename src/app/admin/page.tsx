"use client";

import { useState } from "react";

interface WaitlistEntry {
  id: string;
  email: string;
  timestamp: Date | null;
}

interface WaitlistEntryResponse {
  id: string;
  email: string;
  timestamp: string | null;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await fetchData(password);
    setIsAuthenticated(ok);
  };

  const fetchData = async (adminPassword: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: adminPassword }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        setError(payload?.error ?? "Failed to fetch data.");
        return false;
      }

      const rawEntries: WaitlistEntryResponse[] = payload?.entries ?? [];
      const data: WaitlistEntry[] = rawEntries.map((entry) => ({
        id: entry.id,
        email: entry.email,
        timestamp: entry.timestamp ? new Date(entry.timestamp) : null,
      }));

      setEntries(data);
      return true;
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    setExporting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/waitlist/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setError(payload?.error ?? "Failed to export data.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fileName = `dwtg_waitlist_${new Date().toISOString().split("T")[0]}.csv`;

      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting data:", err);
      setError("Failed to export data. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--color-cream)" }}>
        <form onSubmit={handleLogin} className="waitlist-section" style={{ position: "relative", top: 0 }}>
          <h1 className="title-sub mb-8 text-[var(--color-burgundy)]">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
            className="email-input mb-4"
          />
          <button type="submit" className="cta-button">LOGIN</button>
          {error && <p className="text-[var(--color-burgundy)] mt-4">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container" style={{ minHeight: "100vh", backgroundColor: "var(--color-cream)", color: "var(--color-burgundy)" }}>
      <div className="admin-header">
        <div>
          <h1 className="title-sub" style={{ margin: 0 }}>Gambit List - Admin</h1>
          <p style={{ marginTop: "0.5rem" }}>Total Signups: {entries.length}</p>
        </div>
        <button onClick={exportToCSV} className="cta-button" disabled={entries.length === 0 || exporting}>
          {exporting ? "EXPORTING..." : "EXPORT CSV"}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Date Signed Up</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={2} style={{ textAlign: "center", padding: "2rem" }}>No entries yet.</td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.email}</td>
                  <td>{entry.timestamp ? entry.timestamp.toLocaleString() : "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}