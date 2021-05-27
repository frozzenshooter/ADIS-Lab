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
const uuid = require('uuid').v4


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
    cookie: { secure: true }
}));

//Login of a user
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    req.session.authenticated = false;

    //TODO: Check if Login Info is correct
    const success = true;
    //TODO: Fetch Username from Database
    if(success) {
      const username = "Dummy Name";
      req.session.authenticated = true;
      req.session.username = username;

      console.log(req.session);
   

      res.status(200).json(username).send();
    }else {
      res.status(403).send();
    }
})

// Signup of a user
app.post("/signup", (req, res) =>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    
    console.log(req.session);
    
    //TODO: Sign the User up, send error if username already taken
    const error = false;
    res.status(200).json(error).send();
})

// Logout of a user
app.get("/logout", (req, res) => {

    console.log(req.session);

    req.session.destroy();
    res.status(200).send();
})

// Post a roar
app.post("/postRoar", (req, res) =>  {
    const username = req.body.username;
    const message = req.body.message;

    console.log(req.session);

    if(req.session?.authenticated){
        //TODO Save Roar
        console.log("auth");
        res.status(200).send();
    }else{
        res.status(401).send();
    }


})

// Get all roars
app.get("/roars", (req, res) => {
    //TODO Fetch Roars from DB and send
    res.status(200).send();
})

// Last route to handle 404
app.get('*', function(req, res){
    res.status(404).send('Error 404 - Page not found');
});

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});