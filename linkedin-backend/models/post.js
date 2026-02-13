const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    desc: {
        type: String,

    },
    imageLink: {
        type: String,
    },
    mediaType: {
        type: String,
        enum: ['image', 'video', null],
        default: null
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    comments: {
        type:Number,
        default:0
    }
}, { timestamps: true });

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
