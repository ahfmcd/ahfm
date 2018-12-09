const express = require ('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const validator = require('validator');
const _ = require('lodash');

const path = require('path');


mongoose.connect('mongodb://localhost:27017/blogdb');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
const port = 8080;

var blogpost = mongoose.model('blogpost', {
    text: {
     type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    postedat:{
        type: Number,
        unique: true
    }
});

var User = mongoose.model('user', {
   email: {
        type: String,
       required: true,
       unique: true,
       trim: true,
       minLength:1,
       validate: {
            validator: (v) => {
                return validator.isEmail(v);
            },
           message: '{VALUE} is not a valid email'
       }
   },
    username: {
       type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
       type: String,
        required: true,
        minLength: 6,
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.get('/signup', (req, res) => {
   res.sendFile(path.join(__dirname, '../static/signup.html'));
});

app.post('/signedup', (req, res) => {
    var user = _.pick(req.body,['email','username','password']);

    var userdata = new User(user);
    userdata.save().then((item) => {
        res.send(item);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/login.html'))
});

app.post('/logedin', (req,res) => {

});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/blog.html'));
});

app.post('/addpost', (req, res) => {
    var postdata = new blogpost(req.body);

    postdata.save().then(item => {
        res.send(`${item} saved post to database`);
    }).catch(err => {
       res.status(400).send(`${err} unable to save the post`);
    });
});

app.listen(port, () => {
   console.log(`app listening on port ${port}`);
});