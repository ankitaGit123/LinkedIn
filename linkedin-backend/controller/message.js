const MessageModel = require('../models/message');
const ConversationModel = require('../models/conversation');
const NotificationModel = require('../models/notification');



exports.sendMessage = async (req, res) => {
    try{
        let { conversationId, message, picture } = req.body;
        
        // Validate that at least message or picture exists
        if (!message && !picture) {
            return res.status(400).json({error: "Message or picture is required"});
        }
        
        // Get conversation to find receiver
        const conversation = await ConversationModel.findById(conversationId).populate('members', 'f_name');
        if (!conversation) {
            return res.status(404).json({error: "Conversation not found"});
        }
        
        // Find receiver (the other person in conversation)
        const receiver = conversation.members.find(member => member._id.toString() !== req.user._id.toString());
        
        let addMessage = new MessageModel({ sender:req.user._id, conversation: conversationId, message: message || "", picture});
        await addMessage.save();
        let populatedMessage = await addMessage.populate("sender");
        
        // Create notification for receiver
        if (receiver) {
            const notificationContent = picture ? 
                `${req.user.f_name} sent you a photo` : 
                `${req.user.f_name} sent you a message`;
            
            const notification = await NotificationModel.create({
                sender: req.user._id,
                receiver: receiver._id,
                content: notificationContent,
                type: 'message',
                conversationId: conversationId
            });
            
            // Emit real-time notification via socket.io
            const io = req.app.get('io');
            if (io) {
                io.to(`user_${receiver._id}`).emit('newNotification', {
                    notification,
                    count: await NotificationModel.countDocuments({ receiver: receiver._id, isRead: false })
                });
            }
        }
        
        return res.status(201).json(populatedMessage);

    }catch(error){
        console.log(error);
        res.status(400).json({error: "Server Error", message:error.message});
    }
}

exports.getMessage = async (req, res) => {
    try {
        let { convId } = req.params;
        let message = await MessageModel.find({ conversation: convId }).populate("sender");
        return res.status(200).json({ message:"Fetched Message Successfully", message })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Server Error", message: error.message });
    }
}
