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
    } catch (error: any) {
      console.error("Error adding document: ", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="success-message text-center">
        <p>You&apos;re In.</p>
        <p className="success-sub">
          Watch your inbox for early access, private releases, and future moves from DWTG.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="waitlist-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="email-input"
          disabled={status === "loading"}
          required
        />
        <button 
          type="submit" 
          className="cta-button"
          disabled={status === "loading"}
        >
          {status === "loading" ? "PROCESSING..." : "YOUR MOVE"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-[var(--color-burgundy)] mt-2 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
