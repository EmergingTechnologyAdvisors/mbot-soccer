/* global io */
/* global document */
/* global $ */

// thanks @voodootikigod for the key-mappings

'use strict';
var keymap = {
  87: { // w
    ev: 'move',
    action: 'forward'
  },
  83: { // s
    ev: 'move',
    action: 'backward'
  },
  84: { //t
    ev: 'move',
    action: 'turbo'
  },
  82: { //r
    ev: 'move',
    action: 'rickroll'
  },
  65: { // a
    ev: 'move',
    action: 'left'
  },
  68: { // d
    ev: 'move',
    action: 'right'
  },
  70: { //f
    ev: 'move',
    action: 'sonar'
  },
  32: { // space
    ev: 'move',
    action: 'stop'
  },
  38: {  // up
    ev: 'move',
    action: 'forward'
  },
  40: { // down
    ev: 'move',
    action: 'backward'
  },
  37: { // left
    ev: 'move',
    action: 'left'
  },
  39: { // right
    ev: 'move',
    action: 'right'
  },
  67: { // c
    ev: 'move',
    action: 'charge'
  }
};

$(function() {
  var socket = io('http://localhost:8103/');

  $(document).keydown(function(ev) {
    var evData = keymap[ev.keyCode];

    if (evData === null) {
      return;
    }
    ev.preventDefault();

    evData = keymap[ev.keyCode];
    return socket.emit(evData.ev, {
      action: evData.action
    });
  });

  socket.on('proximity', function(message) {
    $('#proximity').text(message);
  });

  socket.on('stateChange', function(data) {
    $('#log').prepend('<div>' + data + '</div>');
  });

});
