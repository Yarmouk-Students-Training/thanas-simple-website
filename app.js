require('dotenv').config();
const { sequelize,refreshtoken } = require('./models');
const User = require('./models');
const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const app = express();
app.use(express.json());
async function build(){
    await sequelize.sync(/* {alter: true} */);
    app.listen(3000);
}
build();
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//to get the Homepage
app.get('/' , async (req , res) => {
    
    res.json({"message": 'Welcome to the Homepage'});
    }); 

//login (POST)
app.post('/' , async (req,res) => {
    
    console.log(req.body);
    const someUser = await User.user.findOne({where: {email:req.body.email}});
    if (!someUser ){
        return res.status(400).send("Cannot find user")
    }
    try{
        if(await bcrypt.compare(req.body.password , someUser.password)){
            const accesToken = generateAccessToken({email:someUser.email , uuid:someUser.uuid});
            const refreshToken = jwt.sign({someUser:someUser.email} , process.env.REFRESH__TOKEN_SECRET , {expiresIn:'60d'});
           try{ await refreshtoken.create({token:refreshToken , userId:someUser.uuid});
            res.json({accesToken , refreshToken});}
            catch(err){
                console.log(err);
                res.json(" You're Already logged in")
            }
        }else
        {
            res.json('access denied');
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }

function generateAccessToken(user){
    return jwt.sign({user} , process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'})
}

}); 
//SIGN OUT
app.delete('/sign-out' , async  (req,res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
     if (token == null){
        console.log(token)
        return res.sendStatus(403);
    }
    jwt.verify(token , process.env.REFRESH__TOKEN_SECRET , async (err , user) => {
        if(err){ return res.json('Expired/Invalid token')
        }  
        else{
            try{
                const someToken = await refreshtoken.findOne({token})
                await someToken.destroy()
                return res.json({message: "Logged out successfuly"});
            }
            catch(err){
                console.log(err);
                return res.status(500).json(err);
            }
        }  
});
})
app.use('/users', userRoutes);
app.use('/posts/:postid/comments', commentRoutes);
app.use('/posts/:postid/reactions', reactionRoutes);
app.use('/posts', postRoutes);

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