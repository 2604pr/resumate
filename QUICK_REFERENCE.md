# ⚡ Quick Reference - AI Resume Analyzer

## 🚀 Quick Start (5 Minutes)

### 1. Prerequisites
```bash
# Check Node.js (need v14+)
node --version

# Check MongoDB is running
mongod --version
```

### 2. Install & Configure
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Setup environment
cd backend
cp .env.example .env
# Edit .env with your Gemini API key
```

### 3. Run
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm start
```

### 4. Access
```
http://localhost:3000
```

## 🔑 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

## 📡 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/resume/upload` | POST | Upload resume |
| `/api/ai/analyze` | POST | Get analysis |
| `/api/ai/interview` | POST | Get questions |
| `/api/ai/career` | POST | Get guidance |
| `/api/resumes` | GET | List resumes |
| `/api/history/:id` | GET | Get history |

## 🎯 Key Features

✅ PDF/DOCX upload (max 5MB)
✅ Text extraction
✅ AI resume analysis
✅ Interview question generation
✅ Career guidance
✅ Analysis history
✅ Responsive UI

## 🛠️ Tech Stack

**Frontend:** React + Custom CSS
**Backend:** Node.js + Express
**Database:** MongoDB
**AI:** Google Gemini
**File Parsing:** PDF-Parse + Mammoth

## 📁 Project Structure

```
resume-analyzer/
├── backend/          # Node.js API
│   ├── config/      # DB config
│   ├── controllers/ # Logic
│   ├── models/      # Schemas
│   ├── routes/      # Routes
│   └── services/    # AI service
├── frontend/        # React app
│   ├── components/  # UI components
│   └── services/    # API calls
└── README.md
```

## 🐛 Quick Troubleshooting

**MongoDB not connecting?**
```bash
mongod  # Start MongoDB
```

**Port 5000 in use?**
```bash
lsof -ti:5000 | xargs kill -9
```

**Gemini API error?**
- Check API key in .env
- Verify no extra spaces
- Check API quota

**Upload fails?**
- File must be < 5MB
- Only PDF or DOCX
- Check uploads/ folder exists

## 📝 Sample Test Flow

1. Upload `sample-resume.txt` (convert to PDF)
2. Click "Generate Analysis"
3. Switch to "Interview Prep"
4. Click "Generate Interview Questions"
5. Switch to "Career Guidance"
6. Review recommendations

## 🔗 Get Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Create API key
4. Copy to .env file

## 💡 Pro Tips

- Use MongoDB Compass to view data visually
- Check browser console (F12) for frontend errors
- Check terminal for backend errors
- Test with different resume formats
- API responses take 5-10 seconds

## 📦 Package Contents

- Complete MERN application
- All backend endpoints working
- React frontend with UI
- MongoDB schemas
- Gemini AI integration
- File upload/parsing
- Comprehensive documentation

## ⏱️ Expected Response Times

- File upload: 1-2 seconds
- Text extraction: 2-3 seconds
- AI analysis: 5-10 seconds
- Database queries: <1 second

## 🎨 Customization Points

- Prompts: `backend/services/geminiService.js`
- UI styles: `frontend/src/index.css`
- AI model: Change in geminiService.js
- File limits: `backend/middleware/upload.js`

## 📊 Database Collections

- `resumes`: Uploaded resume metadata
- `analyses`: AI-generated analyses

## 🚀 Production Checklist

- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas
- [ ] Secure API keys
- [ ] Add authentication
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Configure CORS properly

---

**Happy Coding!** 🎉

Need help? Check SETUP_GUIDE.md for detailed instructions.
