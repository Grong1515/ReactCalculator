var express = require('express');
var mongoose = require('mongoose');

var app = express();
var port = 8088;

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('views/index.html', { root: __dirname });
});


app.listen(port);
console.log('Server is running on localhost:' + port);
