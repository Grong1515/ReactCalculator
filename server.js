var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser')

var app = express();
var port = 8088;

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('views/index.html', { root: __dirname });
});
app.get('/calculations', function (req, res, next) {
  if (Math.random() >= 0.5) return res.send(JSON.stringify([
    {"calculation":"20+7*12-526/23","date":"12:23:35 01-01-2015Z"},
    {"calculation":"20+7*1232-56/23","date":"12:25:35 01-01-2015Z"},
    {"calculation":"20+734*12-56/23","date":"12:21:35 01-01-2015Z"},
  ]));
  return res.sendStatus(500);
});
app.post('/calculations', function (req, res, next) {
  console.log('calculations POST: ' + JSON.stringify(req.body));
  return res.sendStatus((Math.random() >= 0.5) ? 200: 500);
});


app.listen(port);
console.log('Server is running on localhost:' + port);
