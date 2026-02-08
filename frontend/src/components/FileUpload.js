import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const FileUpload = ({ onUploadSuccess, onUploadError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      onUploadError('Please upload a PDF or DOCX file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      onUploadError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch(`${API_BASE_URL}/api/resume/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        onUploadSuccess(data.data);
      } else {
        onUploadError(data.message || 'Upload failed');
      }
    } catch (error) {
      onUploadError('Network error. Please ensure the backend server is running.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="card">
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1e293b' }}>
        📄 Upload Your Resume
      </h2>
      
      <div
        className={`upload-area ${isDragging ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {isUploading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p style={{ color: '#64748b' }}>Uploading and parsing your resume...</p>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📎</div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#334155' }}>
              Drag & Drop your resume here
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              or click to browse files
            </p>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>
              Supported formats: PDF, DOCX (Max 5MB)
            </p>
          </>
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px', color: '#475569' }}>
          ✨ What happens next?
        </h4>
        <ul style={{ marginLeft: '20px', color: '#64748b', fontSize: '14px' }}>
          <li>We'll extract text from your resume</li>
          <li>AI will analyze your skills, experience, and projects</li>
          <li>Get personalized recommendations and improvements</li>
          <li>Prepare for interviews with tailored questions</li>
          <li>Receive career guidance based on your profile</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
