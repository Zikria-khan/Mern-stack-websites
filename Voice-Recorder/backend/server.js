const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require('dotenv').config();

// Initialize Express app
const app = express();

// CORS Configuration
app.use(cors({
  origin: '*', // Allow your frontend to access this server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
}));

app.use(express.json());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB Configuration
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

// Audio Schema
const audioSchema = new mongoose.Schema({
  url: { type: String, required: true },
  cloudinary_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Audio = mongoose.model('Audio', audioSchema);

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const cloudinaryStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(cloudinaryStream);
  });
};

// Route to upload audio
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await uploadToCloudinary(req.file.buffer, { resource_type: 'auto' });
    
    const newAudio = new Audio({
      url: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await newAudio.save();
    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
});

// Route to get all recordings
app.get('/recordings', async (req, res) => {
  try {
    const recordings = await Audio.find();
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recordings' });
  }
});

// Route to delete an audio recording
app.delete('/recordings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const audio = await Audio.findById(id);
    
    if (!audio) {
      return res.status(404).json({ error: 'Audio not found' });
    }

    await cloudinary.uploader.destroy(audio.cloudinary_id, { resource_type: 'auto' });
    await Audio.findByIdAndDelete(id);
    
    res.json({ message: 'Audio deleted successfully' });
  } catch (error) {
    console.error('Error deleting audio:', error);
    res.status(500).json({ error: 'Error deleting audio' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
