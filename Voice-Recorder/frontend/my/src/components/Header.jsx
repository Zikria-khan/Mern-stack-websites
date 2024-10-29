// Header.js
import React from 'react';
import Navbar from './Navbar';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="logo">Voice Recorder</div>
    <Navbar />
  </header>
);

export default Header;
