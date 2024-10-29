// RecordingCard.js
import React from 'react';
import './RecordingCard.css';

const RecordingCard = ({ recording, deleteRecording }) => (
  <div className="recording-card">
    <p className="recording-time">{new Date(recording.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
    <audio controls src={recording.url}></audio>
    <button className="delete-btn" onClick={() => deleteRecording(recording._id)}>Delete</button>
  </div>
);

export default RecordingCard;
