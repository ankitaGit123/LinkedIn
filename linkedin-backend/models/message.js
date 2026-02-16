const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "conversation",
            required: true
        },
    
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        message: {
            type: String,
            default: ""
        },
        picture: {
            type: String,
        }
        
}, { timestamps: true });

const MessageModel = mongoose.model("message", MessageSchema);
module.exports = MessageModel;
