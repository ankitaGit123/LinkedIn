const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken');    
const NotificationModel = require('../models/notification');


const cookieOptions = {
    httpOnly: true,
    secure: false, //set to true in production
    sameSite: 'Lax' //set None in production
};

exports.loginThroughGmail = async (req,res) =>{
    try{
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { sub, email, name, picture } = payload;

        let userExist = await User.findOne({email});
        if(!userExist){
            //Register new user
            userExist = await User.create({
                googleId: sub,
                email,
                f_name: name,
                profilePic: picture
            });
        }
        let jwttoken = jwt.sign({ userId: userExist._id }, process.env.JWT_PRIVATE_KEY);
        res.cookie('token',jwttoken,cookieOptions)
        res.status(200).json({user: userExist});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error", message:error.message});
    }
}


exports.register = async (req,res) =>{
    try{
       let { email, password, f_name } = req.body;
       let isUserExist = await User.findOne({email});
       console.log(req.body);
       if(isUserExist){
           return res.status(400).json({error: "Already have an account with this email. Please try with another email"});
       }
       const hashedPassword = await bcrypt.hash(password,10);
       const newUser = new User({ email, password: hashedPassword, f_name });
       await newUser.save();
       res.status(201).json({message: "User registered successfully", success: "yes", data: newUser});
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error", message:error.message});
    }
}

exports.login = async (req,res) =>{
    try{
        let { email, password } = req.body;
        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({error: "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(400).json({error: "Invalid email or password"});
        }
        // let token = jwt.sign({ userId: userExist._id }, process.env.JWT_PRIVATE_KEY);
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     sameSite: "none",
        //     secure: false,
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        // });
        // res.status(200).json({message: "Login successful", success: "yes", data: userExist});


        let token = jwt.sign({ userId: userExist._id }, process.env.JWT_PRIVATE_KEY);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",   // ✅ change here
            secure: false,     // localhost
            path: "/",         // important
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            success: "yes",
            data: userExist
        });


    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error", message:error.message});
    }
}

exports.updateUser = async (req,res) =>{
    try{
        const user = req.body?.user ?? req.body;
        if(!user){
            return res.status(400).json({ error: "Invalid user payload" });
        }
        const updateId = req.user?._id || user._id;
        if(!updateId){
            return res.status(400).json({ error: "Invalid user id" });
        }
        if(user._id && updateId.toString() !== user._id.toString()){
            return res.status(403).json({ error: "Not authorized to update this user" });
        }
        const isExist = await User.findById(updateId);
        if(!isExist){
            return res.status(404).json({error: "User not found"});
        }
        const allowedFields = [
            "f_name",
            "headline",
            "curr_company",
            "curr_location",
            "profilePic",
            "cover_pic",
            "about",
            "skills",
            "experience",
            "resume",
        ];
        const updateData = {};
        allowedFields.forEach((field) => {
            if (user[field] !== undefined) {
                updateData[field] = user[field];
            }
        });

        const updatedUser = await User.findByIdAndUpdate(
            isExist._id,
            updateData,
            { new: true }
        );

        const userData = updatedUser || await User.findById(updateId);
        res.status(200).json({
            message: "User updated successfully",
            user: userData
        });
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error", message:error.message});
    }
}

exports.getProfileId = async (req,res) =>{
    try{
        const { id } = req.params;
        const isExist = await User.findById(id);
        if(!isExist){
            return res.status(400).json({ error: 'No Such User Exist'});
        }
        return res.status(200).json({
            message: "User fetched successfully",
            user: isExist
        })

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'server error', message:error.message});
    }
}

//for finding user
exports.findUser = async (req,res) =>{
    try{
        let { query } = req.query;
        const users = await User.find({
            $and: [
                {_id : {$ne:req.user._id}},
                {
                    $or: [
                        { f_name: { $regex: new RegExp(`^${query}`, 'i' ) } },
                        { email: { $regex: new RegExp(`^${query}`, 'i' ) } }
                    ]
                }
            ]
        });
        return res.status(200).json({
            message: "Member fetched successfully",
            users: users
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'server error', message:error.message});
    }
}

