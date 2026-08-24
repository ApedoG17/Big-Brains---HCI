import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "./useReveal";

const SERVICES = [
  {
    num: "01",
    title: "Architectural Planning & CAD Blueprints",
    tag: "Concept to Construction Blueprints",
    desc: "Comprehensive 2D & 3D parametric floor plans, site terrain elevation models, and structural CAD blueprints prepared for immediate engineering execution.",
    turnaround: "2 - 3 Weeks",
    output: "DWG / IFC / BIM Models",
  },
  {
    num: "02",
    title: "Interior Spatial Styling & 4K Renders",
    tag: "Custom Aesthetics & Material Sourcing",
    desc: "Bespoke interior space planning, lighting design, custom furniture engineering, and physical material specifications for high-end developments.",
    turnaround: "1 - 2 Weeks",
    output: "4K Photorealistic Renders",
  },
  {
    num: "03",
    title: "Sustainable & Eco-Resilient Design",
    tag: "Net-Zero & Biophilic Focus",
    desc: "Eco-conscious architectural engineering leveraging passive solar ventilation, rainwater harvesting, and low-carbon local materials.",
    turnaround: "2 - 4 Weeks",
    output: "LEED / GreenStar Spec",
  },
];

function ServiceRow({ s, index }) {
  const [wrapRef, visible] = useReveal();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={wrapRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: visible ? `${index * 90}ms` : "0ms",
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
          display: "grid",
          gridTemplateColumns: "80px 1fr 280px",
          gap: "32px",
          alignItems: "center",
          boxShadow: isHovered ? "0 20px 40px rgba(249, 115, 22, 0.1)" : "0 10px 30px rgba(0,0,0,0.02)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.25s ease",
        }}
      >
        <div style={{ fontSize: "2rem", fontWeight: "900", color: "#f97316" }}>[{s.num}]</div>
        <div>
          <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#f97316", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {s.tag}
          </span>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", margin: "6px 0 10px 0" }}>{s.title}</h3>
          <p style={{ color: "#64748b", margin: 0, lineHeight: 1.6, fontSize: "0.95rem" }}>{s.desc}</p>
        </div>
        <div style={{ borderLeft: "1px solid #f1f5f9", paddingLeft: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700" }}>Turnaround</div>
            <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>{s.turnaround}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700" }}>Deliverable Output</div>
            <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>{s.output}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "120px 24px 80px 24px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            SERVICE MODULES
          </span>
          <h1 style={{ fontSize: "3.2rem", fontWeight: "900", letterSpacing: "-0.03em", marginTop: "4px" }}>
            Architectural Offerings
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "8px", maxWidth: "600px" }}>
            Structured capabilities designed for residential, commercial, and mixed-use developments.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {SERVICES.map((s, index) => (
            <ServiceRow key={s.num} s={s} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
<div style={{
  marginTop:"50px",
  textAlign:"center"
}}>

<Link
to="/consultation/book"
style={{
background:"#f97316",
color:"white",
padding:"15px 30px",
borderRadius:"30px",
textDecoration:"none",
fontWeight:"800"
}}
>
Book Consultation →
</Link>

</div>