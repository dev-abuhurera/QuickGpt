const express = require('express');
const router = express.Router();
const { registerUser, login } = require('../controllers/authController');

// Register
router.post('/register', registerUser);

//Login
router.post('/login', login);

module.exports = router;
