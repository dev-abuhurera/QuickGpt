const jwt = require('jsonwebtoken');
const user = require('../models/User');

const protect = async(req, res, next) => {
    
    let token;
    console.log(req.headers.authorization);

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);    
            req.user = await user.findById(decoded.id).select('-password');
            next();
        }catch(error){
            console.log(error);
            res.status(401).json({message: 'Not authorized'});
        }

    }
    if(!token){
        res.status(401).json({message: 'Not authorized'});
        return;
    }
        
}

module.exports = protect;