const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function test() {
  try {
    console.log('Testing Gemini with key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
    const result = await model.generateContent("Hello, say 'connected'");
    console.log('Response:', result.response.text());
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
