const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const authRoute = require("./routes/authRoute.js");
const chatRoute = require("./routes/chatRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const protect = require("./middleware/protect.js");

// MongoDB Connection
connectDB();

// Port
const port = process.env.PORT || 5000;

// Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.use('/api/auth', authRoute);
app.use('/api/chats', chatRoute);
app.use('/api/chats', messageRoute);


// Test Route 
app.get('/api/test', protect, (req, res) => {
    res.send('Test route');
})

//Server Starting
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

