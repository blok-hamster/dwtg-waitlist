"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "calc(100% - 2rem)",
        maxWidth: "1000px",
        padding: "0 1.5rem",
        height: "56px",
        borderRadius: "50px",
        transition: "all 0.7s ease",
        background: scrolled ? "rgba(255, 255, 240, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 8px 32px rgba(118,8,8,0.06)" : "none",
        border: scrolled ? "1px solid rgba(118,8,8,0.06)" : "1px solid transparent",
      }}
    >
      <Image
        src="/assets/logo.png"
        alt="DWTG"
        width={120}
        height={40}
        style={{ height: "110px", width: "auto", objectFit: "contain", marginTop: "-30px", marginBottom: "-30px" }}
        priority
      />

      <div style={{ display: "flex", alignItems: "center", gap: "2rem", fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase" }} className="hidden-mobile">
        <button onClick={() => scrollTo("world")} className="lift-hover" style={{ color: "rgba(118,8,8,0.4)", background: "none", border: "none", cursor: "pointer" }}>
          The World
        </button>
        <button onClick={() => scrollTo("philosophy")} className="lift-hover" style={{ color: "#DE6F14", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
          Crown & Vice
        </button>
        <button onClick={() => scrollTo("protocol")} className="lift-hover" style={{ color: "rgba(118,8,8,0.4)", background: "none", border: "none", cursor: "pointer" }}>
          Protocol
        </button>
      </div>

      <button
        onClick={() => scrollTo("join")}
        className="btn-magnetic"
        style={{ padding: "0.5rem 1.25rem", borderRadius: "50px", fontSize: "0.75rem", fontWeight: 600, color: "#FFFFF0", backgroundColor: "#760808" }}
      >
        <span className="btn-slide" style={{ backgroundColor: "#DE6F14", borderRadius: "50px" }} />
        <span style={{ position: "relative", zIndex: 10 }}>Join The Gambit List</span>
      </button>
    </nav>
  );
}
