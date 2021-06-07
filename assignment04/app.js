const express = require('express');
const app = express();
const port = 3000;

// HTTPS
const fs = require('fs');
const key = fs.readFileSync('./cert/localkey.pem');
const cert = fs.readFileSync('./cert/localcert.pem');
const https = require('https');

// Session 
const session = require('express-session')
const uuid = require('uuid').v4;

//Database
const {getUser, signup, postRoar, getRoars, likeRoary} = require('./database');

//Passwords
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

//HTTPS init
const server = https.createServer({key: key, cert: cert }, app);


// Server the index html as static file
app.use('/', express.static('public'));

// Parse the json body of the request
app.use(express.json());

// Session handling
app.use(session({
    genid: (req) => {
      return uuid(); // use UUIDs for session IDs
    },
    secret: 'keyboard cat', // For a production environment use a random string via a environment variable 
    resave: true,
    saveUninitialized: true, // hold all sessions
    cookie: { secure: false }
}));

//Login of a user
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
   
    req.session.authenticated = false;
    req.session.username = "";
    
    getUser(email, (err, user) => {
        if(err) return res.status(500).send("Server error!");
        if(!user) return res.status(401).send("Unauthorized!");

        const match = bcrypt.compareSync(password, user.password);
        if(!match) return res.status(401).send("Unauthorized!");
        req.session.authenticated = true;
        req.session.username = user.username;
        res.status(200).json(user.username);
    });
});

// Signup of a user
app.post("/signup", (req, res) =>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password);

    signup(username, email, hash, (err) => {
        if(err) {
            return res.status(200).json(true);
        }
        res.status(200).json(false);
    });
});

// Logout of a user
app.get("/logout", (req, res) => {

    req.session.destroy();
    res.status(200).send();
});

// Post a roar
app.post("/postRoar", (req, res) =>  {
    const message = req.body.message;
    if(req.session?.authenticated){
        postRoar(req.session.username, message, (er) => {
            if(er) return res.status(500).send();

            res.status(200).send();
        });
    }else{
        res.status(401).send();
    }
});

// Get all roars
app.get("/roars", (req, res) => {

    let name = null;
    if(req.session?.authenticated)
    {
        name = req.session?.username;
    }

    getRoars(name, (err, rows) => {
        if(err) return res.status(500).send();

        res.status(200).json(rows);
    });
});

app.post("/like", (req, res) => {
    const roary_id = req.body.roary_id;
    if(req.session?.authenticated){

        likeRoary(req.session.username, roary_id, (er) => {
            if(er) return res.status(500).send();

            res.status(200).send();
        });

    }else{
        res.status(401).send();
    }
});

// Last route to handle 404
app.get('*', function(req, res){
    res.status(404).send('Error 404 - Page not found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});