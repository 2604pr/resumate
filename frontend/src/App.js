import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import AnalysisDisplay from './components/AnalysisDisplay';
import './index.css';
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";


function App() {
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUploadSuccess = (data) => {
    setResumeData(data);
    setSuccess('Resume uploaded and parsed successfully! 🎉');
    setError(null);
    
    // Clear success message after 5 seconds
    setTimeout(() => setSuccess(null), 5000);
  };

  const handleUploadError = (errorMessage) => {
    setError(errorMessage);
    setSuccess(null);
  };

  const handleNewUpload = () => {
    setResumeData(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>AI Resume Analyzer</h1>
        <p>Get instant AI-powered feedback on your resume</p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="alert alert-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <strong>Success:</strong> {success}
        </div>
      )}

      {/* Main Content */}
      {!resumeData ? (
        <FileUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
        />
      ) : (
        <>
          {/* New Upload Button */}
          <div style={{ marginBottom: '20px' }}>
            <button
              className="btn btn-secondary"
              onClick={handleNewUpload}
            >
              ← Upload New Resume
            </button>
          </div>

          {/* Analysis Display */}
          <AnalysisDisplay resumeData={resumeData} />

          {/* Resume Text Preview */}
          <div className="card">
            <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1e293b' }}>
              📝 Extracted Resume Text
            </h2>
            <div style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '8px',
              maxHeight: '400px',
              overflowY: 'auto',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#334155',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace'
            }}>
              {resumeData.extractedText}
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        color: 'white',
      }}>
        <p style={{ fontSize: '24px', marginTop: '10px' }}>Made with ❤️ by Pranshu</p>


        <div style={{ fontSize: '24px', marginTop: '10px' }}>
          <a
            href="https://www.linkedin.com/in/pranshu-patel-7b96b21bb/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon linkedin"
          >
            <FaLinkedin size={28} />
          </a>

          <a
            href="https://x.com/PranshuP2604"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon twitter"
            style={{padding:"20px"}}
          >
            <FaTwitter size={28} />
          </a>

          <a
            href="https://www.instagram.com/pranshu__patel?igsh=MTltOHJzZHhpZ2VuMg%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
            
          >
            <FaInstagram size={28} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
