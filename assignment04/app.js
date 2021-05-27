const express = require('express');
const app = express();
const session = require('express-session')
const port = 3000;
const uuid = require('uuid').v4



// Server the index html as static file
app.use('/', express.static('public'));

// Parse the json body of the request
app.use(express.json())

// Session handling
app.use(session({
    genid: (req) => {
      return uuid(); // use UUIDs for session IDs
    },
    secret: 'keyboard cat', // For a production environment use a random string via a environment variable 
    resave: true,
    cookie: { secure: false } // TODO: set to true when using https
}))

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
    
    
    //TODO: Sign the User up, send error if username already taken
    const error = false;
    res.status(200).json(error).send();
})

// Logout of a user
app.get("/logout", (req, res) => {

    req.session.destroy();
    res.status(200).send();
})

// Post a roar
app.post("/postRoar", (req, res) =>  {
    const username = req.body.username;
    const message = req.body.message;

    if(req.session?.authenticated){
        //TODO Save Roar
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});