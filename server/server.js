require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const questionRoutes = require('./routes/questinRoutes'); 
const authRoutes = require('./routes/authRoutes');
const studentSubmissionRoutes = require('./routes/studentSubmissionRoutes');

const app = express();

app.use(cors({
  origin: [
    'https://online-exam-platform5.vercel.app', 
    'http://localhost:5173' 
  ],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/submission', studentSubmissionRoutes);

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
})
.then(() => {
  console.log('✅ MongoDB connected');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});

module.exports = app;
