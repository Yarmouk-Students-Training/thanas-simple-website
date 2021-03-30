const express = require('express');
const Comment = require('../models/');
const jwt = require('jsonwebtoken');
const router = express.Router();
router.use(express.json());

//to get a specific comment 
router.get('/:commentuuid' ,authenticateToken, async (req,res) => {
    try{
        const comment_uuid = req.params.comment_uuid;
        const someComment = await Comment.comment.findOne({comment_uuid,
            include: 'user'});
        return res.json(someComment);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

//to create a new comment
router.post('/',authenticateToken,async (req,res) => {
    const {userUuid,postUuid,content} = req.body;
    try{
        const somePost = await Comment.post.findOne({where : {post_id : postUuid}});
        const someUser = await Comment.user.findOne({where : {uuid:userUuid}});
        const newComment = await Comment.comment.create({content , postId: somePost.post_id , userId :someUser.uuid})
        return res.json(newComment);
    }
    catch(err){
    console.log(err);
    return res.status(500).json(err);
    }
});

//to delete a specific comment
router.delete('/:commentid', authenticateToken, async (req,res) =>{
    const comment_uuid = req.params.comment_uuid;
    try{
        const someComment = await Comment.comment.findOne({comment_uuid})
        await someComment.destroy()
        return res.json({message: "comment deleted"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

//to edit a specific comment
router.put('/:commentid',authenticateToken, async (req,res) => {
    const {content}=req.body;
    try{
        const comment_uuid = req.params.comment_uuid;
        const someComment = await Comment.comment.findOne({comment_uuid});
        someComment.content = content;
        await someComment.save();
        return res.json(someComment);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

function authenticateToken(req,res,next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
     if (token == null){
        console.log(token)
        return res.sendStatus(403);
    }
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , user) => {
        console.log(req.user);
        req.user = user
        next();
    }) 
    }
module.exports = router;