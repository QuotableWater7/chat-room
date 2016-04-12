'use strict';

var express = require('express');
var app = express();
var pug = require('pug');
var io = require('socket.io');
var cookieParser = require('cookie-parser');
var Chatroom = require('./js/server/chatroom');


var port = 8080;

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.engine('pug', pug.__express);

app.get('/', function (request, response) {
  response.render('index');
});

var server = app.listen(port);
io = io.listen(server);
io.set('authorization', function (data, accept) {
  if (!data.headers.cookie) {
    return accept('No cookie transmitted', false);
  }

  data.cookie = cookieParser(data.headers.cookie);
  data.sessionID = data.cookie['express.sid'];
  accept(null, true);
});
var chatroom = new Chatroom(io);
