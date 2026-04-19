const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        default: 20,
    }, 
}, {timestamps: true})

// Password Hashing
userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    else this.password = await bcrypt.hash(this.password, saltRounds)
})

//Password Comparison
userSchema.methods.isMatch = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);


