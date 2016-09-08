var express = require('express')
, app = express()
, sqlite3 = require('sqlite3').verbose()
, db = new sqlite3.Database('TwitterClone.db')
, dbInsertUser = require('./db.js').insertUser
, dbInsertTweet = require('./db.js').insertTweet
, dbGetTweets = require('./db.js').getTweets
, fs = require('fs')
, html = fs.readFileSync('./index.html')
, dbGetPassword = require('./db.js').getPassword
, bodyParser = require('body-parser');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/mainApp', function (req, res){
    var login = {
        userid: req.body.userid,
        password: req.body.password
    };
   console.log(login.password);
    var p = dbGetPassword(db, login);
       p.then(
        (val) => {
            console.log(val);
            console.log(login.password);
           if (login.password === val){
               res.send('Login Succesful');
           }
           else{
               res.send('Username or password issue!');
           }
    }
    ).catch(
        (err) => {
            res.send(err);
    }
    )
});

app.get('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
   res.end(html);
});

app.get('/mainApp', function (req, res){
    res.send('logged in');
})

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

app.get('/gettweets', function (req, res) {
 var user = {
     userid: req.query.userid, 
 };

 var p = dbGetTweets(db, user);
 p.then(
     (val) => {
         res.send(val);
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