const express = require('express');
const Blog = require('../models/blog.js');
const router = express.Router();

router.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', {title:'All blogs' , blogs:result });
        })
      .catch(err => {
        console.log(err);
        });
      });

router.post('/', (req, res) => {
 // console.log(req.body); 
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    }); 
});

router.get('/create' , (req , res) => {       
  res.render('create' , {title : 'Create new blog'});
  }); 
  
router.get('/:id' , (req, res) => {
const id = req.params.id;
Blog.findById(id)
.then(result => {
  res.render('details' , {blog: result , title:'Blog details'})
})
.catch(err => {
  console.log(err);
});
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports=router;