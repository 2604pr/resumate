const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const fileParser = require('../utils/fileParser');
const geminiService = require('../services/geminiService');
const fs = require('fs').promises;

// Upload and parse resume
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file'
      });
    }

    // Parse the file
    const extractedText = await fileParser.parseFile(
      req.file.path,
      req.file.mimetype
    );

    if (!extractedText || extractedText.trim().length === 0) {
      // Clean up the uploaded file
      await fs.unlink(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from the resume. Please ensure the file contains readable text.'
      });
    }

    // Save resume metadata to database
    const resume = new Resume({
      filename: req.file.filename,
      originalName: req.file.originalname,
      fileSize: req.file.size,
      extractedText: extractedText
    });

    await resume.save();

    // Clean up the uploaded file after saving to DB
    await fs.unlink(req.file.path);

    res.status(200).json({
      success: true,
      message: 'Resume uploaded and parsed successfully',
      data: {
        resumeId: resume._id,
        filename: resume.originalName,
        textLength: extractedText.length,
        extractedText: extractedText
      }
    });
  } catch (error) {
    // Clean up file on error
    if (req.file && req.file.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    next(error);
  }
};

// Analyze resume with AI
exports.analyzeResume = async (req, res, next) => {
  try {
    const { resumeId, resumeText } = req.body;

    if (!resumeId && !resumeText) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either resumeId or resumeText'
      });
    }

    let textToAnalyze = resumeText;

    // If resumeId is provided, fetch from database
    if (resumeId && !resumeText) {
      const resume = await Resume.findById(resumeId);
      if (!resume) {
        return res.status(404).json({
          success: false,
          message: 'Resume not found'
        });
      }
      textToAnalyze = resume.extractedText;
    }

    // Generate AI analysis
    const aiResponse = await geminiService.analyzeResume(textToAnalyze);

    // Save analysis to database
    if (resumeId) {
      const analysis = new Analysis({
        resumeId,
        prompt: 'Resume Analysis',
        response: aiResponse,
        analysisType: 'resume_analysis'
      });
      await analysis.save();
    }

    res.status(200).json({
      success: true,
      message: 'Resume analysis completed',
      data: {
        analysis: aiResponse
      }
    });
  } catch (error) {
    next(error);
  }
};

// Generate interview questions
exports.generateInterviewQuestions = async (req, res, next) => {
  try {
    const { resumeId, resumeText } = req.body;

    if (!resumeId && !resumeText) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either resumeId or resumeText'
      });
    }

    let textToAnalyze = resumeText;

    if (resumeId && !resumeText) {
      const resume = await Resume.findById(resumeId);
      if (!resume) {
        return res.status(404).json({
          success: false,
          message: 'Resume not found'
        });
      }
      textToAnalyze = resume.extractedText;
    }

    // Generate interview questions
    const aiResponse = await geminiService.generateInterviewQuestions(textToAnalyze);

    // Save to database
    if (resumeId) {
      const analysis = new Analysis({
        resumeId,
        prompt: 'Interview Preparation',
        response: aiResponse,
        analysisType: 'interview_prep'
      });
      await analysis.save();
    }

    res.status(200).json({
      success: true,
      message: 'Interview questions generated',
      data: {
        questions: aiResponse
      }
    });
  } catch (error) {
    next(error);
  }
};

// Provide career guidance
exports.provideCareerGuidance = async (req, res, next) => {
  try {
    const { resumeId, resumeText } = req.body;

    if (!resumeId && !resumeText) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either resumeId or resumeText'
      });
    }

    let textToAnalyze = resumeText;

    if (resumeId && !resumeText) {
      const resume = await Resume.findById(resumeId);
      if (!resume) {
        return res.status(404).json({
          success: false,
          message: 'Resume not found'
        });
      }
      textToAnalyze = resume.extractedText;
    }

    // Generate career guidance
    const aiResponse = await geminiService.provideCareerGuidance(textToAnalyze);

    // Save to database
    if (resumeId) {
      const analysis = new Analysis({
        resumeId,
        prompt: 'Career Guidance',
        response: aiResponse,
        analysisType: 'career_guidance'
      });
      await analysis.save();
    }

    res.status(200).json({
      success: true,
      message: 'Career guidance generated',
      data: {
        guidance: aiResponse
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get analysis history
exports.getHistory = async (req, res, next) => {
  try {
    const { resumeId } = req.params;

    const analyses = await Analysis.find({ resumeId })
      .sort({ createdAt: -1 })
      .populate('resumeId', 'originalName uploadedAt');

    res.status(200).json({
      success: true,
      count: analyses.length,
      data: analyses
    });
  } catch (error) {
    next(error);
  }
};

// Get all resumes
exports.getAllResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find()
      .sort({ uploadedAt: -1 })
      .select('-extractedText');

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    next(error);
  }
};
