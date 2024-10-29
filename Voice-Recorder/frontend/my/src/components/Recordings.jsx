import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecordingCard from './RecordingCard';
import './Recordings.css';

const Recordings = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    async function fetchRecordings() {
      try {
        const response = await axios.get(`http://mern-stack-websites.vercel.app/recordings`);
        setRecordings(response.data);
      } catch (error) {
        console.error("Error fetching recordings", error);
      }
    }
    fetchRecordings();
  }, []);

  const deleteRecording = async (id) => {
    try {
      await axios.delete(`https://mern-stack-websites.vercel.app/recordings/${id}`);
      setRecordings(recordings.filter(recording => recording._id !== id));
    } catch (error) {
      console.error("Error deleting recording", error);
    }
  };

  return (
    <div className="recordings">
      <h2>Your Recordings</h2>
      <div className="recordings-list">
        {recordings.map((rec) => (
          <RecordingCard key={rec._id} recording={rec} deleteRecording={deleteRecording} />
        ))}
      </div>
    </div>
  );
};

export default Recordings;
