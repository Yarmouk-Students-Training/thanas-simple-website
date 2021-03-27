const express = require('express');
const Reaction = require('../models');
const router = express.Router();
router.use(express.json());

//to make a reaction
router.post('/' , async (req,res) => {
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

router.delete('/:reactiontid', async (req,res) =>{
    const reaction_uuid = req.params.reaction_uuid;
    try{
        const someReaction = await Reaction.reaction.findOne({reaction_uuid})
        await someReaction.destroy()
        return res.json({message: "Reaction deleted"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

router.put('/:reactionid', async (req,res) => {
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

module.exports = router;