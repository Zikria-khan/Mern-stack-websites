import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create a CSS file for styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="./public/logo.webp" alt="Zakriya Khan" className="logo" />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/start-recording">Start Recording</Link>
        </li>
        <li>
          <Link to="/all-recordings">View All Recordings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
