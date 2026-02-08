# 🤖 AI-Powered Resume Analyzer

A full-stack MERN application that uses Google Gemini LLM to analyze resumes, provide career guidance, and generate interview questions.

## 📋 Features

- **Resume Upload & Processing**: Upload PDF or DOCX resumes with automatic text extraction
- **AI-Powered Analysis**: Comprehensive resume analysis using Google Gemini
  - Skills extraction (technical & soft)
  - Project improvement suggestions
  - ATS compatibility feedback
  - Strengths and areas for improvement
- **Interview Preparation**: Role-based technical and behavioral questions
- **Career Guidance**: Job role recommendations and skill development paths
- **History Tracking**: Store and retrieve previous analyses

## 🛠️ Tech Stack

### Frontend
- React.js
- Custom CSS (Tailwind-inspired)
- Axios for API calls
- React Markdown for formatted display

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Multer for file uploads
- PDF-Parse & Mammoth for document parsing
- Google Gemini AI API

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Google Gemini API Key

### Step 1: Clone or Extract the Project
```bash
cd resume-analyzer
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` file with your credentials:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
GEMINI_API_KEY=your_actual_gemini_api_key_here
NODE_ENV=development
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```


**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# React app will open at http://localhost:3000
```

## 🚀 Usage

1. **Upload Resume**: Drag and drop or click to upload a PDF/DOCX resume
2. **View Extracted Text**: See the parsed resume content
3. **Generate Analysis**: Click tabs to generate:
   - Resume Analysis
   - Interview Questions
   - Career Guidance
4. **Review Results**: AI-powered insights displayed in markdown format

## 📁 Project Structure

```
resume-analyzer/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── resumeController.js   # Request handlers
│   ├── middleware/
│   │   ├── upload.js             # Multer configuration
│   │   └── errorHandler.js       # Error handling
│   ├── models/
│   │   ├── Resume.js             # Resume schema
│   │   └── Analysis.js           # Analysis schema
│   ├── routes/
│   │   └── api.js                # API routes
│   ├── services/
│   │   └── geminiService.js      # Gemini AI integration
│   ├── utils/
│   │   └── fileParser.js         # PDF/DOCX parsing
│   ├── .env.example              # Environment variables template
│   ├── package.json
│   └── server.js                 # Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.js     # Upload component
│   │   │   └── AnalysisDisplay.js # Results display
│   │   ├── services/
│   │   │   └── api.js            # API service
│   │   ├── App.js                # Main component
│   │   ├── index.js              # Entry point
│   │   └── index.css             # Styles
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/upload` | Upload and parse resume |
| POST | `/api/ai/analyze` | Generate resume analysis |
| POST | `/api/ai/interview` | Generate interview questions |
| POST | `/api/ai/career` | Get career guidance |
| GET | `/api/history/:resumeId` | Get analysis history |
| GET | `/api/resumes` | Get all uploaded resumes |
