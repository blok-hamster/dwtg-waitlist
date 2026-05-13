"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

const CHECKOUT_ENABLED = process.env.NEXT_PUBLIC_CHECKOUT_PAGE === "true";

export default function CheckoutPage() {
  if (!CHECKOUT_ENABLED) {
    redirect("/");
  }

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [reference, setReference] = useState("");

  const PRODUCT_PRICE = 25000; // Amount in kobo (₦250.00)
  const PRODUCT_NAME = "Crown & Vice — Fragrance";

  const totalAmount = PRODUCT_PRICE * quantity;

  const formatPrice = (amountInKobo: number) => {
    return `₦${(amountInKobo / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  const generateReference = () => {
    return `CV_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  };

  const handlePayment = async () => {
    if (!email || !email.includes("@")) return;
    if (!name.trim()) return;
    if (!phone.trim() || !address.trim() || !city.trim() || !state.trim()) return;

    setStatus("processing");

    const PaystackPop = (await import("@paystack/inline-js")).default;
    const popup = new PaystackPop();

    const ref = generateReference();

    popup.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
      email,
      amount: totalAmount,
      currency: "NGN",
      ref,
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "customer_name", value: name },
          { display_name: "Phone", variable_name: "phone", value: phone },
          { display_name: "Delivery Address", variable_name: "delivery_address", value: `${address}, ${city}, ${state}` },
          { display_name: "Product", variable_name: "product", value: PRODUCT_NAME },
          { display_name: "Quantity", variable_name: "quantity", value: String(quantity) },
        ],
      },
      onSuccess: (transaction) => {
        setReference(transaction.reference);
        setStatus("success");
      },
      onCancel: () => {
        setStatus("idle");
      },
    });
  };

  if (status === "success") {
    return (
      <div className="page-wrapper" style={{ justifyContent: "center", minHeight: "100vh" }}>
        <div className="section-inner narrow" style={{ padding: "2rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ fontSize: "3rem" }}>♔</span>
          </div>
          <h1 className="heading-serif" style={{ fontSize: "2rem", color: "#760808", marginBottom: "1rem" }}>
            Payment Successful
          </h1>
          <p style={{ color: "rgba(118,8,8,0.5)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "360px" }}>
            Your order for {PRODUCT_NAME} has been confirmed. You&apos;ll receive a confirmation email shortly.
          </p>
          <p className="font-mono" style={{ color: "rgba(118,8,8,0.3)", fontSize: "0.7rem", marginTop: "1.5rem" }}>
            Reference: {reference}
          </p>
          <a href="/" style={{ display: "inline-block", marginTop: "2rem", color: "#DE6F14", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
            ← Back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="section-block" style={{ padding: "6rem 1.5rem 4rem" }}>
        <div className="section-inner narrow">
          {/* Header */}
          <Image
            src="/assets/crown_and_vice_logo.png"
            alt="Crown & Vice"
            width={100}
            height={100}
            style={{ width: "80px", height: "auto", marginBottom: "2rem" }}
          />
          <h1 className="heading-serif" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 300, color: "#760808", marginBottom: "0.5rem" }}>
            Checkout
          </h1>
          <p style={{ color: "rgba(118,8,8,0.4)", fontSize: "0.85rem", marginBottom: "3rem" }}>
            Complete your purchase of Crown & Vice
          </p>

          {/* Order Summary */}
          <div style={{
            width: "100%",
            maxWidth: "440px",
            border: "1px solid rgba(118,8,8,0.06)",
            borderRadius: "2rem",
            padding: "2rem",
            marginBottom: "2rem",
            background: "rgba(118,8,8,0.015)",
          }}>
            <h3 className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(118,8,8,0.3)", marginBottom: "1.25rem" }}>
              Order Summary
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontWeight: 500, color: "#760808", fontSize: "0.95rem" }}>{PRODUCT_NAME}</p>
                <p style={{ color: "rgba(118,8,8,0.4)", fontSize: "0.8rem", marginTop: "0.25rem" }}>Debut fragrance — Limited release</p>
              </div>
              <p style={{ fontWeight: 600, color: "#760808", fontSize: "0.95rem" }}>{formatPrice(PRODUCT_PRICE)}</p>
            </div>

            {/* Quantity */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid rgba(118,8,8,0.05)" }}>
              <span style={{ color: "rgba(118,8,8,0.5)", fontSize: "0.85rem" }}>Quantity</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid rgba(118,8,8,0.1)", background: "transparent", color: "#760808", cursor: "pointer", fontSize: "1rem" }}
                >
                  −
                </button>
                <span style={{ fontWeight: 600, color: "#760808", minWidth: "20px", textAlign: "center" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid rgba(118,8,8,0.1)", background: "transparent", color: "#760808", cursor: "pointer", fontSize: "1rem" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", marginTop: "1rem", borderTop: "1px solid rgba(118,8,8,0.08)" }}>
              <span style={{ fontWeight: 600, color: "#760808" }}>Total</span>
              <span style={{ fontWeight: 700, color: "#760808", fontSize: "1.2rem" }}>{formatPrice(totalAmount)}</span>
            </div>
          </div>

          {/* Customer Details Form */}
          <div style={{ width: "100%", maxWidth: "440px" }}>
            <h3 className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(118,8,8,0.3)", marginBottom: "1.25rem" }}>
              Your Details
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="font-mono"
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  background: "#FFFFF0",
                  border: "1px solid rgba(118,8,8,0.1)",
                  borderRadius: "1rem",
                  color: "#760808",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="font-mono"
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  background: "#FFFFF0",
                  border: "1px solid rgba(118,8,8,0.1)",
                  borderRadius: "1rem",
                  color: "#760808",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
                required
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="font-mono"
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  background: "#FFFFF0",
                  border: "1px solid rgba(118,8,8,0.1)",
                  borderRadius: "1rem",
                  color: "#760808",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
                required
              />
            </div>

            {/* Delivery Details */}
            <h3 className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(118,8,8,0.3)", marginBottom: "1.25rem", marginTop: "2rem" }}>
              Delivery Details
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address"
                className="font-mono"
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  background: "#FFFFF0",
                  border: "1px solid rgba(118,8,8,0.1)",
                  borderRadius: "1rem",
                  color: "#760808",
                  fontSize: "0.85rem",
                  outline: "none",
                }}
                required
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="font-mono"
                  style={{
                    width: "100%",
                    padding: "1rem 1.25rem",
                    background: "#FFFFF0",
                    border: "1px solid rgba(118,8,8,0.1)",
                    borderRadius: "1rem",
                    color: "#760808",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                  required
                />
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="font-mono"
                  style={{
                    width: "100%",
                    padding: "1rem 1.25rem",
                    background: "#FFFFF0",
                    border: "1px solid rgba(118,8,8,0.1)",
                    borderRadius: "1rem",
                    color: "#760808",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                  required
                />
              </div>

              <button
                onClick={handlePayment}
                disabled={status === "processing" || !email.includes("@") || !name.trim() || !phone.trim() || !address.trim() || !city.trim() || !state.trim()}
                className="btn-magnetic"
                style={{
                  width: "100%",
                  padding: "1.1rem",
                  borderRadius: "1rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#FFFFF0",
                  backgroundColor: "#760808",
                  marginTop: "0.5rem",
                  opacity: (status === "processing" || !email.includes("@") || !name.trim() || !phone.trim() || !address.trim() || !city.trim() || !state.trim()) ? 0.5 : 1,
                  cursor: (status === "processing" || !email.includes("@") || !name.trim() || !phone.trim() || !address.trim() || !city.trim() || !state.trim()) ? "not-allowed" : "pointer",
                }}
              >
                <span className="btn-slide" style={{ backgroundColor: "#DE6F14", borderRadius: "1rem" }} />
                <span style={{ position: "relative", zIndex: 10 }}>
                  {status === "processing" ? "Processing..." : `Pay ${formatPrice(totalAmount)}`}
                </span>
              </button>
            </div>

            <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(118,8,8,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-mono" style={{ fontSize: "0.6rem", color: "rgba(118,8,8,0.3)", letterSpacing: "0.1em" }}>
                Secured by Paystack
              </span>
            </div>
          </div>

          <a href="/" style={{ display: "inline-block", marginTop: "2.5rem", color: "rgba(118,8,8,0.4)", fontSize: "0.8rem", textDecoration: "none" }}>
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
