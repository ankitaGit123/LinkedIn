const User = require('../models/user');
const PostModel = require('../models/post');

exports.addPost = async (req, res) => {
    try{
        const { desc, imageLink } = req.body;
        let userId = req.user._id;

        const addPost = new PostModel({ user: userId, desc, imageLink })

        if(!addPost){
            return res.status(400).json({ error: "Something Went Wrong" });
        }
        await addPost.save();
        return res.status(200).json({ 
            message:"Post successfully",
            post: addPost
        })

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message:error.message });
    }
}

exports.likeDislikePost = async (req, res) => {
    try{
        let selfId = req.user._id;
        let{ postId } = req.body;
        let post = await PostModel.findById(postId);
        if(!post){
            return res.status(400).json({ error: "No Such Post Exist" });
        }
        const index = post.likes.findIndex(id=> id.equals(selfId));

        if(index !== -1){
            //User alerady liked the post, remove like
            post.likes.splice(index, 1);
        }else{
            //user has not likesd the post, add like
            post.likes.push(selfId);
        }
        await post.save();
        res.status(200).json({
            message:index !== -1 ? 'Post unliked' : "Post Liked",
            likes: post.likes
        });
    
        
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
}

exports.getAllPosts = async(req,res) =>{
    try{
        let posts = await PostModel.find().sort({ createdAt: -1 }).populate("user", "-password");
        res.status(200).json({
            message: "Fetched data successfully",
            posts:posts
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message:error.message });
    }
}

exports.getPostByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await PostModel.findById(postId).populate("user", "-password");
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({
            message: "Fetched data successfully",
            post: post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}

exports.getTop5PostsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ user: userId })
            .sort({ likes: -1 })
            .limit(5)
            .populate("user", "-password");
        res.status(200).json({
            message: "Fetched data successfully",
            posts: posts
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}

exports.getAllPostsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate("user", "-password");
        res.status(200).json({
            message: "Fetched data successfully",
            posts: posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}
