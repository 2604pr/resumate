require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'AI-Powered Resume Analyzer API',
    version: '1.0.0',
    endpoints: {
      'POST /api/resume/upload': 'Upload and parse resume',
      'POST /api/ai/analyze': 'Analyze resume with AI',
      'POST /api/ai/interview': 'Generate interview questions',
      'POST /api/ai/career': 'Get career guidance',
      'GET /api/history/:resumeId': 'Get analysis history',
      'GET /api/resumes': 'Get all uploaded resumes'
    }
  });
});

app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});
