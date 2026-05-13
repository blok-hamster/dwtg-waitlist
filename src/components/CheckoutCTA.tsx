"use client";

import Link from "next/link";

const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_CHECKOUT_PAGE === "true";

export default function CheckoutCTA() {
  if (!CHECKOUT_ENABLED) return null;

  return (
    <section className="section-block tight">
      <div style={{
        width: "100%",
        maxWidth: "700px",
        background: "#760808",
        borderRadius: "2rem",
        padding: "3rem 2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative corner accents */}
        <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", fontSize: "1.5rem", opacity: 0.15, color: "#FFFFF0" }}>♔</div>
        <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", fontSize: "1.5rem", opacity: 0.15, color: "#FFFFF0" }}>♕</div>

        <p className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,240,0.5)", marginBottom: "1rem" }}>
          Now Available
        </p>
        <h2 className="heading-serif" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 300, color: "#FFFFF0", lineHeight: 1.2, marginBottom: "0.75rem" }}>
          Crown & Vice is <span className="font-drama" style={{ color: "#DE6F14" }}>live.</span>
        </h2>
        <p style={{ color: "rgba(255,255,240,0.5)", fontSize: "0.85rem", maxWidth: "380px", margin: "0 auto", lineHeight: 1.6 }}>
          The debut fragrance is here. Limited first run — secure yours before it&apos;s gone.
        </p>
        <Link
          href="/checkout"
          className="btn-magnetic"
          style={{
            display: "inline-block",
            marginTop: "2rem",
            padding: "1rem 2.5rem",
            borderRadius: "50px",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#760808",
            backgroundColor: "#FFFFF0",
            textDecoration: "none",
          }}
        >
          <span className="btn-slide" style={{ backgroundColor: "#DE6F14", borderRadius: "50px" }} />
          <span style={{ position: "relative", zIndex: 10 }}>Buy Now →</span>
        </Link>
      </div>
    </section>
  );
}
