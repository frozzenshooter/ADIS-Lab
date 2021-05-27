const express = require('express');
const app = express();
const port = 3000;


app.use('/', express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

// Last route to handle 404
app.get('*', function(req, res){
  res.status(404).send('$04- Page not found');
});