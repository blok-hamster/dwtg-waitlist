"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-block">
      <div className="footer-inner">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", textAlign: "center" }}>
          {/* Brand */}
          <div>
            <Image
              src="/assets/logo.png"
              alt="DWTG"
              width={100}
              height={40}
              style={{ height: "70px", width: "auto", objectFit: "contain", margin: "0 auto 1rem" }}
            />
            <p style={{ color: "rgba(118,8,8,0.3)", fontSize: "0.85rem", maxWidth: "300px", margin: "0 auto", lineHeight: 1.6 }}>
              Crown & Vice — the debut fragrance duo from Dami Wande The Great. Two scents. One philosophy.
            </p>
          </div>

          {/* Nav + Legal row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div>
              <h4 className="font-mono" style={{ color: "rgba(118,8,8,0.25)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Navigate
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem", color: "rgba(118,8,8,0.4)" }}>
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="lift-hover" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>Home</button></li>
                <li><button onClick={() => document.getElementById("world")?.scrollIntoView({ behavior: "smooth" })} className="lift-hover" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>The World</button></li>
                <li><button onClick={() => document.getElementById("protocol")?.scrollIntoView({ behavior: "smooth" })} className="lift-hover" style={{ background: "none", border: "none", cursor: "pointer", color: "inherit" }}>Protocol</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(118,8,8,0.04)", display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.6rem", color: "rgba(118,8,8,0.2)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(222,111,20,0.5)" }} className="animate-pulse" />
            Gambit List Active
          </div>
          <p className="font-mono" style={{ fontSize: "0.6rem", color: "rgba(118,8,8,0.15)" }}>
            © 2026 Dami Wande The Great. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
