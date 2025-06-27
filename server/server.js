require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const questionRoutes = require('./routes/questinRoutes'); 
const authRoutes = require('./routes/authRoutes');
const studentSubmissionRoutes = require('./routes/studentSubmissionRoutes');

const app = express();

// CORS setup: allow frontend domain
app.use(cors({
  origin: ['https://online-exam-platform7.vercel.app'], // replace with your frontend if different
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/submission', studentSubmissionRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // avoid long delays if DB is unreachable
})
.then(() => {
  console.log('MongoDB connected ✅');
})
.catch(err => {
  console.error('MongoDB connection error ❌:', err.message);
});

// ❗ Do NOT call app.listen — Vercel handles this automatically
module.exports = app;
