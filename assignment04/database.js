const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('roary.db', (err) => {
    if (err) {
        console.lerror(err.message);
    }
    console.log('Connected to database.');
});

db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username VARCHAR UNIQUE, password VARCHAR)");
db.run("CREATE TABLE IF NOT EXISTS roaries (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, author VARCHAR UNIQUE)");

db.serialize(function signup(username, password) {
    var stmt = db.prepare("INSERT INTO users (username, password) VALUES (?,?)");
    stmt.run(username);
    stmt.run(bcryptpw(password));
    stmt.finalize();
})

db.serialize(function login(username, password) {
    var stmt = db.prepare("SELECT password FROM users WHERE username = (?)");
    stmt.run(username);
    stmt.finalize();
    // todo: check password etc
})

db.serialize(function postroar() {
    // todo
})

db.serialize(function like() {
    // todo
})

db.close();

// hash password
function bcryptpw(string) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("B4c0/\/", salt, function(err, hash) {
            return hash;
        });
    });
}