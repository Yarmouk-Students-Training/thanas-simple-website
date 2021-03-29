const { sequelize } = require('./models');
const User = require('./models');
const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const app = express();

async function build(){
    await sequelize.sync({force: true});
    app.listen(3000);
}
build();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//to get the Homepage
app.get('/' , async (req , res) => {
    
    res.json({"message": 'Welcome to the Homepage'});
    }); 

     //to generate an access token when logging in
    function generateAccessToken(username){
        return jwt.sign(username,'secret_key', {expiresIn: '1800s'})
    }

//login (POST)
app.post('/' , async (req,res) => {
    //MUST DO THE BASIC AUTHENTICATION PROCESS FIRST
    console.log(req.body);
    const someUser = await User.user.findOne({email:req.body.email });
    if (someUser){
        const token = generateAccessToken({ username: req.body.email });
        res.json(token);
    }
    else
    res.json({message: "Invalid credentials"});

}); 

//SIGN OUT
app.delete('/sign-out' , (req,res) => {

});

app.use('/users', userRoutes);
app.use('/posts/:postid/comments', commentRoutes);
app.use('/posts/:postid/reactions', reactionRoutes);
app.use('/posts', postRoutes);
