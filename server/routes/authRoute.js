const express = require('express');
const router = express.Router();
const { registerUser, login, getUserData } = require('../controllers/authController');
const protect = require('../middleware/protect');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', login);

// Get User Data
router.get('/data', protect, getUserData);

module.exports = router;
