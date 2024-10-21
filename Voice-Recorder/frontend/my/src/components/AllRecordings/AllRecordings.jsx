import React, { useEffect, useState } from 'react';
import './AllRecordings.css';
import axios from 'axios';

const AllRecordings = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      const response = await axios.get('mern-stack-websites-z1zg.vercel.app/recordings');
      setRecordings(response.data);
    } catch (error) {
      console.error('Error fetching recordings:', error);
    }
  };

  const deleteRecording = async (id) => {
    try {
      await axios.delete(`mern-stack-websites-z1zg.vercel.app/recordings/${id}`);
      fetchRecordings();
    } catch (error) {
      console.error('Error deleting recording:', error);
    }
  };

  return (
    <div className="all-recordings">
      <h1>All Recordings</h1>
      <ul className="recording-list">
        {recordings.map((recording) => (
          <li key={recording._id} className="voice-message">
            <audio src={recording.url} controls />
            <p>Recorded on: {new Date(recording.createdAt).toLocaleString()}</p>
            <button onClick={() => deleteRecording(recording._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllRecordings;
