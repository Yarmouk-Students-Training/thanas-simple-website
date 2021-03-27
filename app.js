const { sequelize} = require('./models');
const express = require('express');
const morgan = require('morgan');
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

app.get('/' , (req , res) => {
    
    res.redirect('/posts');
    });
app.use('/users', userRoutes);
app.use('/posts/:postid/comments', commentRoutes);
app.use('/posts/:postid/reactions', reactionRoutes);
app.use('/posts', postRoutes);
