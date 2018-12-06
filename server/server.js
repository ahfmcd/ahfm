const express = require ('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const path = require('path');


mongoose.connect('mongodb://localhost:27017/blogdb');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/blog.html'));
});

app.post('/addpost', (req, res) => {
    var postdata = new blogpost(req.body);

    postdata.save().then(item => {
        res.send("saved post to database");
    }).catch(err => {
       res.status(400).send("unable to save the post");
    });
});

app.listen(port, () => {
   console.log(`app listening on port ${port}`);
});