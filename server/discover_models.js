const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function discover() {
  try {
    // The v1 SDK has a different way to list models, but we can try the REST API directly
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.models) {
        console.log('Available Models:');
        data.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods})`));
    } else {
        console.log('No models found or error:', data);
    }
  } catch (err) {
    console.error('Error during discovery:', err);
  }
}

discover();
