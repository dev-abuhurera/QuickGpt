const Message = require('../models/Message');
const Chat = require('../models/Chat');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const User = require('../models/User');

console.log('Gemini Key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing')

const addMessage = async (req, res) => {

  try {
   
    const { content } = req.body;
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    const message = await Message.create({ 

        chatId, 
        role: 'user', 
        content,
        creditsUsed: 0

    });

    let aiText = "";
    try {
        
      const result = await model.generateContent(content);
      aiText = result.response.text();

    } catch (aiError) {

      console.error('Gemini AI Error:', aiError);

      return res.status(500).json({ 
        message: 'AI generation failed', 
        error: aiError.message,
        userMessage: message 
      });
      
    }

    const aiMessage = await Message.create({

      chatId,
      role: 'ai',
      content: aiText,
      creditsUsed: 1,

    })

    await User.findByIdAndUpdate(req.user._id, { 
        $inc: { credits: -1 } 
    })

    
    // Update chat title if it's still the default
    if (chat.title === "New Chat") {
        await Chat.findByIdAndUpdate(chatId, { title: content.substring(0, 30) + (content.length > 30 ? '...' : '') });
    }

    res.status(201).json({message, aiMessage, chatTitle: content.substring(0, 30)});

  } 

  catch (error) {

    console.log('Server Error:', error);
    res.status(500).json({ message: error.message });
    return;

  }

}

const getMessages = async (req, res) => {

  try {

    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.json(messages);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

}

module.exports = { addMessage, getMessages }