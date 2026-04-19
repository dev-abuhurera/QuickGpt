const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({

    chatId:      { 

        type: Schema.Types.ObjectId, 
        ref: 'Chat', 
        required: true

     },
    role:   { 

        type: String, 
        enum: ['user', 'ai'], 
        required: true 

    },
    content:     {

        type: String, 
        default: ''

     },
    imageUrl:    { 

        type: String,
        default: null

    },
    creditsUsed: { 

        type: Number, 
        default: 0

    },

}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema);
