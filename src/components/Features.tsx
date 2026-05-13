"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FragranceReveal() {
  const [active, setActive] = useState(0);
  const layers = ["Top — Bergamot & Black Pepper", "Heart — Oud & Iris", "Base — Amber & Musk"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % layers.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {layers.map((layer, i) => {
        const offset = ((i - active + layers.length) % layers.length);
        return (
          <div
            key={layer}
            className="font-mono"
            style={{
              position: "absolute",
              width: "200px",
              padding: "0.75rem 1rem",
              borderRadius: "1rem",
              border: "1px solid rgba(118,8,8,0.08)",
              background: "#FFFFF0",
              textAlign: "center",
              fontSize: "0.7rem",
              color: "rgba(118,8,8,0.6)",
              transform: `translateY(${offset * 22}px) scale(${1 - offset * 0.04})`,
              opacity: offset === 0 ? 1 : 0.35,
              zIndex: layers.length - offset,
              transition: "all 0.7s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow: offset === 0 ? "0 6px 20px rgba(118,8,8,0.04)" : "none",
            }}
          >
            {layer}
          </div>
        );
      })}
    </div>
  );
}

function DualityPulse() {
  const [side, setSide] = useState<"crown" | "vice">("crown");

  useEffect(() => {
    const interval = setInterval(() => {
      setSide((prev) => (prev === "crown" ? "vice" : "crown"));
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
      <div style={{ textAlign: "center", transition: "all 0.7s", opacity: side === "crown" ? 1 : 0.25, transform: side === "crown" ? "scale(1)" : "scale(0.92)" }}>
        <span style={{ fontSize: "1.75rem" }}>♔</span>
        <p className="font-mono" style={{ fontSize: "0.65rem", marginTop: "0.5rem", color: "rgba(118,8,8,0.5)" }}>Crown</p>
        <p style={{ fontSize: "0.6rem", color: "rgba(118,8,8,0.25)", marginTop: "0.2rem" }}>Authority</p>
      </div>
      <div style={{ width: "1px", height: "40px", background: "rgba(118,8,8,0.08)" }} />
      <div style={{ textAlign: "center", transition: "all 0.7s", opacity: side === "vice" ? 1 : 0.25, transform: side === "vice" ? "scale(1)" : "scale(0.92)" }}>
        <span style={{ fontSize: "1.75rem" }}>♕</span>
        <p className="font-mono" style={{ fontSize: "0.65rem", marginTop: "0.5rem", color: "#DE6F14" }}>Vice</p>
        <p style={{ fontSize: "0.6rem", color: "rgba(118,8,8,0.25)", marginTop: "0.2rem" }}>Indulgence</p>
      </div>
    </div>
  );
}

function CountdownPulse() {
  const [dots, setDots] = useState<boolean[]>(Array(9).fill(false));

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setDots((prev) => {
        const next = [...prev];
        next[idx % 9] = !next[idx % 9];
        return next;
      });
      idx++;
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
        {dots.map((active, i) => (
          <div
            key={i}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              border: `1px solid ${active ? "rgba(222,111,20,0.4)" : "rgba(118,8,8,0.08)"}`,
              background: active ? "rgba(222,111,20,0.15)" : "transparent",
              transform: active ? "scale(1.15)" : "scale(1)",
              transition: "all 0.5s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const cards = [
  {
    num: "01",
    title: "Every Move is Intentional",
    subtitle: "Strategic drops — no noise, no filler.",
    Component: FragranceReveal,
  },
  {
    num: "02",
    title: "Duality by Design",
    subtitle: "Two scents, one philosophy. Crown commands. Vice seduces.",
    Component: DualityPulse,
  },
  {
    num: "03",
    title: "The Gambit List",
    subtitle: "Early access. Private releases. You move first.",
    Component: CountdownPulse,
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="world" className="section-block">
      <div className="section-inner">
        <p className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#DE6F14", marginBottom: "0.75rem" }}>
          The World
        </p>
        <h2 className="heading-serif" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 300, color: "#760808", marginBottom: "4rem", maxWidth: "500px", lineHeight: 1.3 }}>
          A fragrance built on <span className="font-drama">strategy,</span> not spectacle.
        </h2>

        <div className="cards-grid">
          {cards.map(({ num, title, subtitle, Component }, i) => (
            <div key={i} className="feature-card card">
              <span className="font-mono" style={{ fontSize: "0.6rem", color: "rgba(118,8,8,0.2)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {num}
              </span>
              <div style={{ margin: "1.5rem 0" }}>
                <Component />
              </div>
              <h3 className="heading-sans" style={{ fontSize: "1.05rem", fontWeight: 600, color: "#760808" }}>{title}</h3>
              <p style={{ color: "rgba(118,8,8,0.4)", fontSize: "0.85rem", marginTop: "0.5rem", lineHeight: 1.5 }}>{subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
