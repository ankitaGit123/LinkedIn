const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: {
        type:String,
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
    
    },
    f_name: {
        type:String,
        required:true
    },
    headline: {
        type:String,
        default: ""
    },
    curr_company: {
        type: String,
        default: ""
    },
    curr_location: {
        type: String,
        default: ""
    },
    

    profilePic: {
        type:String,
        default:"https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"
    },
    cover_pic: {
        type:String,
        default:"https://img.freepik.com/free-photo/gradient-dark-blue-futuristic-digital-grid-background_53876-129728.jpg?semt=ais_hybrid&w=740&q=80"
    },
    about: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    },
    experience: [
        {
            designation: {
                type: String,
            },
            company: {
                type: String,
            },
            location: {
                type: String,
            },
            duration: {
                type: String,
            }
            
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    pending_friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    resume: {
        type: String,
        default: ""
    }
},{timestamps:true}); //when user edits their profile

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
