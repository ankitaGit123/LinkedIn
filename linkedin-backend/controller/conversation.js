const ConversationModel = require('../models/conversation');
const MessageModel = require('../models/message');
const PostModel = require('../models/post');
const NotificationModel = require('../models/notification');



exports.addConversation = async (req, res) => {
    try{
        let senderId = req.user._id;
        let { recieverId, message } =req.body;
        let isConvExist = await ConversationModel.findOne({
            members: { $all: [senderId, recieverId] }

        });
        if( !isConvExist){
            let newConversation = new ConversationModel({
                members: [senderId, recieverId]
            });
            await newConversation.save();
            let addMessage = new MessageModel({ sender: req.user._id, conversation: newConversation._id, message });
            await addMessage.save();
        }else{
            let addMessage = new MessageModel({ sender: req.user._id, conversation: isConvExist._id, message });
            await addMessage.save();
        }
        res.status(200).json({ message: "Message sent" });
    }catch(error){
        console.error("Error adding conversation:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getConversation = async (req, res) => {
    try {
        let loggedId = req.user._id;
        let conversations = await ConversationModel.find({
            members: { $in: [loggedId] }
        }).populate("members", "-password").sort({ createdAt: -1});
        return res.status(200).json({
            message: "Fetched Successfully",
            conversations: conversations
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
