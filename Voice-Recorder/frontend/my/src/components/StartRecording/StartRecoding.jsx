import React, { useState, useRef } from 'react';
import './StartRecording.css';
import axios from 'axios';

const StartRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioChunksRef = useRef([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        await uploadAudio(audioBlob);
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing the microphone: ', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const uploadAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    try {
      await axios.post('mern-stack-websites-z1zg.vercel.app/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="start-recording">
      <h1>Start Recording</h1>
      {!isRecording ? (
        <button className="btn" onClick={startRecording}>Start Recording</button>
      ) : (
        <button className="btn" onClick={stopRecording}>Stop Recording</button>
      )}
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
};

export default StartRecording;
