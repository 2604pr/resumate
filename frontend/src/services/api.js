import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await axios.post(`${API_BASE_URL}/resume/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const analyzeResume = async (resumeId, resumeText) => {
  const response = await api.post('/ai/analyze', { resumeId, resumeText });
  return response.data;
};

export const generateInterviewQuestions = async (resumeId, resumeText) => {
  const response = await api.post('/ai/interview', { resumeId, resumeText });
  return response.data;
};

export const getCareerGuidance = async (resumeId, resumeText) => {
  const response = await api.post('/ai/career', { resumeId, resumeText });
  return response.data;
};

export const getHistory = async (resumeId) => {
  const response = await api.get(`/history/${resumeId}`);
  return response.data;
};

export const getAllResumes = async () => {
  const response = await api.get('/resumes');
  return response.data;
};

export default api;
