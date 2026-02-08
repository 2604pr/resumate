import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  analyzeResume,
  generateInterviewQuestions,
  getCareerGuidance
} from '../services/api';

const AnalysisDisplay = ({ resumeData }) => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState({
    analysis: null,
    interview: null,
    career: null
  });

  const handleAnalysis = async (type) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      const { resumeId, extractedText } = resumeData;

      switch (type) {
        case 'analysis':
          response = await analyzeResume(resumeId, extractedText);
          setAnalysisData(prev => ({ ...prev, analysis: response.data.analysis }));
          break;
        case 'interview':
          response = await generateInterviewQuestions(resumeId, extractedText);
          setAnalysisData(prev => ({ ...prev, interview: response.data.questions }));
          break;
        case 'career':
          response = await getCareerGuidance(resumeId, extractedText);
          setAnalysisData(prev => ({ ...prev, career: response.data.guidance }));
          break;
        default:
          break;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate analysis');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading">
          <div className="spinner"></div>
          <p style={{ color: '#64748b' }}>AI is analyzing your resume...</p>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '10px' }}>
            This may take a few seconds
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-error">
          <strong>Error:</strong> {error}
        </div>
      );
    }

    let content = null;
    switch (activeTab) {
      case 'analysis':
        content = analysisData.analysis;
        break;
      case 'interview':
        content = analysisData.interview;
        break;
      case 'career':
        content = analysisData.career;
        break;
      default:
        content = null;
    }

    if (!content) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🤖</div>
          <h3 style={{ fontSize: '20px', color: '#334155', marginBottom: '10px' }}>
            Ready to analyze your resume!
          </h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>
            Click the button above to get AI-powered insights
          </p>
        </div>
      );
    }

    return (
      <div className="analysis-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1e293b' }}>
        🎯 AI Analysis Results
      </h2>

      {/* Resume Info */}
      <div style={{ 
        padding: '16px', 
        background: '#f8fafc', 
        borderRadius: '8px', 
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
            Uploaded Resume
          </p>
          <p style={{ fontSize: '16px', color: '#334155', fontWeight: '600' }}>
            {resumeData.filename}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
            Text Length
          </p>
          <p style={{ fontSize: '16px', color: '#334155', fontWeight: '600' }}>
            {resumeData.textLength.toLocaleString()} characters
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          📊 Resume Analysis
        </button>
        <button
          className={`tab ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('interview')}
        >
          💼 Interview Prep
        </button>
        <button
          className={`tab ${activeTab === 'career' ? 'active' : ''}`}
          onClick={() => setActiveTab('career')}
        >
          🚀 Career Guidance
        </button>
      </div>

      {/* Action Button */}
      <div style={{ marginBottom: '20px' }}>
        <button
          className="btn btn-primary"
          onClick={() => handleAnalysis(activeTab)}
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Analyzing...' : `Generate ${
            activeTab === 'analysis' ? 'Analysis' :
            activeTab === 'interview' ? 'Interview Questions' :
            'Career Guidance'
          }`}
        </button>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default AnalysisDisplay;
