const CommentModel = require('../models/comment');
const PostModel = require('../models/post');
const NotificationModel = require('../models/notification');



exports.commentPost = async (req, res) => {
    try{
        const { postId, comment } = req.body;
        const userId = req.user._id;

        const postExist = await PostModel.findById(postId).populate("user");
        if(!postExist){
            return res.status(400).json({ error: "No such post exists" });
        }

        postExist.comments = postExist.comments +1;
        await postExist.save();

        const newComment = new CommentModel({
            user: userId,
            post: postId,
            comment
        });

        await newComment.save();

        const populatedComment = await CommentModel.findById(newComment._id).populate('user','f_name headline profilePic');

        //notifocation
        const content = `${req.user.f_name} has commented on your post`;
        const notification = new NotificationModel({ sender:userId,receiver:postExist.user._id,content,type:"comment",postId:postId.toString()});
        await notification.save();

        res.status(201).json({ message: 'Comment created successfully', comment: populatedComment });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }   
}

exports.getCommentsByPostId = async (req, res) => {
    try{
        const { postId } = req.params;
        console.log("Fetching comments for postId:", postId);
        
        const isPostExist = await PostModel.findById(postId);
        if(!isPostExist){
            console.log("Post not found:", postId);
            return res.status(400).json({ error: "No such post exists" });
        }
        const comments = await CommentModel.find({ post: postId }).sort({ createdAt: -1 }).populate('user','f_name headline profilePic');
        console.log("Found comments:", comments.length);
        res.status(200).json({ 
            message:"Comments fetched",
            comments:comments
         });
    }catch(err){
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
       
    }
}