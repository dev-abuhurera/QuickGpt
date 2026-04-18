const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const authRoute = require("./routes/authRoute.js");

// Dotenv Configuration
dotenv.config();

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
app.use('/api/login', authRoute);

//Server Starting
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

