import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./footer.css"; // Importing the CSS file

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h2 className="footer-title">Linklytics</h2>
          <p className="footer-text">Simplifying URL shortening for efficient sharing</p>
        </div>

        <p className="footer-text">&copy; 2024 Linklytics. All rights reserved.</p>

        <div className="footer-links">
          <a href="#"><FaFacebook size={24} /></a>
          <a href="#"><FaTwitter size={24} /></a>
          <a href="#"><FaInstagram size={24} /></a>
          <a href="#"><FaLinkedin size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
