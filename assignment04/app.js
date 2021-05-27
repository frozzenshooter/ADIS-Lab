const express = require('express');
const app = express();
const port = 3000;


app.use('/', express.static('public'));



// Last route to handle 404
app.get('*', function(req, res){
  res.status(404).send('404- Page not found');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});