exports.sendFriendRequest = async (req,res) =>{
    try{
        const sender = req.user._id;
        const { receiver } = req.body;

        const userExist = await User.findById(receiver);
        if(!userExist){
            return res.status(404).json({
                error: "No such user exists"
            });
        }
        const index = req.user.friends.findIndex(id => id.equals(receiver));
        
        if(index !== -1){ //if not friends then == -1 
            return res.status(400).json({ 
                error: "Already Friends"  
            });
        }
        const lastIndex = userExist.pending_friends.findIndex(id => id.equals(req.user._id));
        if(lastIndex !== -1){
            return res.status(400).json({
                error: "Friend request already sent"
            });
        }

        userExist.pending_friends.push(sender);
        let content = `${req.user.f_name} has sent you a friend request`;
        const notification = new NotificationModel({ sender, receiver, content, type: "friendRequest", postId: "" });
        await notification.save();
        await userExist.save();

        res.status(200).json({ 
            message: "Friend request sent" 
        });

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message:error.message });
    }
}

exports.acceptFriendRequest = async (req,res) =>{
    try{
        let { friendId } = req.body;  //ankita
        const selfId = req.user._id;  //suru

        const friendData = await User.findById(friendId);
        if(!friendData){
            return res.status(404).json({ error: 'No Such User Exist'});
        }

        const index = req.user.pending_friends.findIndex(id => id.equals(friendId));
        if(index !== -1){
            req.user.pending_friends.splice(index, 1); //remove 1 item
        } else{
            return res.status(400).json({ error: 'No Friend Request from this user'});
        }

        req.user.friends.push(friendId);
        friendData.friends.push(req.user._id);
        let content = `${req.user.f_name} has accepted your friend request`;

        const notification = new NotificationModel({ sender: req.user._id, receiver: friendId, content, type: "friendRequest", postId: "" });
        await notification.save();
        await friendData.save();
        await req.user.save();

        return res.status(200).json({
            message: "You both are connected now",
        });

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'server error', message:error.message});
    }
}

exports.getFriendsList = async (req,res) =>{
    try{
        let friendsList = await req.user.populate('friends');
        return res.status(200).json({
            friends:friendsList.friends
        })
    
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'server error', message:error.message});
    }
}

exports.getFriendsList = async (req,res) =>{
    try{
        let friendsList = await req.user.populate('friends');
        return res.status(200).json({
            friends:friendsList.friends
        })
    
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'server error', message:error.message});
    }
}

exports.getPendingFriendsList = async (req,res) =>{
    try{
        let pendingFriendsList = await req.user.populate('pending_friends');
        return res.status(200).json({
            pendingFriends:pendingFriendsList.pending_friends
        })

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'server error', message:error.message});
    }
}

exports.removeFromFriendsList = async (req,res) =>{
    try{
        const selfId = req.user._id;  //Suru
        const { friendId } = req.params; //Aviya

        const friendData = await User.findById(friendId);
        if(!friendData){
            return res.status(404).json({ 
                error: 'No Such User Exist'
            });
        }
        const index = req.user.friends.findIndex(id => id.equals(friendId));
        const friendIndex = friendData.friends.findIndex(id => id.equals(selfId));

        if(index !== -1){
            req.user.friends.splice(index, 1);
        } else{
            return res.status(400).json({ 
                message: 'No any request from such user'
            });
        }

        if(friendIndex !== -1){
            friendData.friends.splice(friendIndex, 1);
        }else{
            return res.status(400).json({ 
                message: 'No any request from such user'
            });
        }

        await req.user.save();
        await friendData.save();
        return res.status(200).json({ message: "You both are no longer friends" });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'server error', message:error.message});
    }
}

exports.logout = async (req,res) =>{
    res.clearCookie('token', cookieOptions).json({ message: "Logout successful" });
}