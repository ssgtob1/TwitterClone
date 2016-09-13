var sqlite = require('sqlite3');
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
var db = new TransactionDatabase(
   new sqlite.Database("test.sqlite", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
);



var tableSql = `
CREATE TABLE IF NOT EXISTS user (
    Id TEXT NOT NULL PRIMARY KEY,
    Name TEXT,
    Profile TEXT,
    Password TEXT
);
CREATE TABLE IF NOT EXISTS tweet (
    Id INTEGER NOT NULL PRIMARY KEY,
    Content TEXT,
    Author TEXT,
    Reply INTEGER,
    Date INTEGER DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(Author) REFERENCES user(Id),
    FOREIGN KEY(Reply) REFERENCES tweet(Id)
);
CREATE TABLE IF NOT EXISTS likeRel (
    User TEXT,
    Tweet INTEGER,
    PRIMARY KEY (User, Tweet),
    FOREIGN KEY(User) REFERENCES user(Id),
    FOREIGN KEY(Tweet) REFERENCES tweet(Id)
);
CREATE TABLE IF NOT EXISTS followerRel (
    Follower TEXT,
    Following TEXT,
    PRIMARY KEY (Follower, Following),
    FOREIGN KEY(Follower) REFERENCES user(Id),
    FOREIGN KEY(Following) REFERENCES user(Id)
);
`

db.exec(tableSql, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('all good');
}); 

exports.getPassword = getPassword;
function getPassword(userid){
    return new Promise(function (resolve, reject){
        var query = 'SELECT Password FROM user WHERE Id = ?';
        db.all(query, userid, function(err, rows){
            if (err){
                reject(err);
                return;
            }
            console.log(rows);
            resolve(rows[0].Password);
        });
    });
}


// chronological
function allUserTweets(userId) {
    return new Promise(function (resolve, reject) {
        var query = `SELECT Id, Content, Reply, Date FROM tweet WHERE Author = ?`;
        db.all(query, userId, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });  
}

exports.getUser = getUser;
function getUser(userId) {
    return new Promise(function (resolve, reject) {
        var query = `SELECT Name, Profile FROM user WHERE Id = ?`;
        db.all(query, userId, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows[0]);
        });
    });  
}

function allUserFollowing(userId) {
    return new Promise(function (resolve, reject) {
        var query = `SELECT Following FROM followerRel WHERE Follower = ?`;
        db.all(query, userId, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });  
}

exports.createUser = createUser;
function createUser(name, profile) {
    return new Promise(function (resolve, reject) {
        var stmt = db.prepare(`INSERT INTO user (Id, Name, Profile) VALUES (NULL, ?, ?)`);        
        stmt.run(name, profile, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
        stmt.finalize(); // TODO?
    });
}


function createTweet(userId, text) {
    return new Promise(function (resolve, reject) {
        var stmt = db.prepare(`INSERT INTO tweet (Content, Author, Reply) VALUES (?, ?, ?)`);        
        stmt.run(text, userId, null, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
        stmt.finalize(); // TODO?
    });
}

function likeTweet(tweetId, likerUserId) {
    return new Promise(function (resolve, reject) {
        var stmt = db.prepare(`INSERT INTO likeRel (Tweet, User) VALUES (?, ?)`);
        stmt.run(tweetId, likerUserId, function (err) {
            if (err) {
                // TODO look for err indicating existing like
                reject(err);
                return;
            }
            resolve();
        });
        stmt.finalize(); // TODO?
    });
}

// function unlikeTweet() {

// }

function removeTweet(tweetId) {
    return new Promise(function (resolve, reject) {
        var stmt = db.prepare(`DELETE FROM tweet WHERE Id = ?`);        
        stmt.run(tweetId, function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
        stmt.finalize(); // TODO?
    });
}

exports.allFollowingTweets = allFollowingTweets;
function allFollowingTweets(userId) {
    // get Following of userId

    return allUserFollowing(userId).then(
        (rows) => {
            var arr = [];
            for (var row of rows) {
                arr.push(allUserTweets(row.Following));
            }
            return Promise.all(arr);
        }
    ).then(
        (tweetsByUser) => {
            var tweets = Array.prototype.concat.apply([], tweetsByUser);
            tweets.sort(function (a, b) {
                if (a.Date < b.Date) {
                    return -1;
                }
                if (a.Date > b.Date) {
                    return 1;
                }
                return 0;
            });
            return tweets;
        }
    );
}
