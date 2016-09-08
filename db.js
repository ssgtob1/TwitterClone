var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterClone.db');




function insertUser(db, user) {
    return new Promise(
        (resolve, reject) => {
            db.serialize(function() {
                    var stmt = db.prepare("INSERT INTO user  VALUES(?,?,?,?,?)");
                    stmt.run(user.userid, user.password, user.firstname, user.lastname, user.email),
                        function(err) {
                            if (err) {
                                db.close();
                                reject(err);
                                return;
                            }
                            db.close();
                            resolve();
                        });
            });



    }

    function inserTweet(db, tweet) {
        return new Promise(
                (resolve, reject) => {
                    db.serialize(function() {
                        var stmt = db.prepare("INSERT INTO tweets  VALUES(?,?,?)");
                        stmt.run(tweet.userid, tweet.tweetcontent, tweet.tweettsfunction(err) {
                            if (err) {
                                db.close();
                                reject(err);
                                return;
                            }
                            db.close();
                            resolve();
                        });
                    });

                }