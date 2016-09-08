var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterClone.db');
var dbInsertUser = require('./db.js').insertUser;
var dbInsertTweet = require('./db.js').insertTweet;



app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/adduser', function (req, res){
    
 var user = {
    userid: req.query.userid,
     password: req.query.password,
     firstname: req.query.firstname,
     lastname: req.query.lastname,
     email: req.query.email

 };
var p = dbInsertUser(db, user);
    p.then(
        (val) => {
            res.send('User Added');
    }
    ).catch(
        (err) => {
            res.send(err);
    }
    )
} );

app.get('/addtweet', function (req, res) {
 var tweet = {
     userid: req.query.userid, 
     tweetcontent: req.query.tweetcontent, 
     tweetts: new Date() 
 };

 var p = dbInsertTweet(db, tweet);
 p.then(
     (val) => {
         res.send('Tweet Added');
     }
 ).catch(
     (err) => {
         res.send(err);
     }
 )
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});