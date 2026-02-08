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

### Step 4: Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the API key
5. Paste it in your `backend/.env` file

### Step 5: Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod

# Or on macOS with Homebrew:
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env` with the Atlas connection string

### Step 6: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
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

## 🧪 Testing the Application

1. **Prepare a test resume**: Create or use an existing PDF/DOCX resume
2. **Upload**: Use the web interface to upload your resume
3. **Verify parsing**: Check that the text extraction is accurate
4. **Generate analyses**: Test all three analysis types
5. **Check database**: Verify data is stored in MongoDB

## ⚠️ Troubleshooting

### Backend won't start
- Ensure MongoDB is running
- Check if port 5000 is available
- Verify `.env` file exists and has correct values

### Frontend won't start
- Ensure backend is running first
- Check if port 3000 is available
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### File upload fails
- Check file size (must be < 5MB)
- Verify file format (PDF or DOCX only)
- Ensure `uploads/` directory exists in backend

### AI analysis fails
- Verify Gemini API key is correct
- Check API quota/limits
- Review backend logs for specific errors

### CORS errors
- Ensure backend is running on port 5000
- Check that CORS is enabled in `server.js`

## 🔐 Security Notes

- Never commit `.env` file to version control
- Store API keys securely
- In production, use environment variables
- Implement authentication for multi-user scenarios
- Validate and sanitize all user inputs

## 🚀 Deployment

### Backend (Heroku/Railway/Render)
1. Set environment variables in platform dashboard
2. Ensure MongoDB connection string is configured
3. Deploy from Git repository

### Frontend (Vercel/Netlify)
1. Update API base URL to production backend URL
2. Build: `npm run build`
3. Deploy `build/` directory

## 📝 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Resume templates and formatting
- [ ] Multiple resume versions
- [ ] Resume comparison
- [ ] Job posting matching
- [ ] Export analysis as PDF
- [ ] Email notifications
- [ ] Resume scoring system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language models
- MongoDB for flexible data storage
- React community for excellent frontend tools

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Open an issue on GitHub

---

Built with ❤️ using MERN Stack + Google Gemini AI
