const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        default: 'New Chat'
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);