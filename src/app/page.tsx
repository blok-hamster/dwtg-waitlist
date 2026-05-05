"use client";

import Image from "next/image";
import ThreeBackground from "../components/ThreeBackground";
import WaitlistForm from "../components/WaitlistForm";

export default function Home() {
  const handleJoinClick = () => {
    // Scroll to the bottom to fully reveal the form via the ThreeBackground logic
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
    
    // Focus the input slightly after the scroll animation
    setTimeout(() => {
      const emailInput = document.querySelector(".email-input") as HTMLInputElement;
      if (emailInput) {
        emailInput.focus();
      }
    }, 800);
  };

  return (
    <main>
      <ThreeBackground />
      
      {/* This spacer provides the scrollable height to drive the animation */}
      <div className="scroll-spacer"></div>

      <div className="scroll-indicator">
        <span>Scroll to discover</span>
        <div className="scroll-arrow"></div>
      </div>

      <div className="content-overlay">
        
        <nav className="top-nav">
          <Image 
            src="/assets/logo.png" 
            alt="DWTG Logo" 
            width={160} 
            height={200} 
            className="nav-logo"
            priority
          />
          <div className="nav-links">
            <span>Campaign</span>
            <span className="active-link">Crown & Vice</span>
            <span>Archive</span>
            <span>About</span>
          </div>
          <button className="nav-cta-btn" onClick={handleJoinClick}>
            Join Waitlist &rarr;
          </button>
        </nav>

        <div className="main-content-grid">
          <div className="left-column">
            <Image 
              src="/assets/crown_and_vice_logo.png" 
              alt="Crown and Vice" 
              width={500} 
              height={500} 
              className="hero-product-image"
              style={{ width: "100%", maxWidth: "450px", height: "auto" }}
            />
          </div>
          
          <div className="right-column">
            <h1 className="hero-title">POWER</h1>
            <h1 className="hero-title">IS COMING</h1>
            <h1 className="hero-title">SOON!</h1>
            
            <div className="hero-caption">
              <span className="caption-icon">♔</span> Every move is intentional.
            </div>
            
            <div className="waitlist-description-new">
              <p>Introducing Crown & Vice — crafted for pure dominance.</p>
              <p>Join the Gambit List for early access to launches, private releases, and future moves from Dami Wande The Great.</p>
            </div>
            
            <div className="form-wrapper">
              <WaitlistForm />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
