const express = require('express');
const router = express.Router();
const { createChat, getChats, deleteChat } = require('../controllers/chatController');
const protect = require('../middleware/protect');


router.post('/', protect, createChat);

router.get('/', protect, getChats);

router.delete('/:id', protect, deleteChat);

module.exports = router;