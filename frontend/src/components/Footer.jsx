import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Slice 1 1.svg"; // Or ArchiVerse.png
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="haven-footer-wrapper">
      <div className="haven-footer-card">
        <div className="haven-footer-top">
          {/* Brand Info with Logo Asset */}
          <div className="haven-footer-brand">
            <Link to="/" className="haven-brand light">
              <img src={logo} alt="ArchiVerse Logo" className="haven-logo-img light" />
              <span className="haven-logo-text light">ArchiVerse</span>
            </Link>
            <p className="haven-footer-tagline">
              Connecting visionary property owners with accredited architectural practices across West Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div className="haven-footer-cols">
            <div className="haven-footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/architects">Directory</Link></li>
              </ul>
            </div>

            <div className="haven-footer-col">
              <h4>Capabilities</h4>
              <ul>
                <li><a href="#blueprints">Blueprint Management</a></li>
                <li><a href="#3d-renders">3D Renders</a></li>
                <li><a href="#audits">Site Lifecycle Audits</a></li>
                <li><a href="#consults">Direct Consultations</a></li>
              </ul>
            </div>

            <div className="haven-footer-col">
              <h4>Contact Us</h4>
              <ul className="contact-list">
                <li><span className="contact-icon">✉</span> support@archiverse.com</li>
                <li><span className="contact-icon">📞</span> +233 (0) 30 123 4567</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="haven-footer-bottom">
          <p>© 2026 ArchiVerse. All rights reserved.</p>
          <div className="haven-footer-legal">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}