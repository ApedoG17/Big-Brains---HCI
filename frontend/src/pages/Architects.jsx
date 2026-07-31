import React, { useState, useRef, useCallback } from "react";
import { useReveal } from "./useReveal";

const ARCHITECTS = [
  {
    id: "01",
    name: "Arc. David K. Mensah",
    firm: "Mensah & Partners Spatial Design",
    category: "Commercial & High-Rise",
    location: "Accra, Ghana",
    experience: "12 Yrs Practice",
    projects: "28 Builds",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    description:
      "Specializing in sustainable skyscraper architecture, kinetic glass facades, and high-density commercial hubs.",
  },
  {
    id: "02",
    name: "Arc. Amina Bello",
    firm: "Atelier Vanguard",
    category: "Luxury Residential",
    location: "Cape Coast, Ghana",
    experience: "9 Yrs Practice",
    projects: "19 Builds",
    rating: "5.0",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    description:
      "Focused on luxury coastal estates, glass pavilion villas, and biophilic interior layouts integrating natural light.",
  },
  {
    id: "03",
    name: "Arc. Kwame Osei",
    firm: "EcoTerran Studio",
    category: "Sustainable & Cultural",
    location: "Kumasi, Ghana",
    experience: "15 Yrs Practice",
    projects: "34 Builds",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    description:
      "Pioneering eco-friendly rammed earth structures, cultural art centers, and net-zero community masterplans.",
  },
];

function ArchitectCard({ arch, index }) {
  const [wrapRef, visible] = useReveal();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={wrapRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: visible ? `${(index % 3) * 90}ms` : "0ms",
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: "#ffffff",
          borderRadius: "28px",
          padding: "24px",
          border: isHovered ? "1px solid #fdba74" : "1px solid #f1f5f9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered ? "0 20px 40px rgba(249, 115, 22, 0.12)" : "0 10px 30px rgba(0,0,0,0.02)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.25s ease",
        }}
      >
        <div>
          <div style={{ height: "260px", borderRadius: "20px", overflow: "hidden", marginBottom: "20px" }}>
            <img
              src={arch.img}
              alt={arch.name}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: isHovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>
          <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {arch.category}
          </span>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginTop: "4px", color: "#0f172a" }}>{arch.name}</h3>
          <p style={{ color: "#64748b", fontSize: "0.95rem", fontWeight: "600", marginBottom: "12px" }}>
            {arch.firm} • {arch.location}
          </p>
          <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: "1.6" }}>{arch.description}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #f1f5f9" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "700", color: "#0f172a" }}>{arch.experience}</div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
              ★ {arch.rating} · {arch.projects}
            </div>
          </div>
          <button
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: isHovered ? "#ea580c" : "#f97316",
              border: "none",
              color: "#ffffff",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(249, 115, 22, 0.35)",
              transform: isHovered ? "rotate(45deg) scale(1.08)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            ↗
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Architects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "Commercial & High-Rise", "Luxury Residential", "Sustainable & Cultural"];

  const filtered = ARCHITECTS.filter((item) => {
    const matchCat = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.firm.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "120px 24px 80px 24px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            ACCREDITED DIRECTORY
          </span>
          <h1 style={{ fontSize: "3.2rem", fontWeight: "900", letterSpacing: "-0.03em", marginTop: "4px" }}>
            Lead Architectural Talent
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "8px", maxWidth: "600px" }}>
            Direct access to verified architectural practices and spatial design leads across West Africa.
          </p>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "48px", background: "#ffffff", padding: "16px", borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <input
            type="text"
            placeholder="Search architect or studio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "12px 20px",
              borderRadius: "99px",
              border: "1px solid #cbd5e1",
              fontSize: "0.9rem",
              width: "100%",
              maxWidth: "320px",
              outline: "none",
            }}
          />
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "99px",
                  border: "none",
                  background: active ? "#f97316" : "#f1f5f9",
                  color: active ? "#ffffff" : "#475569",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "32px" }}>
          {filtered.map((arch, index) => (
            <ArchitectCard key={arch.id} arch={arch} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
