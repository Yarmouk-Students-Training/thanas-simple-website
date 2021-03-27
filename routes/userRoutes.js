const express = require('express');
const User = require('../models');
const router = express.Router();
router.use(express.json());

//to get a specific user page
router.get('/:uuid' , async (req,res) => {

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
    const newUser = await User.user.create({first_name , last_name , DOB , email , password , gender})
    return res.json(newUser);
}
catch(err){
console.log(err);
return res.status(500).json(err);
}  
});

//to delete an account
router.delete('/:userid' , async (req,res) => {
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
router.put('/:userid' , async (req,res) => {
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

module.exports = router;