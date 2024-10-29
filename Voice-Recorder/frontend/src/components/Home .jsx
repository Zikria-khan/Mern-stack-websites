// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => (
  <div className="home">
    <h1>Welcome to Voice Recorder</h1>
    <div className="actions">
      <Link to="/recordings" className="btn">View All Records</Link>
    </div>
  </div>
);

export default Home;
