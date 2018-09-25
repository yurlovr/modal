var http = require('http');
var static = require('node-static');
var file = new static.Server('.');
http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(3000);

console.log('Server running on port 3000');