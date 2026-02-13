const express = require("express");
const router = express.Router();
const Authentication = require("../authentication/auth");  
const PostController = require('../controller/post');

router.post('/', Authentication.auth, PostController.addPost);
router.post('/likeDislike', Authentication.auth, PostController.likeDislikePost);
router.get('/getAllPosts',PostController.getAllPosts);
router.get('/getPostById/:postId',PostController.getPostByPostId);
router.get('/getTop5Posts/:userId',PostController.getTop5PostsForUser);
router.get('/getAllPostsForUser/:userId',PostController.getAllPostsByUserId);
router.delete('/:postId', Authentication.auth, PostController.deletePost);
router.put('/:postId', Authentication.auth, PostController.updatePost);




module.exports = router;   