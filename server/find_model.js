const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    // Note: The SDK might not have a direct listModels, but we can try to find it in the docs or use the REST API
    // Actually, let's try a few common ones first:
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    for (const m of models) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("hi");
            console.log(`Model ${m} works!`);
            break;
        } catch (e) {
            console.log(`Model ${m} failed: ${e.message}`);
        }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

listModels();
