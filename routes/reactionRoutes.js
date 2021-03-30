const express = require('express');
const Reaction = require('../models');
const jwt = require('jsonwebtoken');
const router = express.Router();
router.use(express.json());

//to make a reaction
router.post('/' , authenticateToken,async (req,res) => {
    const {userUuid,postUuid,name} = req.body;
    try{
        const somePost = await Reaction.post.findOne({where : {post_id : postUuid}});
        const someUser = await Reaction.user.findOne({where : {uuid:userUuid}});
        const newReaction = await Reaction.reaction.create({name , postId: somePost.post_id , userId :someUser.uuid})
        return res.json(newReaction);
    }
    catch(err){
    console.log(err);
    return res.status(500).json(err);
    }
});

router.delete('/:reaction_uuid', authenticateToken,async (req,res) =>{
    const reaction_uuid = req.params.reaction_uuid;
    try{
        const someReaction = await Reaction.reaction.findOne({where:{reaction_uuid , userId:req.uuid}})
        if(someReaction){
        await someReaction.destroy()
        return res.json({message: "Reaction deleted"});
        }
        else {
            return res.json("Cannot delete the reaction")
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

router.put('/:reactionid', authenticateToken,async (req,res) => {
    const {name}=req.body;
    try{
        const reaction_uuid = req.params.reaction_uuid;
        const someReaction = await Reaction.reaction.findOne({reaction_uuid});
        someReaction.name = name;
        await someReaction.save();
        return res.json(someReaction);
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
        if(err){ return res.json('Expired/Invalid token')
        }       
        console.log("*************",user);
        req.user = user.user
        req.uuid = user.user.uuid
        next();
    }) 
    }
module.exports = router;