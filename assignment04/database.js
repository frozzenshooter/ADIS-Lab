
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
                    "roary_id INTEGER,"+
                    "username VARCHAR,"+
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

    var stmt = roaryDB.prepare("INSERT INTO users (username, email, password) VALUES (?,?,?)");
    stmt.run(username, email, password_hash, (er)=>{
        callback(er);
    });
    stmt.finalize();
}

const postRoar = (username, message, callback) => {
    var stmt = roaryDB.prepare("INSERT INTO roaries (message, username, timestamp) VALUES (?,?,?)");
    const timestamp = Date.now();
    stmt.run(message, username, timestamp, (er)=>{
        callback(er);
    });
    stmt.finalize();
}

const getRoars = (callback) => {
    roaryDB.all("SELECT * from roaries ORDER BY timestamp DESC", [], (err, rows) => {
        callback(err, rows);
    });
}

module.exports = {
    getUser,
    signup,
    postRoar,
    getRoars,
};
/*



class RoaryDB {


    constructor(){
    
    }

    // hash password
    async bcryptpw(password) {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }



    async signup(username, email, password){
        var stmt = this.db.prepare("INSERT INTO users (username, email, password) VALUES (?,?,?)", (er) => {
            console.log(er);
        });

        const pwHash = await this.bcryptpw(password);

        console.log(username, email, pwHash);
        stmt.run(username, email, pwHash);
        stmt.finalize((er)=> {
            console.log(er);
        });
        
    }

    async login(email, password){

        this.db.get("SELECT * FROM users WHERE email = ?", [email], () => {
            if(user != null){
                console.log(user);
                const match = await this.bycryptCompare(password, user.password);
                if(match){
                    return user.username;
                }
            }
            return null;
        });
    }

    postRoary(username, message){

    }

    
    like(username, raory_id){

    }
    
    getAllRoaries(){

    }
    


    async bycryptCompare(password, hash){
        try{
            const match = await bcrypt.compare(password, hash);
            return match;
        }catch(er){
            console.log(er);
            return false;
        }

    }


    close(){

        this.db.close();
    }
}

*/