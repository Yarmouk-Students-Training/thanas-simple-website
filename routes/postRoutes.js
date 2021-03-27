const express = require('express');
const Post = require('../models');
const router = express.Router();
router.use(express.json());

//to get all posts
router.get('/', async (req, res) => {
    try{
        const allPosts = await Post.post.findAll({include : 'user'})
        return res.json(allPosts);
    }
    catch(err)
    {
     console.log(err)
    return res.status(500).json(err)
    }
    });

    //to make a new post
router.post('/', async(req,res) => {
    const {userUuid , content} = req.body
    console.log(req.body);
     try{
        const someUser = await Post.user.findOne({where : {uuid : userUuid}});
        const newPost = await Post.post.create({content , userId : someUser.uuid});
        return res.json(newPost);
    }
    catch(err){
    console.log(err);
    return res.status(500).json(err);
    }   
});

//to get a specific post and it's corresponding user, comments and reactions
router.get('/:postid/users/:userid', async (req,res) => {
try{
    const id = req.params.id;
    const somePost = await Post.post.findOne({id,
        include: ['user' , 'comments' , 'reactions']});
    return res.json(somePost);
}
catch(err){
    console.log(err);
    return res.status(500).json(err);
}
});

//delete a specific post 
router.delete('/:postid' , async (req,res) => {
    const post_id = req.params.post_id;
    try{
        const somePost = await Post.post.findOne({post_id})
        await somePost.destroy()
        return res.json({message: "Post deleted"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

//to edit a specific post
router.put('/:postid' , async(req,res) => {
    const {content}=req.body;
    try{
        const post_id = req.params.post_id
        const somePost = await Post.post.findOne({post_id});
        somePost.content = content;
        await somePost.save();
        return res.json(somePost);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

        module.exports = router;