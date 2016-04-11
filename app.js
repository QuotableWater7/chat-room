'use strict';

var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.listen(8080, function () {
  console.log('the server is runnin');
});
