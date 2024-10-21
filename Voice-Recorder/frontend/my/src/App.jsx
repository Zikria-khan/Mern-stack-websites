import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartRecording from './components/StartRecording/StartRecoding';
import AllRecordings from './components/AllRecordings/AllRecordings';
import Home from './components/pages/Home';
import Navbar from './components/Navbar/Navabar';
import "./App.css"
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start-recording" element={<StartRecording />} />
        <Route path="/all-recordings" element={<AllRecordings />} />
      </Routes>
    </Router>
  );
}

export default App;
