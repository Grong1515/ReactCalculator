var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var port = 8088;

mongoose.connect('mongodb://localhost/calculator');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo connected successfully.');
});

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static('public'));

var db = require('./models');

app.get('/', function(req, res) {
  res.sendFile('views/index.html', { root: __dirname });
});
app.get('/calculations', function (req, res, next) {
  db.Calculation.find({}, function (err, data) {
    if (err) return res.sendStatus(500);
    res.send(data);
  });
});
app.post('/calculations', function (req, res, next) {
  console.log('calculations POST: ' + JSON.stringify(req.body));
  db.Calculation.create(req.body, function (err) {
    if (err) return res.sendStatus(500);
    res.sendStatus(200);
  })
});


app.listen(port);
console.log('Server is running on localhost:' + port);
