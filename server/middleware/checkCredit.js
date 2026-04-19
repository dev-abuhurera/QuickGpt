const User = require('../models/User');

const checkCredit = async (req, res, next) => {
    try{

        const user = await User.findById(req.user.id);

        if(!user) return res.status(404).json({message: 'User not found'})

        if(user.credits <= 0) return res.status(400).json({message: 'Insufficient credits'})

        next();

    } catch(error){

        console.log(error);
        res.status(500).json({message: error.message});
    }
}

module.exports = checkCredit;