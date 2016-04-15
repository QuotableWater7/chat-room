'use strict';

var io = require('socket.io-client');

$(() => {
  var $container = $('#container');
  var socket = io.connect('http://localhost:8080');
  var $room = $container.find('#room');
  var $message = $container.find('#message');

  socket.on('message', (data) => {
    var text = $room.val() || '';
    $room.val(text + data.message + '\n')
    $room.prop('scrollTop', $room.prop('scrollHeight'));
  });

  $message.on('keyup', (event) => {
    if (event.keyCode === 13) { submitMessage(); }
  });

  function submitMessage() {
    socket.emit('send', { message: $message.val() });
    $message.val('');
  }
});