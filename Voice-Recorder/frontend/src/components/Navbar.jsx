// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Start Recording</Link> {/* Change link text to match route */}
    <Link to="/recordings">View All Records</Link>
    <Link to="/about">About Us</Link>
  </nav>
);

export default Navbar;
