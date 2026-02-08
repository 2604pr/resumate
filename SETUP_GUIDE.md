# 🚀 Complete Setup Guide

This guide will walk you through setting up the AI Resume Analyzer application from scratch.

## Prerequisites Checklist

Before you begin, ensure you have:
- [ ] Node.js (v14 or higher) - [Download](https://nodejs.org/)
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] Google Gemini API Key
- [ ] A code editor (VS Code recommended)
- [ ] Git (optional, for version control)

## Step-by-Step Setup

### 1. Install Node.js

**Check if already installed:**
```bash
node --version
npm --version
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### 2. Install MongoDB

**Option A: Local Installation**

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**Windows:**
Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (choose free tier)
4. Wait for cluster to provision (~5 minutes)
5. Click "Connect" → "Connect your application"
6. Copy the connection string

### 3. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Click "Create API key in new project"
5. Copy the generated API key
6. **Important**: Keep this key secure and never share it publicly

### 4. Project Setup

**Navigate to the project directory:**
```bash
cd resume-analyzer
```

**Install Backend Dependencies:**
```bash
cd backend
npm install
```

Expected output:
```
added XXX packages, and audited XXX packages in XXs
```

**Install Frontend Dependencies:**
```bash
cd ../frontend
npm install
```

### 5. Configure Environment Variables

**Create .env file:**
```bash
cd ../backend
cp .env.example .env
```

**Edit the .env file:**

For **Local MongoDB**:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
NODE_ENV=development
```

For **MongoDB Atlas**:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-analyzer?retryWrites=true&w=majority
GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
NODE_ENV=development
```

Replace:
- `YOUR_ACTUAL_API_KEY_HERE` with your Gemini API key
- `username:password` with your Atlas credentials (if using Atlas)
- `cluster.mongodb.net` with your Atlas cluster URL (if using Atlas)

### 6. Start the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
📝 Environment: development
🌐 API URL: http://localhost:5000
✅ MongoDB Connected Successfully
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!

You can now view resume-analyzer-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### 7. Access the Application

Open your browser and go to:
```
http://localhost:3000
```

You should see the AI Resume Analyzer interface!

## Testing the Application

### Test File Upload

1. Click the upload area or drag and drop a PDF/DOCX resume
2. Use the provided `sample-resume.txt` (convert to PDF if needed)
3. Verify successful upload and text extraction

### Test AI Analysis

1. Click "Generate Analysis" button
2. Wait for AI response (~5-10 seconds)
3. Review the comprehensive resume analysis

### Test Interview Questions

1. Switch to "Interview Prep" tab
2. Click "Generate Interview Questions"
3. Review technical and behavioral questions

### Test Career Guidance

1. Switch to "Career Guidance" tab
2. Click "Generate Career Guidance"
3. Review job recommendations and skill suggestions

## Verification Checklist

- [ ] Backend server starts without errors
- [ ] Frontend opens in browser
- [ ] MongoDB connection successful
- [ ] File upload works
- [ ] Text extraction displays correctly
- [ ] AI analysis generates successfully
- [ ] Interview questions generate
- [ ] Career guidance generates
- [ ] No console errors

## Common Issues & Solutions

### Issue: "MongoDB connection failed"
**Solution:**
- Ensure MongoDB is running: `mongod` or `brew services start mongodb-community`
- Check connection string in `.env`
- For Atlas: Verify network access settings (add your IP)

### Issue: "Gemini API Error"
**Solution:**
- Verify API key is correct
- Check if you have API quota remaining
- Ensure no extra spaces in `.env` file

### Issue: "Port 5000 already in use"
**Solution:**
- Kill process using port 5000: `lsof -ti:5000 | xargs kill -9`
- Or change PORT in `.env` to different number (e.g., 5001)

### Issue: "Cannot find module"
**Solution:**
- Delete `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`

### Issue: "CORS error"
**Solution:**
- Ensure backend is running
- Check backend URL in frontend is correct
- Verify CORS is enabled in `server.js`

### Issue: "File upload fails"
**Solution:**
- Check file size < 5MB
- Verify file format is PDF or DOCX
- Ensure `uploads/` directory exists in backend

## Database Management

### View MongoDB Data

**Using MongoDB Compass (GUI):**
1. Download from [mongodb.com/compass](https://www.mongodb.com/products/compass)
2. Connect to `mongodb://localhost:27017`
3. Navigate to `resume-analyzer` database

**Using MongoDB Shell:**
```bash
mongosh
use resume-analyzer
db.resumes.find()
db.analyses.find()
```

### Clear Database (for testing)
```bash
mongosh
use resume-analyzer
db.resumes.deleteMany({})
db.analyses.deleteMany({})
```

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Changes auto-refresh browser
- Backend: Using nodemon, changes auto-restart server

### Debugging

**Backend logs:**
Check terminal running backend for error messages

**Frontend logs:**
Open browser console (F12) → Console tab

**MongoDB logs:**
Check MongoDB logs for connection issues

### Code Structure

```
backend/
  ├── config/      # Configuration files
  ├── controllers/ # Request handlers
  ├── middleware/  # Custom middleware
  ├── models/      # Database schemas
  ├── routes/      # API routes
  ├── services/    # Business logic
  └── utils/       # Helper functions

frontend/
  ├── components/  # React components
  ├── services/    # API calls
  └── App.js       # Main app
```

## Next Steps

After successful setup:

1. **Customize prompts**: Edit `backend/services/geminiService.js`
2. **Add features**: Implement authentication, user profiles
3. **Improve UI**: Enhance styling, add animations
4. **Deploy**: Deploy to Heroku, Vercel, or similar platforms
5. **Test thoroughly**: Add unit and integration tests

## Resources

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Getting Help

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review console/terminal error messages
3. Check backend and frontend logs
4. Verify environment variables
5. Ensure all dependencies are installed
6. Try clearing node_modules and reinstalling

## Security Reminders

- ⚠️ Never commit `.env` files
- ⚠️ Keep API keys secure
- ⚠️ Don't share your Gemini API key
- ⚠️ Use environment variables in production
- ⚠️ Implement proper authentication for production

---

**Congratulations!** 🎉 You've successfully set up the AI Resume Analyzer!

Ready to analyze some resumes? Upload one and see the AI in action!
