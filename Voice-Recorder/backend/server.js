require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cors = require('cors');

const app = express();

// Configure CORS
const allowedOrigins = ['https://mern-stack-websites-qvef.vercel.app']; // Add your frontend URL here
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary methods
  credentials: true, // Allow credentials if needed
}));

// Other middleware and routes...

// Middleware for parsing JSON bodies
app.use(express.json()); 

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer-Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'voice_recordings',
    resource_type: 'video', // Store as video to ensure compatibility with audio files
  },
});

const upload = multer({ storage });

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

// Define schema and model
const recordingSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  url: String,
  public_id: String,
});

const Recording = mongoose.model('Recording', recordingSchema);

// Test route to check server status
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to zakriya api' });
});

// Route to start recording (upload file)
app.post('/recordings', upload.single('audio'), async (req, res) => {
  try {
    const recording = new Recording({
      name: req.file.originalname,
      url: req.file.path,
      public_id: req.file.filename, // Save the public_id for future deletion
    });
    await recording.save();
    res.status(201).json(recording);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all recordings
app.get('/recordings', async (req, res) => {
  try {
    const recordings = await Recording.find();
    res.status(200).json(recordings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a recording
app.delete('/recordings/:id', async (req, res) => {
  try {
    const recording = await Recording.findByIdAndDelete(req.params.id);
    if (!recording) return res.status(404).json({ error: 'Recording not found' });

    // Delete from Cloudinary using public_id
    await cloudinary.uploader.destroy(recording.public_id, { resource_type: 'video' });
    res.status(200).json({ message: 'Recording deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
