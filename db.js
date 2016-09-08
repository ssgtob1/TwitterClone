var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterClone.db');


exports.insertUser = insertUser;
exports.insertTweet = insertTweet;
exports.getPassword = getPassword;

function insertUser(db, user) {
    return new Promise(
        (resolve, reject) => {
            db.serialize(function() {
                    var stmt = db.prepare("INSERT INTO user  VALUES(?,?,?,?,?)");
                    stmt.run(user.userid, user.password, user.firstname, user.lastname, user.email,
                        function(err) {
                            if (err) {
                                stmt.finalize();
                            
                                reject(err);
                                return;
                            }
                            stmt.finalize();
                            
                            resolve();
                        });
            });
        })



}

function insertTweet(db, tweet) {
    return new Promise(
        (resolve, reject) => {
            db.serialize(function() {
                    var stmt = db.prepare("INSERT INTO tweets  VALUES(?,?,?,?)");
                    stmt.run(null, tweet.userid, tweet.tweetcontent, tweet.tweetts, function(err) {
                        if (err) {
                            stmt.finalize();
                          
                            reject(err);
                            return;
                        }
                        stmt.finalize();
                      
                        resolve();
                    });
                })
            })

    }

    function getPassword(db, user) {
        return new Promise(
            
                (resolve, reject) => {
                    db.serialize(function() {
                    db.each("SELECT password FROM user WHERE userid = ? ", user.userid, function(err, row) {
                        if (err) {
                          
                            reject(err);
                            return;
                        }
                        console.log(row.password);
                        resolve(row.password);
                    });
                }
                    )}
        )
    }