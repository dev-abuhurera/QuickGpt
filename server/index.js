const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// // MongoDB Connection
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/quickgpt";
// mongoose.connect(MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB established successfully"))
//   .catch(err => console.error("MongoDB connection error:", err));

//Server Starting
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

