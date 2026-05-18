"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaitlistForm from "./WaitlistForm";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-inner", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="join" className="section-block">
      <div className="cta-card cta-inner">
        <p className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#DE6F14", marginBottom: "1rem" }}>
          Your Move
        </p>
        <h2 className="heading-serif" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 300, color: "#760808", lineHeight: 1.2 }}>
          Enter the <span className="font-drama">Gambit List.</span>
        </h2>
        <p style={{ color: "rgba(118,8,8,0.4)", marginTop: "1.25rem", fontSize: "0.9rem", maxWidth: "380px", margin: "1.25rem auto 0", lineHeight: 1.7 }}>
          First access to Crown & Vice.
          <br />
          Private releases. Campaign drops.
          <br />
          Future moves from Dami Wande The Great.
        </p>

        <div style={{ marginTop: "2.5rem", maxWidth: "360px", marginLeft: "auto", marginRight: "auto" }}>
          <WaitlistForm />
        </div>

        <p className="font-mono" style={{ color: "rgba(118,8,8,0.15)", fontSize: "0.6rem", marginTop: "2rem", letterSpacing: "0.15em" }}>
          No spam. No noise. Only signal.
        </p>
      </div>
    </section>
  );
}
