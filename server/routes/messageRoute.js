const express = require('express')
const router = express.Router()
const protect = require('../middleware/protect')
const { addMessage, getMessages } = require('../controllers/messageController')

router.post('/:chatId/messages', protect, addMessage)
router.get('/:chatId/messages', protect, getMessages)

module.exports = router