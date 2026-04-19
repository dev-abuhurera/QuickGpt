const Message = require('../models/Message');
const Chat = require('../models/Chat');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

console.log('Gemini Key:', process.env.GEMINI_API_KEY)

const addMessage = async (req, res) => {

  try {
   
    const { role, content } = req.body;
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    const message = await Message.create({ 

        chatId, 
        role: 'user', 
        content,
        credit: 0 

    });

    const result = await model.generateContent(content);
    const aiText = result.response.text();

    const aiMessage = await Message.create({

      chatId,
      role: 'ai',
      content: aiText,
      creditsUsed: 1,

    })

    res.status(201).json({message, aiMessage});

  } 

  catch (error) {

    console.log(error);
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