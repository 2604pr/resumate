const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGemini() {
  try {
    console.log('Testing Gemini API...');
    console.log('API Key exists:', process.env.GEMINI_API_KEY ? 'YES ✅' : 'NO ❌');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    console.log('\nSending test request...');
    const result = await model.generateContent('Say hello in one sentence');
    const response = result.response;
    
    console.log('\n✅ SUCCESS! Gemini API is working!');
    console.log('Response:', response.text());
    
  } catch (error) {
    console.error('\n❌ FAILED!');
    console.error('Error:', error.message);
    console.error('\nFull error:', error);
  }
}

testGemini();