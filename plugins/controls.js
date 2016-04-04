'use strict';

const mBot = require('./mbot');

exports.register = function (server, options, next) {
  const io = require('socket.io')(server.listener);

  io.on('connection', (socket) => {
    const Bot = new mBot();
    socket.on('move', (data) => {
      switch (data.action) {
        case 'stop':
          console.log('\nStopping');
          Bot.stop();
          socket.emit('stateChange', 'Stop');
          break;
        case 'forward':
          console.log('\nGoing forward');
          Bot.forward();
          socket.emit('stateChange', 'Forward');
          break;
        case 'left':
          console.log('\nGoing left');
          Bot.left();
          socket.emit('stateChange', 'Left');
          break;
        case 'right':
          console.log('\nGoing right');
          Bot.right();
          socket.emit('stateChange', 'Right');
          break;
        case 'backward':
          console.log('\nGoing backward');
          Bot.backward();
          socket.emit('stateChange', 'Backward');
          break;
        default:
          break;
      }
    });
  });

  next();
};

exports.register.attributes = {
    name: 'soccer-controls'
};
