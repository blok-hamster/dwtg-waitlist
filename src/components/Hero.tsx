"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      tl.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.08,
      });

      tl.from(
        ".hero-cta",
        { y: 30, opacity: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      tl.from(
        ".hero-image",
        { scale: 0.9, opacity: 0, duration: 1.6, ease: "power3.out" },
        "-=1.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-block hero-block">
      <div className="section-inner">
        {/* Kicker */}
        <p className="hero-line font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#DE6F14", marginBottom: "2rem" }}>
          A fragrance duo is coming
        </p>

        {/* Logo mark */}
        <div className="hero-image" style={{ marginBottom: "2.5rem" }}>
          <Image
            src="/assets/crown_and_vice_logo.png"
            alt="Crown & Vice"
            width={220}
            height={220}
            style={{ width: "180px", height: "auto", filter: "drop-shadow(0 20px 60px rgba(118,8,8,0.12))" }}
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="hero-line heading-serif" style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#760808" }}>
          Power is
        </h1>
        <h1 className="hero-line font-drama" style={{ fontSize: "clamp(3rem, 10vw, 6.5rem)", lineHeight: 1, color: "#760808" }}>
          Intentional.
        </h1>

        {/* Sub */}
        <p className="hero-line" style={{ color: "rgba(118,8,8,0.5)", fontSize: "0.95rem", maxWidth: "420px", marginTop: "2rem", lineHeight: 1.7 }}>
          Introducing Crown & Vice — the debut fragrance duo from Dami Wande The Great.
          Two scents. One philosophy.
          <br />
          Arriving soon.
        </p>

        {/* CTA */}
        <div className="hero-cta" style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-magnetic"
            style={{ padding: "1rem 2.5rem", borderRadius: "50px", fontSize: "0.85rem", fontWeight: 600, color: "#FFFFF0", backgroundColor: "#760808" }}
          >
            <span className="btn-slide" style={{ backgroundColor: "#DE6F14", borderRadius: "50px" }} />
            <span style={{ position: "relative", zIndex: 10 }}>Join The Gambit List →</span>
          </button>
          <span className="font-mono" style={{ color: "rgba(118,8,8,0.25)", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
            Early access only
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <span className="font-mono" style={{ color: "rgba(118,8,8,0.25)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(118,8,8,0.2), transparent)" }} className="animate-pulse" />
      </div>
    </section>
  );
}
