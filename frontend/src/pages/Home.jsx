import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useReveal } from "./useReveal";
import "./home.css";

// Point this at your logo file. If it lives in the public/ folder
// (Vite or CRA), this path works as-is. If it's under src/assets,
// swap for: import logo from "../assets/logo.png"; and use {logo} below.
const LOGO_SRC = "/assets/logo.png";

const FEATURED_PROJECTS = [
  {
    id: "parkview-heights",
    title: "Parkview Heights Pavilion",
    category: "Residential",
    location: "Accra, Ghana",
    type: "Luxury Villa",
    price: "$850,000",
    architect: "Atelier Vanguard",
    area: "620 sqm",
    year: "2024",
    featured: true,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "oakwood-retreat",
    title: "Oakwood Coastal Retreat",
    category: "Residential",
    location: "Cape Coast, Ghana",
    type: "Coastal Pavilion",
    price: "$1,250,000",
    architect: "Arc. Amina Bello",
    area: "480 sqm",
    year: "2023",
    featured: true,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ashanti-cultural-sanctuary",
    title: "Ashanti Heritage Sanctuary",
    category: "Cultural & Religious",
    location: "Kumasi, Ghana",
    type: "Cultural Center",
    price: "Civic Commission",
    architect: "EcoTerran Practice",
    area: "3,100 sqm",
    year: "2025",
    featured: true,
    img: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "accra-financial-tower",
    title: "Apex Innovation Spire",
    category: "Commercial",
    location: "Accra Financial District",
    type: "High-Rise Commercial",
    price: "Enterprise Project",
    architect: "Mensah & Partners",
    area: "18,000 sqm",
    year: "2026",
    featured: true,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "whispering-pines",
    title: "Whispering Pines Sanctuary",
    category: "Cultural & Religious",
    location: "Aburi Heights, Ghana",
    type: "Interfaith Pavilion",
    price: "Private Guild",
    architect: "Arc. Kwame Osei",
    area: "950 sqm",
    year: "2022",
    featured: true,
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "lakeside-terraces",
    title: "Lakeside Terraces",
    category: "Residential",
    location: "Ho, Volta Region",
    type: "Family Compound",
    price: "$610,000",
    architect: "Nkrumah Studio",
    area: "540 sqm",
    year: "2024",
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "marina-bay-exchange",
    title: "Marina Bay Exchange",
    category: "Commercial",
    location: "Takoradi Harbour",
    type: "Corporate Headquarters",
    price: "Enterprise Project",
    architect: "Atelier Vanguard",
    area: "9,400 sqm",
    year: "2025",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "koforidua-civic-court",
    title: "Koforidua Civic Court",
    category: "Institutional",
    location: "Koforidua, Ghana",
    type: "Municipal Complex",
    price: "Public Commission",
    architect: "Mensah & Partners",
    area: "5,200 sqm",
    year: "2023",
    img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "northgate-learning-campus",
    title: "Northgate Learning Campus",
    category: "Institutional",
    location: "Tamale, Ghana",
    type: "University Campus",
    price: "Public-Private Partnership",
    architect: "EcoTerran Practice",
    area: "12,600 sqm",
    year: "2026",
    img: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "savannah-lodge",
    title: "The Savannah Lodge",
    category: "Hospitality",
    location: "Mole, Northern Region",
    type: "Eco-Resort",
    price: "$2,400,000",
    architect: "Arc. Amina Bello",
    area: "3,800 sqm",
    year: "2024",
    img: "https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "silverline-residences",
    title: "Silverline Residences",
    category: "Residential",
    location: "East Legon, Accra",
    type: "Boutique Apartments",
    price: "$1,800,000",
    architect: "Nkrumah Studio",
    area: "2,100 sqm",
    year: "2025",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "riverside-innovation-hub",
    title: "Riverside Innovation Hub",
    category: "Commercial",
    location: "Kumasi, Ghana",
    type: "Tech Campus",
    price: "Enterprise Project",
    architect: "Arc. Kwame Osei",
    area: "6,700 sqm",
    year: "2026",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
  },
];

const CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Cultural & Religious",
  "Institutional",
  "Hospitality",
];

