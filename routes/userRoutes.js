const express = require('express');
const User = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
router.use(express.json());

//to get a specific user page
router.get('/:uuid' , authenticateToken,async (req,res) => {

    try{
        const uuid = req.params.uuid
        const someUser = await User.user.findOne({where: {uuid},
            include: 'posts'})
        return res.json(someUser);
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

// to make a new account
router.post('/' , async (req,res) => {    
  const {first_name , last_name , DOB , email , password , gender} = req.body;
try{
    const hashedPassword = await bcrypt.hash(req.body.password ,10);
    const newUser = await User.user.create({first_name , last_name , DOB , email , password: hashedPassword , gender})
    return res.json(newUser);
}
catch(err){
console.log(err);
return res.status(500).json(err);
}  
});

//to delete an account
router.delete('/:userid' ,authenticateToken, async (req,res) => {
    const uuid = req.params.uuid;
    try{
        const someUser = await User.user.findOne({uuid})
        await someUser.destroy()
        return res.json({message: "Account deleted"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

//to edit an account info
router.put('/:userid' ,authenticateToken, async (req,res) => {
    const {first_name , last_name , DOB , email , password , gender}=req.body;
    try{
        const uuid = req.params.uuid
        const someUser = await User.user.findOne({uuid});
        someUser.first_name = first_name;
        someUser.last_name = last_name;
        someUser.DOB = DOB;
        someUser.email = email;
        someUser.password = password;
        someUser.gender = gender;
        await someUser.save();
        return res.json(someUser);
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