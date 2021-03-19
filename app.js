const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');
const app = express();
const dbURI = 'mongodb+srv://thana:dallas99@cluster0.756re.mongodb.net/simple-website?retryWrites=true&w=majority';
mongoose.connect(dbURI , {useNewUrlParser: true ,useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

app.set('view engine' , 'ejs');

/* app.use((req, res , next ) => {
console.log('A rquest has been made');
console.log(req.path);
console.log(req.method);
console.log(req.host);
next();
}); */

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
/* app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
}); */

/* app.get('/add-blog' , (req , res) => {
  const blog = new Blog({
title: 'Heisenberg' ,
snippet: 'Iam not in danger , I am danger' ,
body: 'I studied chemistry at the California Institute of Technology '
  });
  blog.save()
  .then((result) =>{
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('6052233a763bbc1e3403feea')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
}); */

app.get('/' , (req , res) => {
//res.send(<P>This is the Homepage</P>);
//res.sendFile('./views/index.html' , { root : __dirname});
/* const blogs = [
    {title: 'Heisenberg', snippet: 'I am not in danger, I am Danger !'},
    {title: 'Jesse', snippet: 'This Is My Own Private Domicile, And I Will Not Be Harassed'}
  ];
res.render('index',{title : 'Home' , blogs}); */
res.redirect('/blogs');
});

app.get('/about' , (req , res) => {
 //  res.send(<h1>About page !</h1>);
 // res.sendFile('./views/about.html' , { root : __dirname});
 res.render('about' ,{title : 'About'});
});

//Redirect
/* app.get('/about-me' , (req , res) => {    
    res.redirect('/about');
    }); */
    app.use('/blogs', blogRoutes);
    
app.use((req , res) => {
   // res.status(404).sendFile('./views/404.html' , { root : __dirname});
  res.status(404).render('404' ,{title : '404'});
  });
          