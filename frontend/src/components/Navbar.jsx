import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Slice 1 1.svg"; // Fallback to logo png if using image asset: import logo from "../assets/ArchiVerse.png";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Architects", path: "/architects" },
  ];

  return (
    <header className="haven-navbar-wrapper">
      <div className="haven-navbar-container">
        {/* Brand Logo Asset */}
        <Link to="/" className="haven-brand">
          <div className="logo-badge">
            <img src={logo} alt="ArchiVerse Logo" className="haven-logo-img" />
          </div>
          <span className="haven-logo-text">ArchiVerse</span>
        </Link>

        {/* Center Nav Pills */}
        <nav className="haven-nav-pills">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`haven-nav-link ${isActive ? "active" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="haven-nav-actions">
          <Link to="/register" className="haven-btn-primary">
            Get Started <span className="arrow-icon">↗</span>
          </Link>
        </div>
      </div>
    </header>
  );
}