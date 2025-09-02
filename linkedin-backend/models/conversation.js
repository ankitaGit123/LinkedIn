const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            content: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

const ConversationModel = mongoose.model("conversation", ConversationSchema);
module.exports = ConversationModel;
