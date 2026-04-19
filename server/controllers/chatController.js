const chat = require('../models/Chat');

const createChat = async (req, res) => {

    try{
        const newChat = new chat({
            user: req.user.id,
            title: req.body.title || "New Chat",
        })

        await newChat.save();

        res.status(201).json({
            success: true,
            result: newChat,
        })
    } catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}


const getChats = async (req, res) => {
  
    try {

        const chats = await chat.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(chats);

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })

    }
}

const deleteChat = async (req, res) => {

    try {

        await chat.findByIdAndDelete(req.params.id);
        res.json({ success: true });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: error.message });

    }

}

module.exports = { createChat, getChats, deleteChat };