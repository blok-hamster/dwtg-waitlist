"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Papa from "papaparse";

interface WaitlistEntry {
  id: string;
  email: string;
  timestamp: Date | null;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError("Incorrect password");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "waitlist"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const data: WaitlistEntry[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          email: docData.email,
          timestamp: docData.timestamp ? docData.timestamp.toDate() : null,
        });
      });
      setEntries(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Ensure Firebase config is correct.");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvData = entries.map((entry) => ({
      Email: entry.email,
      "Signed Up At": entry.timestamp ? entry.timestamp.toLocaleString() : "Unknown",
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `dwtg_waitlist_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <button onClick={exportToCSV} className="cta-button" disabled={entries.length === 0}>
          EXPORT CSV
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
