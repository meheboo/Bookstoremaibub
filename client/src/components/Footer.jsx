import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="social-media">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://www.facebook.com/">Facebook</a></li>
            <li><a href="https://x.com/">Twitter</a></li>
            <li><a href="https://www.instagram.com/">Instagram</a></li>
          </ul>
        </div>
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Email: meheboobpatelpatel@gmail.com</p>
          <p>Phone: +919632261436</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 BookStore. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
