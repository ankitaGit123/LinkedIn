const MessageModel = require('../models/message');




exports.sendMessage = async (req, res) => {
    try{
        let { conversation, message, picture } = req.body;
        let addMessage = new MessageModel({ sender:req.user._id, conversation, message, picture});
        await addMessage.save();
        let populatedMessage = await addMessage.populate("sender");
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
