"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Philosophy from "../components/Philosophy";
import Protocol from "../components/Protocol";
import CTASection from "../components/CTASection";
import CheckoutCTA from "../components/CheckoutCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="page-wrapper">
      {/* Noise texture overlay */}
      <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <Navbar />
      <Hero />
      <div className="section-divider" />
      <Features />
      <div className="section-divider" />
      <Philosophy />
      <div className="section-divider" />
      <Protocol />
      <div className="section-divider" />
      <CheckoutCTA />
      <CTASection />
      <Footer />
    </div>
  );
}
