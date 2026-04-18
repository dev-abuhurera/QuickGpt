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
            credits: 20,
            token: generateToken(newUser._id),
        })

        await newUser.save();
        res.status(201).json({message: 'User registered successfully'})
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }

};

module.exports = {registerUser};