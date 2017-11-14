const http = require('http');
const fs = require('fs');
const mask = require('./server/router.js');
require('./server/controllers/');

let port=8080;
let server = http.createServer((req, res) => mask.routeHandler(req, res));
server.listen(port);

console.log("server started on http://localhost:"+port);
