const express = require('express');
const bodyParser = require("body-parser");
const config = require('./config.json');
const db = require('./db.json');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = config.port;

app.post('/:route', (request, response) => {
  console.log(`New Post Request To => ${request.params.route}`);
  console.log(`Headers ====> \n${JSON.stringify(request.headers).split(",").join("\n")}`)
  console.log(`Body ====> \n${JSON.stringify(request.body)}`)
  response.send(db[request.params.route]);
});
app.get('/:route', (request, response) => {
  console.log(`New Get Request To => ${request.params.route}`);
  console.log(`Headers ====> \n${JSON.stringify(request.headers).split(",").join("\n")}`)
  console.log(`Body ====> \n${JSON.stringify(request.body)}`)
  response.send(db[request.params.route]);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
})