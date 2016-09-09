var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TwitterClone.db');


exports.insertUser = insertUser;
exports.insertTweet = insertTweet;
exports.getTweets = getTweets;
exports.getPassword = getPassword;


function insertUser(user) {
    return new Promise(
        (resolve, reject) => {
            db.serialize(function () {
                var stmt = db.prepare("INSERT INTO user  VALUES(?,?,?,?,?)");
                stmt.run(user.userid, user.password, user.firstname, user.lastname, user.email,
                    function (err) {
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

function insertTweet(tweet) {
    return new Promise(
        (resolve, reject) => {
            db.serialize(function () {
                var stmt = db.prepare("INSERT INTO tweets  VALUES(?,?,?,?)");
                stmt.run(null, tweet.userid, tweet.tweetcontent, tweet.tweetts, function (err) {
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

function getPassword(user) {
    return new Promise(
        (resolve, reject) => {
            db.serialize(function () {

                db.all("SELECT password FROM user WHERE userid = ? ", user.userid, function (err, rows) {
                    if (err) {

                        reject(err);
                        return;
                    }
                    if (rows.length > 0) {
                        resolve(rows[0].password);
                    } else {
                        reject('no user with that userid');
                    }
                });

            }
            )
        })

}
function getTweets(user) {
    return new Promise(
        (resolve, reject) => {
            db.serialize(function () {
                db.all("SELECT tweetcontent, tweetts FROM tweets WHERE userid = ? ", user.userid, function (err, rows) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(rows);
                });
            })
        })

}