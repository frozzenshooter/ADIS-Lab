const sqlite3 = require('sqlite3').verbose();

const createTables = (db) => {

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS users ("+
                "username VARCHAR PRIMARY KEY, "+
                "email VARCHAR UNIQUE,"+
                "password VARCHAR)"
            );

        db.run("CREATE TABLE IF NOT EXISTS roaries ("+
                "roary_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"+
                "message VARCHAR(128),"+
                "username VARCHAR,"+
                "timestamp INTEGER,"+
                "FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE ON UPDATE NO ACTION"+
                ")");
                
        db.run("CREATE TABLE IF NOT EXISTS likes ("+
                    "roary_id INTEGER NOT NULL,"+
                    "username VARCHAR NOT NULL,"+
                    "PRIMARY KEY (roary_id, username),"+
                    "FOREIGN KEY (roary_id) REFERENCES roaries (roary_id) ON DELETE CASCADE ON UPDATE NO ACTION,"+
                    "FOREIGN KEY (username) REFERENCES users (username) ON DELETE CASCADE ON UPDATE NO ACTION)");

        console.log("Roary tables created!");
    });
}

const roaryDB = new sqlite3.Database('./roary.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }else{
        console.log('Connected to database.');
        createTables(roaryDB);
    }
});

const getUser = (email, callback) => {
    return roaryDB.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        callback(err, row);
    });
}

const signup = (username, email, password_hash, callback) => {

    const stmt = roaryDB.prepare("INSERT INTO users (username, email, password) VALUES (?,?,?)");
    stmt.run(username, email, password_hash, (er)=>{
        callback(er);
    });
    stmt.finalize();
}

const postRoar = (username, message, callback) => {
    const stmt = roaryDB.prepare("INSERT INTO roaries (message, username, timestamp) VALUES (?,?,?)");
    const timestamp = Date.now();
    stmt.run(message, username, timestamp, (er)=>{
        callback(er);
    });
    stmt.finalize();
}

const getRoars = (username, callback) => {
    if(username){
        roaryDB.all("SELECT roaries.roary_id, roaries.message, roaries.timestamp, roaries.username, COUNT(likes.username) as 'likes', EXISTS (SELECT 1 FROM likes WHERE likes.roary_id = roaries.roary_id AND likes.username = '"+username+"') as 'hasUserLiked' FROM roaries LEFT JOIN likes ON roaries.roary_id = likes.roary_id GROUP BY roaries.roary_id ORDER BY timestamp DESC", [], (err, rows) => {
            callback(err, rows);
        });
    }else{
        roaryDB.all("SELECT roaries.roary_id, roaries.message, roaries.timestamp, roaries.username, COUNT(likes.username) as 'likes' FROM roaries LEFT JOIN likes ON roaries.roary_id = likes.roary_id GROUP BY roaries.roary_id ORDER BY timestamp DESC", [], (err, rows) => {
            callback(err, rows);
        });
    }



}

const likeRoary = (username, roary_id, callback) => {
    roaryDB.get(`SELECT COUNT(*) AS 'count' FROM likes WHERE roary_id = ? AND username = ?`, [roary_id, username], (err, row) => {
        if(err)
            return callback(err, row);

        if(row.count == 0){
            // create a like
            const stmt = roaryDB.prepare("INSERT INTO likes (roary_id, username) VALUES (?,?)");
            stmt.run(roary_id, username, (er)=>{
                callback(er, {});
            });
            stmt.finalize();

        }else{
            // remove like
            roaryDB.run("DELETE FROM likes WHERE roary_id = ? AND username = ?",  [roary_id, username], (erro, row2) => {
                callback(erro, row2)
            });
        }        
    });
}

module.exports = {
    getUser,
    signup,
    postRoar,
    getRoars,
    likeRoary
};