import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Voice Recorder</h1>
      <div className="all-recordings">
        <Link to="/all-recordings">
          <button className="btn">View All Recordings</button>
        </Link>
      </div>
      <div className="start-button-container">
        <Link to="/start-recording">
          <button className="btn">Start Recording</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
