import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";

const PILLARS = [
  { tag: "01 // PRECISION", title: "Blueprint & CAD Control", desc: "Centralized repository for parametric floor plans, site elevation layers, and technical documentation with revision tracking." },
  { tag: "02 // ACCREDITATION", title: "Vetted Lead Practices", desc: "Direct access to accredited practices, structural engineers, and spatial studios across West Africa." },
  { tag: "03 // TRANSPARENCY", title: "Real-Time Milestone Audits", desc: "Monitor physical site progress, verify contractor milestones, and approve design modifications in real time." },
];

function Pillar({ pillar, index }) {
  const [wrapRef, visible] = useReveal();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={wrapRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: visible ? `${index * 100}ms` : "0ms",
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: "#ffffff",
          borderRadius: "28px",
          padding: "36px",
          border: isHovered ? "1px solid #fdba74" : "1px solid #f1f5f9",
          boxShadow: isHovered ? "0 20px 40px rgba(249, 115, 22, 0.1)" : "0 10px 30px rgba(0,0,0,0.02)",
          transform: isHovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.25s ease",
          height: "100%",
        }}
      >
        <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#f97316" }}>{pillar.tag}</span>
        <h3 style={{ fontSize: "1.4rem", fontWeight: "800", margin: "12px 0" }}>{pillar.title}</h3>
        <p style={{ color: "#64748b", lineHeight: 1.6, fontSize: "0.95rem" }}>{pillar.desc}</p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", color: "#0f172a", minHeight: "100vh", padding: "120px 24px 80px 24px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 60px auto" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            ABOUT ARCHIVERSE
          </span>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "900", letterSpacing: "-0.03em", marginTop: "8px", lineHeight: 1.1 }}>
            Modern Architectural Lifecycle Management
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.15rem", marginTop: "16px", lineHeight: 1.6 }}>
            ArchiVerse connects visionary clients with accredited architectural practices. We eliminate disconnected emails in favor of a unified spatial lifecycle platform.
          </p>
        </div>

        <div style={{ height: "480px", borderRadius: "32px", overflow: "hidden", marginBottom: "60px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt="Modern Architectural Glass Villa"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <span
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              background: "rgba(15,23,42,0.75)",
              backdropFilter: "blur(8px)",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: "0.8rem",
              fontWeight: "600",
            }}
          >
            Parkview Heights Pavilion — Accra, Ghana
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", marginBottom: "80px" }}>
          {PILLARS.map((pillar, idx) => (
            <Pillar key={pillar.tag} pillar={pillar} index={idx} />
          ))}
        </div>

        <div style={{ background: "#ffffff", borderRadius: "32px", padding: "64px 48px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", letterSpacing: "-0.03em" }}>Ready to Start Building?</h2>
            <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "8px" }}>Create your workspace account as a Client or Architectural Firm.</p>
          </div>
          <Link
            to="/register"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "1.4rem",
              fontWeight: "bold",
              boxShadow: "0 6px 18px rgba(249, 115, 22, 0.4)",
            }}
          >
            ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
