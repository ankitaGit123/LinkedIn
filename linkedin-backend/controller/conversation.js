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
        
        let conversationId;
        
        if( !isConvExist){
            let newConversation = new ConversationModel({
                members: [senderId, recieverId]
            });
            await newConversation.save();
            conversationId = newConversation._id;
            let addMessage = new MessageModel({ sender: req.user._id, conversation: newConversation._id, message });
            await addMessage.save();
        }else{
            conversationId = isConvExist._id;
            let addMessage = new MessageModel({ sender: req.user._id, conversation: isConvExist._id, message });
            await addMessage.save();
        }
        
        // Create notification for receiver
        const notification = await NotificationModel.create({
            sender: senderId,
            receiver: recieverId,
            content: `${req.user.f_name} sent you a message`,
            type: 'message',
            conversationId: conversationId
        });
        
        // Emit real-time notification via socket.io
        const io = req.app.get('io');
        if (io) {
            io.to(`user_${recieverId}`).emit('newNotification', {
                notification,
                count: await NotificationModel.countDocuments({ receiver: recieverId, isRead: false })
            });
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
