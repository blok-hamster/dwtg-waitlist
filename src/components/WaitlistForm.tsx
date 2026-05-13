"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await addDoc(collection(db, "waitlist"), {
        email,
        timestamp: serverTimestamp(),
      });
      setStatus("success");
    } catch (error: unknown) {
      console.error("Error adding document: ", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center" }}>
        <p className="font-drama" style={{ fontSize: "1.5rem", color: "#760808" }}>
          You&apos;re In.
        </p>
        <p style={{ color: "rgba(118,8,8,0.4)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
          Watch your inbox. The next move is yours.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="email-input font-mono"
          style={{
            width: "100%",
            padding: "1rem 1.25rem",
            background: "#FFFFF0",
            border: "1px solid rgba(118,8,8,0.1)",
            borderRadius: "1rem",
            color: "#760808",
            fontSize: "0.85rem",
            outline: "none",
            transition: "all 0.3s ease",
          }}
          disabled={status === "loading"}
          required
        />
        <button
          type="submit"
          className="btn-magnetic"
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "1rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#FFFFF0",
            backgroundColor: "#760808",
            letterSpacing: "0.05em",
            opacity: status === "loading" ? 0.5 : 1,
            cursor: status === "loading" ? "not-allowed" : "pointer",
          }}
          disabled={status === "loading"}
        >
          <span className="btn-slide" style={{ backgroundColor: "#DE6F14", borderRadius: "1rem" }} />
          <span style={{ position: "relative", zIndex: 10 }}>
            {status === "loading" ? "PROCESSING..." : "YOUR MOVE →"}
          </span>
        </button>
      </form>
      {status === "error" && (
        <p style={{ color: "#DE6F14", marginTop: "0.75rem", fontSize: "0.75rem", textAlign: "center" }}>{errorMessage}</p>
      )}
    </div>
  );
}
