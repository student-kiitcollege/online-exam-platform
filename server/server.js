require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route imports
const questionRoutes = require('./routes/questionRoutes'); 
const authRoutes = require('./routes/authRoutes');
const studentSubmissionRoutes = require('./routes/studentSubmissionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/submission', studentSubmissionRoutes);

// MongoDB connection (connect only once)
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected ✅');
})
.catch(err => {
  console.error('MongoDB connection error ❌:', err);
});

// ❗ No app.listen here — Vercel handles the server
module.exports = app;
