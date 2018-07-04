const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const config = require('./config.json');
let db = require('./db.json');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = config.port;

fs.watchFile('./db.json', (curr, prev) => {
  console.log('DB File Changed --> Reloading ---->');
  const rawdata = fs.readFileSync('./db.json');  
  db = JSON.parse(rawdata); 
  console.log('Reloaded --->');
});

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  res.header('Access-Control-Allow-Headers','access-control-allow-origin, authorization, content-type, x-auth-token, x-request-id, x-userid');
  res.header('Access-Control-Max-Age', '1800');
  res.header('Allow', 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Vary', 'Origin');
  next();
});
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
