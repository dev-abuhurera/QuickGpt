const express = require('express')
const router = express.Router()
const protect = require('../middleware/protect')
const { addMessage, getMessages } = require('../controllers/messageController')
const checkCredit = require('../middleware/checkCredit')

router.post('/:chatId/messages', protect, checkCredit, addMessage)
router.get('/:chatId/messages', protect, getMessages)

module.exports = router