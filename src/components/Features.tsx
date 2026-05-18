"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FragranceReveal() {
  const [activeNote, setActiveNote] = useState(0);
  const noteBlocks = [
    {
      name: "Crown",
      notes: [
        { label: "Top Notes", value: "Rum, Bitter Orange, Grapefruit" },
        { label: "Heart Notes", value: "Rose, Patchouli, Cedar" },
        { label: "Base Notes", value: "Agarwood (Oud), Olibanum, Oakmoss" },
      ],
    },
    {
      name: "Vice",
      notes: [
        { label: "Top Notes", value: "Sandalwood, Saffron, Raspberry" },
        { label: "Heart Notes", value: "Bergamot, Cashmeran, Lemon" },
        { label: "Base Notes", value: "White musk, Rum, Tobacco" },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNote((prev) => (prev + 1) % 3);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1.25rem", alignItems: "start" }}>
      {noteBlocks.map((block) => (
        <div key={block.name} style={{ textAlign: "left" }}>
          <p className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(118,8,8,0.5)", marginBottom: "0.6rem" }}>
            {block.name}
          </p>
          {block.notes.map((note, index) => (
            <p
              key={note.label}
              style={{
                fontSize: "0.65rem",
                color: index === activeNote ? "rgba(118,8,8,0.8)" : "rgba(118,8,8,0.45)",
                lineHeight: 1.5,
                marginBottom: "0.5rem",
                transform: index === activeNote ? "translateX(4px)" : "translateX(0)",
                transition: "all 0.6s ease",
              }}
            >
              <span className="font-mono" style={{ letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(118,8,8,0.3)" }}>
                {note.label}:
              </span>{" "}
              {note.value}
            </p>
          ))}
        </div>
      ))}
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
        <p style={{ fontSize: "0.6rem", color: "rgba(118,8,8,0.25)", marginTop: "0.2rem" }}>Restraint</p>
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
    title: "Duality by Design",
    subtitle: "Two expressions of power: restraint and indulgence.",
    Component: DualityPulse,
  },
  {
    num: "02",
    title: "Every Move is Intentional",
    subtitle: "Precision in every layer.",
    Component: FragranceReveal,
  },
  {
    num: "03",
    title: "The Gambit List",
    subtitle: (
      <>
        Early access. Private releases.
        <br />
        You move first.
      </>
    ),
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
          Fragrances built on <span className="font-drama">strategy,</span>
          <br />
          not spectacle.
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
