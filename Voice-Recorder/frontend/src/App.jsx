// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StartRecording from './components/StartRecording'; // Import StartRecording
import Recordings from './components/Recordings';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<StartRecording />} /> {/* Set StartRecording on root route */}
        <Route path="/recordings" element={<Recordings />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
