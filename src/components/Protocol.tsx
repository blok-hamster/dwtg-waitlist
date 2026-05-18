"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ChessMoves() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".chess-orbit", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 200 200" style={{ width: "100px", height: "100px", margin: "0 auto" }}>
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(118,8,8,0.06)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(118,8,8,0.04)" strokeWidth="0.5" />
      <g className="chess-orbit">
        <circle cx="100" cy="20" r="4" fill="rgba(118,8,8,0.2)" />
        <circle cx="180" cy="100" r="4" fill="rgba(222,111,20,0.3)" />
        <circle cx="100" cy="180" r="4" fill="rgba(118,8,8,0.2)" />
        <circle cx="20" cy="100" r="4" fill="rgba(222,111,20,0.3)" />
      </g>
      <text x="100" y="108" textAnchor="middle" fontSize="28" fill="rgba(118,8,8,0.12)" fontFamily="serif">♔</text>
    </svg>
  );
}

function ScentWave() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let frame: number;
    let t = 0;
    const animate = () => {
      t += 0.02;
      const points: string[] = [];
      for (let x = 0; x <= 200; x += 2) {
        const y = 50 + Math.sin((x * 0.04) + t) * 15 * Math.sin(t * 0.3) +
                  Math.sin((x * 0.02) + t * 1.2) * 8;
        points.push(`${x === 0 ? "M" : "L"}${x},${y}`);
      }
      if (pathRef.current) {
        pathRef.current.setAttribute("d", points.join(" "));
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg viewBox="0 0 200 100" style={{ width: "100%", height: "80px", opacity: 0.6 }}>
      <path ref={pathRef} fill="none" stroke="rgba(118,8,8,0.15)" strokeWidth="1.5" />
    </svg>
  );
}

function AnticipationDots() {
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".a-dot", {
        opacity: 0.6,
        scale: 1.4,
        duration: 1.2,
        ease: "power2.inOut",
        stagger: { each: 0.2, repeat: -1, yoyo: true },
      });
    }, dotsRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={dotsRef} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="a-dot"
          style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(118,8,8,0.12)" }}
        />
      ))}
    </div>
  );
}

const steps = [
  {
    step: "I",
    title: "The Opening",
    desc: "Every move begins with restraint. We study the board, culture, timing, and desire before placing a single piece.",
    Visual: ChessMoves,
  },
  {
    step: "II",
    title: "The Gambit",
    desc: "A deliberate sacrifice of hype for substance. Crown & Vice are not announced. They are discovered. The Gambit List is the only way in.",
    Visual: ScentWave,
  },
  {
    step: "III",
    title: "The Endgame",
    desc: "When the fragrances enter play, it won't feel like a reveal. Those on the list will have known it was coming.",
    Visual: AnticipationDots,
  },
];

export default function Protocol() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      steps.forEach((_, i) => {
        gsap.from(`.protocol-card-${i}`, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.protocol-card-${i}`,
            start: "top 80%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="protocol" className="section-block">
      <div className="section-inner">
        <p className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#DE6F14", marginBottom: "0.75rem" }}>
          The Protocol
        </p>
        <h2 className="heading-serif" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 300, color: "#760808", marginBottom: "4rem", lineHeight: 1.3 }}>
          How we <span className="font-drama">move.</span>
        </h2>

        <div className="protocol-list">
          {steps.map(({ step, title, desc, Visual }, i) => (
            <div key={i} className={`protocol-card-${i} protocol-step`}>
              <div style={{ flex: 1 }}>
                <span className="font-drama" style={{ color: "rgba(118,8,8,0.2)", fontSize: "1.1rem" }}>{step}</span>
                <h3 className="heading-serif" style={{ fontSize: "1.4rem", color: "#760808", marginTop: "0.5rem", fontWeight: 400 }}>
                  {title}
                </h3>
                <p style={{ color: "rgba(118,8,8,0.4)", marginTop: "0.75rem", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  {desc}
                </p>
              </div>
              <div style={{ flexShrink: 0, width: "140px" }}>
                <Visual />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
