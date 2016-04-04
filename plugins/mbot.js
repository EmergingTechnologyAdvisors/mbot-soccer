'use strict';

const internals = {};
const five = require('johnny-five');
const env = require('../config/environment');

module.exports = internals.Bot = function (io) {
  this.MAX_SPEED = 200;
  this.MAX_SPEED_TURNS = 85;
  this.io = io;

  const board = new five.Board({
    port: env.get('blePort')
  });

  board.on('ready', (err) => {
    if (err) {
      console.log('Oops, there was an error:', err);
      return;
    }

    this.motors = {
      left: new five.Motor([6, 7]),
      right: new five.Motor([5, 4])
    };
    this.piezo = new five.Piezo(8);

    console.info('\nBot connected');

    io.on('connection', (socket) => {
      console.info('\nSocket connected');
      socket.emit('stateChange', 'Bot connected. Ready for controls');

      socket.on('move', (data) => {
        console.log('\nAction received:', data.action);

        switch (data.action) {
          case 'stop':
            socket.emit('stateChange', 'Stopping');
            console.log('\nStopping');
            this.stop();
            break;
          case 'forward':
            socket.emit('stateChange', 'Going forward');
            console.log('\nGoing forward');
            this.forward();
            break;
          case 'left':
            socket.emit('stateChange', 'Going left');
            console.log('\nGoing left');
            this.left();
            break;
          case 'right':
            socket.emit('stateChange', 'Going right');
            console.log('\nGoing right');
            this.right();
            break;
          case 'backward':
            socket.emit('stateChange', 'Going backward');
            console.log('\nGoing backward');
            this.backward();
            break;
          default:
            break;
        }
      });
    });
  });
};

internals.Bot.prototype.forward = function () {
  console.log('\nGoing forward');
  this.motors.left.rev(this.MAX_SPEED);
  this.motors.right.fwd(this.MAX_SPEED);
};

internals.Bot.prototype.backward = function () {
  console.log('\nGoing backward');
  this.motors.left.fwd(this.MAX_SPEED);
  this.motors.right.rev(this.MAX_SPEED);
};

internals.Bot.prototype.left = function () {
  console.log('\nGoing left');
  this.motors.left.fwd(this.MAX_SPEED);
  this.motors.right.fwd(this.MAX_SPEED);
};

internals.Bot.prototype.right = function () {
  console.log('\nGoing right');
  this.motors.left.rev(this.MAX_SPEED);
  this.motors.right.rev(this.MAX_SPEED);
};

internals.Bot.prototype.stop = function () {
  console.log('\nStopping');
  this.motors.left.stop();
  this.motors.right.stop();
};