function ProjectCard({ item, index, navigate }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [wrapRef, visible] = useReveal();

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 10 });
  }, []);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

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
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onClick={() => navigate(`/projects/${item.id}`)}
        style={{
          background: "#ffffff",
          borderRadius: "28px",
          overflow: "hidden",
          border: isHovered ? "1px solid #f97316" : "1px solid #e2e8f0",
          padding: "20px",
          cursor: "pointer",
          transform: `translateY(${isHovered ? -8 : 0}px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          boxShadow: isHovered ? "0 20px 40px rgba(249, 115, 22, 0.12)" : "0 4px 20px rgba(0, 0, 0, 0.03)",
          transition: "transform 0.15s ease-out, box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease",
        }}
      >
        <div style={{ height: "260px", borderRadius: "20px", overflow: "hidden", position: "relative", background: "#0f172a" }}>
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />

          <span
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              background: "#f97316",
              color: "#ffffff",
              padding: "6px 14px",
              borderRadius: "99px",
              fontSize: "0.75rem",
              fontWeight: "800",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {item.category}
          </span>

          {isHovered && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15, 23, 42, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                style={{
                  background: "#ffffff",
                  color: "#0f172a",
                  padding: "10px 22px",
                  borderRadius: "99px",
                  fontWeight: "800",
                  fontSize: "0.85rem",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                }}
              >
                Inspect Blueprint & Renders ↗
              </span>
            </div>
          )}

          <button
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: isHovered ? "#ea580c" : "#f97316",
              border: "none",
              color: "#ffffff",
              fontSize: "1.2rem",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: isHovered ? "rotate(45deg) scale(1.1)" : "none",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 18px rgba(249, 115, 22, 0.4)",
            }}
          >
            ↗
          </button>
        </div>

        <div style={{ padding: "20px 8px 8px 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
            <div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>{item.title}</h3>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600", marginTop: "4px" }}>
                Lead Firm: <span style={{ color: "#0f172a" }}>{item.architect}</span>
              </div>
            </div>
            <span style={{ color: "#ea580c", fontWeight: "800", fontSize: "1.1rem", whiteSpace: "nowrap" }}>{item.price}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "6px 14px",
              color: "#64748b",
              fontSize: "0.85rem",
              fontWeight: "500",
              marginTop: "12px",
              paddingTop: "12px",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <span>📍 {item.location}</span>
            <span>▢ {item.area}</span>
            <span>◷ {item.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const slides = FEATURED_PROJECTS.filter((p) => p.featured);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentProject = slides[currentIndex];
  const filtered = FEATURED_PROJECTS.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div style={{ backgroundColor: "#f8f9fa", color: "#111827", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Hero Slider */}
      <section style={{ padding: "100px 24px 40px 24px", maxWidth: "1320px", margin: "0 auto" }}>
        <div
          onClick={() => navigate(`/projects/${currentProject.id}`)}
          style={{
            position: "relative",
            minHeight: "600px",
            borderRadius: "32px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px",
            color: "#ffffff",
            cursor: "pointer",
            background: "#0f172a",
          }}
        >
          {/* Crossfading, slowly-zooming background layers */}
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.8)), url('${slide.img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: idx === currentIndex ? 1 : 0,
                transition: "opacity 1.2s ease-in-out",
                animation: idx === currentIndex ? "kenburns 9s ease-in-out infinite alternate" : "none",
              }}
            />
          ))}

          {/* Top pill nav & slide indicators */}
          <div
            style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={LOGO_SRC}
                alt="ArchiVerse"
                style={{ height: "26px", width: "auto" }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div style={{ display: "flex", gap: "8px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", padding: "6px", borderRadius: "99px" }}>
                <button
                  onClick={() => navigate("/architects")}
                  style={{ border: "none", background: "#ffffff", color: "#111827", padding: "8px 20px", borderRadius: "99px", fontWeight: "700", cursor: "pointer" }}
                >
                  Find Architect
                </button>
                <button
                  onClick={() => navigate("/services")}
                  style={{ border: "none", background: "transparent", color: "#ffffff", padding: "8px 20px", borderRadius: "99px", fontWeight: "500", cursor: "pointer" }}
                >
                  Browse Services
                </button>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: idx === currentIndex ? "32px" : "10px",
                    height: "10px",
                    borderRadius: "99px",
                    background: idx === currentIndex ? "#f97316" : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Hero content header */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "40px 0" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f97316", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {currentProject.category} // {currentProject.title}
            </span>
            <h1 style={{ fontSize: "3.5rem", fontWeight: "800", lineHeight: 1.1, margin: "8px 0 16px 0", letterSpacing: "-0.02em" }}>
              Architecture That Defines Culture & Space.
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#e5e7eb", opacity: 0.9, lineHeight: 1.6 }}>
              Inspect certified residential, commercial, and cultural spatial designs across Ghana.
            </p>
          </div>

          {/* Floating search widget */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              zIndex: 1,
              alignSelf: "flex-end",
              background: "#0f172a",
              padding: "16px 24px",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              cursor: "pointer",
            }}
          >
            <div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "600" }}>Location</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "700" }}>{currentProject.location}</div>
            </div>
            <div style={{ width: "1px", height: "30px", background: "#334155" }} />
            <div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "600" }}>Domain</div>
              <div style={{ fontSize: "0.95rem", fontWeight: "700" }}>{currentProject.category}</div>
            </div>
            <button
              onClick={() => navigate(`/projects/${currentProject.id}`)}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#f97316",
                border: "none",
                color: "#ffffff",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ↗
            </button>
          </div>
        </div>
      </section>

      {/* Grouped category showcase */}
      <section style={{ maxWidth: "1320px", margin: "60px auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ARCHITECTURAL CLASSIFICATION
            </span>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", letterSpacing: "-0.03em", marginTop: "4px" }}>
              Explore Portfolio Builds
            </h2>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", background: "#ffffff", padding: "8px", borderRadius: "99px", border: "1px solid #e2e8f0", width: "fit-content" }}>
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "99px",
                    border: "none",
                    background: isActive ? "#f97316" : "transparent",
                    color: isActive ? "#ffffff" : "#64748b",
                    fontWeight: "800",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "32px", perspective: "1400px" }}>
          {filtered.map((item, index) => (
            <ProjectCard key={item.id} item={item} index={index} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section style={{ maxWidth: "1320px", margin: "100px auto", padding: "0 24px" }}>
        <div style={{ background: "#ffffff", borderRadius: "32px", padding: "64px 48px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <h2 style={{ fontSize: "3rem", fontWeight: "900", letterSpacing: "-0.03em" }}>JOIN OUR COMMUNITY</h2>
            <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "8px" }}>Connect with top architectural practices or list your firm on ArchiVerse.</p>
          </div>
          <Link
            to="/register"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              color: "#ffffff",
              fontSize: "1.5rem",
              fontWeight: "bold",
              boxShadow: "0 6px 18px rgba(249, 115, 22, 0.4)",
            }}
          >
            ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
