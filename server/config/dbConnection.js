const mongoose = require('mongoose');

const connectDB = async () => {
    
    if(process.env.NODE_ENV === 'development'){
        try {
            await mongoose.connect(process.env.MONGODB_URI) 
            console.log('Mongoose Connection Established')
        }catch{
            console.error('MongoDB Connection Error')
        }
    }
    
}

module.exports = connectDB;

