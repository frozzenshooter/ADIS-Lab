const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const port = 3000;


app.use('/', express.static('public'));

app.post("/login", jsonParser, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //TODO: Check if Login Info is correct
  const success = true;
  //TODO: Fetch Username from Database
  if(success) {
    const username = "Dummy Name";
    res.status(200).json(username).send();
  }else {
    res.status(403).send();
  }
})

app.post("/signup", jsonParser, (req, res) =>{
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  //TODO: Sign the User up, send error if username already taken
  const error = false;
  res.status(200).json(error).send();
})

app.post("/logout", jsonParser, (req, res) => {
  const username = req.body.username;
  //TODO Sign this User Out
  res.status(200).send();
})

app.post("/postRoar", jsonParser, (req, res) =>  {

})

// Last route to handle 404
app.get('*', function(req, res){
  res.status(404).send('404- Page not found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});