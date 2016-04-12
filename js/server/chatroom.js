'use strict';

module.exports = Chatroom;

var _ = require('underscore');

function Chatroom(io) {
  _.bindAll(this, 'addUser');

  this.io = io;
  this.users = {};
  this.messages = [];

  io.sockets.on('connection', this.addUser);
}

Chatroom.prototype.addUser = function (socket) {
  var self = this;
  this.users[socket.id] = socket;

  socket.emit('message', { message: 'Welcome to the chat!' });
  socket.on('send', function (data) {
    self.io.sockets.emit('message', data);
  });
};
