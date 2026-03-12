import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>Built with <span className="heart">♥</span> for fast typists.</p>
        <div className="footer-links">
          <a href="#" className="footer-link">GitHub</a>
          <span className="dot">•</span>
          <a href="#" className="footer-link">Portfolio</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
