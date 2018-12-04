const express = require ('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogdb');

const app = express();
const port = 8080;

var blogpost = mongoose.model('blogpost', {
    text: {
     type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    postedat:{
        type: Number
    }
});

var newblogpost = new blogpost({
    text: "first post in this blog and database",
    email: "arashfiroozi32@gmail.com"
});

newblogpost.save().then((doc)=> {
    console.log('creating model success', doc);
}, (e) => {
    console.log('unable to save data');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/blog.html'));
});

app.listen(port, () => {
   console.log(`app listening on port ${port}`);
});