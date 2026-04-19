const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const registerUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            res.status(400).json({message: 'All fields are required'});
            return;
        }

        const user = await User.findOne({email : email})
        if(user){
            res.status(400).json({message: 'User already exists'});
            return;
        }
        const newUser = new User({
            name,
            email,
            password,
        })

        await newUser.save();
        res.status(201).json({message: 'User registered successfully', 
            token: generateToken(newUser._id),
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                credits: newUser.credits,
            }
        })
    
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({message: 'All fields are required'});
            return;
        }

        const user = await User.findOne({email: email});
        if(!user){
            res.status(401).json({message: 'User not found'});
            return;
        }

        const isMatch = await user.isMatch(password);
        if(!isMatch){
            res.status(401).json({message: "Invalid credentials"});
            return;
        }

        res.status(200).json({
            message: "Login successful",
            token: generateToken(user._id),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                credits: user.credits,
            }
        })
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                credits: user.credits
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
 
module.exports = { registerUser, login, getUserData };