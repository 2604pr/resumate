const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const resumeController = require('../controllers/resumeController');

// Resume upload and parsing
router.post('/resume/upload', upload.single('resume'), resumeController.uploadResume);

// AI analysis endpoints
router.post('/ai/analyze', resumeController.analyzeResume);
router.post('/ai/interview', resumeController.generateInterviewQuestions);
router.post('/ai/career', resumeController.provideCareerGuidance);

// History and data retrieval
router.get('/history/:resumeId', resumeController.getHistory);
router.get('/resumes', resumeController.getAllResumes);

module.exports = router;
