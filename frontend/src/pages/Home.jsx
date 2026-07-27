import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Featured Projects Data grouped into distinct architectural domains
const FEATURED_PROJECTS = [
  {
    id: "parkview-heights",
    title: "Parkview Heights Pavilion",
    category: "Residential",
    location: "Accra, Ghana",
    type: "Luxury Villa",
    price: "$850,000",
    architect: "Atelier Vanguard",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "oakwood-retreat",
    title: "Oakwood Coastal Retreat",
    category: "Residential",
    location: "Cape Coast, Ghana",
    type: "Coastal Pavilion",
    price: "$1,250,000",
    architect: "Arc. Amina Bello",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "ashanti-cultural-sanctuary",
    title: "Ashanti Heritage Sanctuary",
    category: "Cultural & Religious",
    location: "Kumasi, Ghana",
    type: "Cultural Center",
    price: "Civic Commission",
    architect: "EcoTerran Practice",
    img: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "accra-financial-tower",
    title: "Apex Innovation Spire",
    category: "Commercial",
    location: "Accra Financial District",
    type: "High-Rise Commercial",
    price: "Enterprise Project",
    architect: "Mensah & Partners",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "whispering-pines",
    title: "Whispering Pines Sanctuary",
    category: "Cultural & Religious",
    location: "Aburi Heights, Ghana",
    type: "Interfaith Pavilion",
    price: "Private Guild",
    architect: "Arc. Kwame Osei",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const navigate = useNavigate();

  // Auto-rotate hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % FEATURED_PROJECTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProject = FEATURED_PROJECTS[currentIndex];

  const categories = ["All", "Residential", "Commercial", "Cultural & Religious"];

  // Filter projects dynamically
  const filtered = FEATURED_PROJECTS.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div style={{ backgroundColor: "#f8f9fa", color: "#111827", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Dynamic Hero Slider */}
      <section style={{ padding: "100px 24px 40px 24px", maxWidth: "1320px", margin: "0 auto" }}>
        <div 
          onClick={() => navigate(`/projects/${currentProject.id}`)}
          style={{
            position: "relative",
            minHeight: "600px",
            borderRadius: "32px",
            overflow: "hidden",
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.8)), url('${currentProject.img}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px",
            color: "#ffffff",
            cursor: "pointer",
            transition: "background-image 0.8s ease-in-out"
          }}
        >
          {/* Top Pill Nav & Slide Indicators */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
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

            <div style={{ display: "flex", gap: "8px" }}>
              {FEATURED_PROJECTS.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: idx === currentIndex ? "32px" : "10px",
                    height: "10px",
                    borderRadius: "99px",
                    background: idx === currentIndex ? "#f97316" : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Hero Content Header */}
          <div style={{ maxWidth: "680px", margin: "40px 0" }}>
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

          {/* Floating Search Widget */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setIsFilterOpen(true);
            }}
            style={{
              position: "absolute",
              bottom: "32px",
              right: "32px",
              background: "#0f172a",
              padding: "16px 24px",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
              cursor: "pointer"
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
            <button style={{
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
              justifyContent: "center"
            }}>
              ↗
            </button>
          </div>
        </div>
      </section>

      {/* Grouped Category Showcase Section */}
      <section style={{ maxWidth: "1320px", margin: "60px auto", padding: "0 24px" }}>
        
        {/* Section Title & Category Tabs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "#f97316", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              ARCHITECTURAL CLASSIFICATION
            </span>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", letterSpacing: "-0.03em", marginTop: "4px" }}>
              Explore Portfolio Builds
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", background: "#ffffff", padding: "8px", borderRadius: "99px", border: "1px solid #e2e8f0", width: "fit-content" }}>
            {categories.map((cat) => {
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
                    transition: "all 0.25s ease"
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Highly Interactive Card Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "32px" }}>
          {filtered.map((item) => {
            const isHovered = hoveredCardId === item.id;
            const currentImg = activeImageIndex[item.id] || item.img;

            return (
              <div 
                key={item.id}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => navigate(`/projects/${item.id}`)}
                style={{
                  background: "#ffffff",
                  borderRadius: "28px",
                  overflow: "hidden",
                  border: isHovered ? "1px solid #f97316" : "1px solid #e2e8f0",
                  padding: "20px",
                  cursor: "pointer",
                  transform: isHovered ? "translateY(-8px)" : "none",
                  boxShadow: isHovered ? "0 20px 40px rgba(249, 115, 22, 0.12)" : "0 4px 20px rgba(0, 0, 0, 0.03)",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {/* Image Showcase Frame with Dynamic Hover Overlays */}
                <div style={{ height: "260px", borderRadius: "20px", overflow: "hidden", position: "relative", background: "#0f172a" }}>
                  <img 
                    src={currentImg} 
                    alt={item.title} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                      transition: "transform 0.5s ease"
                    }} 
                  />

                  {/* Top Badge: Category Domain */}
                  <span style={{
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
                    textTransform: "uppercase"
                  }}>
                    {item.category}
                  </span>

                  {/* Interactive Quick View Overlay on Hover */}
                  {isHovered && (
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(15, 23, 42, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(4px)",
                      transition: "all 0.3s ease"
                    }}>
                      <span style={{
                        background: "#ffffff",
                        color: "#0f172a",
                        padding: "10px 22px",
                        borderRadius: "99px",
                        fontWeight: "800",
                        fontSize: "0.85rem",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                      }}>
                        Inspect Blueprint & Renders ↗
                      </span>
                    </div>
                  )}

                  {/* Bottom Action Circle */}
                  <button style={{
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
                    boxShadow: "0 6px 18px rgba(249, 115, 22, 0.4)"
                  }}>
                    ↗
                  </button>
                </div>

                {/* Text Metadata Details */}
                <div style={{ padding: "20px 8px 8px 8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>{item.title}</h3>
                      <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600", marginTop: "4px" }}>
                        Lead Firm: <span style={{ color: "#0f172a" }}>{item.architect}</span>
                      </div>
                    </div>
                    <span style={{ color: "#ea580c", fontWeight: "800", fontSize: "1.1rem" }}>{item.price}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "0.85rem", fontWeight: "500", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <span>📍</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{ maxWidth: "1320px", margin: "100px auto", padding: "0 24px" }}>
        <div style={{ background: "#ffffff", borderRadius: "32px", padding: "64px 48px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "3rem", fontWeight: "900", letterSpacing: "-0.03em" }}>JOIN OUR COMMUNITY</h2>
            <p style={{ color: "#64748b", fontSize: "1.1rem", marginTop: "8px" }}>Connect with top architectural practices or list your firm on ArchiVerse.</p>
          </div>
          <Link to="/register" style={{
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
            boxShadow: "0 6px 18px rgba(249, 115, 22, 0.4)"
          }}>
            ↗
          </Link>
        </div>
      </section>

    </div>
  );
}