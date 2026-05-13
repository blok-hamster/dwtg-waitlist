"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".phil-word", {
        opacity: 0.08,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: 0.06,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end: "bottom 55%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const line1 = "Most fragrances sell you a moment.";
  const line2Words = ["We", "sell", "you", "a", "position."];

  return (
    <section ref={sectionRef} id="philosophy" className="section-block">
      <div className="section-inner narrow">
        <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "rgba(118,8,8,0.3)", marginBottom: "3rem", lineHeight: 1.7 }}>
          {line1.split(" ").map((word, i) => (
            <span key={i} className="phil-word" style={{ display: "inline-block", marginRight: "0.3em" }}>
              {word}
            </span>
          ))}
        </p>

        <h2 style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", lineHeight: 1.15 }}>
          {line2Words.map((word, i) => (
            <span
              key={i}
              className={`phil-word ${word === "position." ? "font-drama" : "heading-serif"}`}
              style={{
                display: "inline-block",
                marginRight: "0.25em",
                color: word === "position." ? "#DE6F14" : "#760808",
                fontWeight: word === "position." ? 400 : 300,
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Decorative divider */}
        <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
          <div style={{ width: "50px", height: "1px", background: "rgba(118,8,8,0.08)" }} />
          <span className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(118,8,8,0.2)" }}>
            Crown & Vice
          </span>
          <div style={{ width: "50px", height: "1px", background: "rgba(118,8,8,0.08)" }} />
        </div>
      </div>
    </section>
  );
}
