import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/urlShortener';
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    user: process.env.MONGO_USER || 'admin', // Default Mongo user
    pass: process.env.MONGO_PASS || 'password', // Default Mongo password
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 🔹 Define Schema
const urlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlSchema);


// 🔹 Middleware
app.use(express.json());
app.use(cors());

// 🔹 Health Check Route
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus =
      mongoose.connection.readyState === 1 ? 'Healthy' : 'Not Connected';

    res.json({
      status: 'Backend & Database are healthy',
      backend: 'Running',
      database: dbStatus,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      backend: 'Running',
      database: 'Error',
    });
  }
});

// 🔹 Root Route Redirect
app.get('/', (req, res) => {
  res.redirect('/api/health');
});

// 🔹 Shorten URL Endpoint
app.post('/shorten', async (req, res) => {
  const { longUrl, shortCode } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Long URL is required' });
  }

  const code = shortCode || nanoid(6);

  try {
    // Prevent duplicate short codes
    if (shortCode) {
      const existing = await Url.findOne({ shortCode });
      if (existing) {
        return res.status(400).json({ error: 'Custom short code already exists' });
      }
    }

    const newUrl = new Url({ shortCode: code, longUrl });
    await newUrl.save();

    res.json({ shortUrl: `http://localhost:${PORT}/${code}` });
  } catch (error) {
    console.error('❌ Error in /shorten:', error);
    res.status(500).json({ error: 'Failed to shorten URL', details: error.message });
  }
});

// 🔹 Redirect Short URL to Long URL
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).send('Short URL not found');
    }

    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// 🔹 Fallback Route (404 Handler)
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found. Use /api/health for health checks.',
  });
});

// 🔹 Start Server
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
