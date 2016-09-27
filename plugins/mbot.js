'use strict';

const internals = {};
const five = require('johnny-five');
const env = require('../config/environment');
const songs = require('j5-songs');

module.exports = internals.Bot = function (io) {
  this.MAX_SPEED = 200;
  this.MAX_SPEED_TURNS = 125;
  this.io = io;

  const board = new five.Board({
    port: env.get('blePort')
  });

  board.on('ready', (err) => {
    if (err) {
      console.log('Oops, there was an error connecting to the board:\n\n', err);
      return;
    }

    this.motors = {
      left: new five.Motor([6, 7]),
      right: new five.Motor([5, 4])
    };

    this.piezo = new five.Piezo(8);

    // this.proximity = new five.Proximity({
    //   controller: 'HCSR04',
    //   pin: 10
    // });

    console.info('\nmBot connected to Johnny-Five');

    io.on('connection', (socket) => {
      console.info('\nWeb Socket connected');
      socket.emit('stateChange', 'Bot connected. Ready for controls.');

      // This is not giving accurate readings
      // this.proximity.on('data', function (data) {
      //   if (data.in) {
      //     console.log('proximity', data);
      //     socket.emit('proximity', data.in + 'in');
      //   }
      // });

      socket.on('move', (data) => {
        console.log('\nAction received:', data.action);

        switch (data.action) {
          case 'stop':
            this.stop();
            socket.emit('stateChange', 'Stopping');
            break;
          case 'forward':
            this.forward();
            socket.emit('stateChange', 'Going forward');
            break;
          case 'left':
            this.left();
            socket.emit('stateChange', 'Going left');
            break;
          case 'right':
            socket.emit('stateChange', 'Going right');
            this.right();
            break;
          case 'backward':
            socket.emit('stateChange', 'Going backward');
            this.backward();
            break;
          case 'turbo':
            this.turbo();
            socket.emit('stateChange', 'Turbo BOOST!!');
            break;
          case 'charge':
            this.charge();
            socket.emit('stateChange', 'Charge!!');
            break;
          case 'rickroll':
            this.rickroll();
            socket.emit('stateChange', 'You got Rick Rolled!');
            break;
          default:
          break;
        }
      });
    });
  });

  board.on('error', (err) => {
    console.info('⛔️ Board Error! ', err);
  });
};

internals.Bot.prototype.forward = function () {
  this.motors.left.rev(this.MAX_SPEED);
  this.motors.right.fwd(this.MAX_SPEED);
  console.log('\nGoing forward');
  };

internals.Bot.prototype.backward = function () {
  this.motors.left.fwd(this.MAX_SPEED);
  this.motors.right.rev(this.MAX_SPEED);
  console.log('\nGoing backward');
};

internals.Bot.prototype.turbo = function() {
  this.motors.left.rev(255);
  this.motors.right.fwd(255);
  console.log('\nTurbo boost');
};

internals.Bot.prototype.charge = function() {
  this.piezo.play({
    song: [
      ['C4', 0.5],
      ['G4', 1.5],
      ['C4', 0.5],
      ['G4', 0.5],
      ['C4', 0.5],
      ['G4', 0.5],
      ['C4', 0.5],
      ['G3', 2],
      [null, 1]
    ],
    tempo: 120
  });
  console.log('\nCharge');
};

internals.Bot.prototype.rickroll = function() {
  this.motors.left.rev(255);
  this.motors.right.rev(255);
  this.piezo.play(songs.load('never-gonna-give-you-up'));
  console.log('\nYou\'ve been Rick Rolled');
};

internals.Bot.prototype.left = function () {
  console.log('\nGoing left');
  this.motors.left.fwd(this.MAX_SPEED_TURNS);
  this.motors.right.fwd(this.MAX_SPEED_TURNS);
};

internals.Bot.prototype.right = function () {
  console.log('\nGoing right');
  this.motors.left.rev(this.MAX_SPEED_TURNS);
  this.motors.right.rev(this.MAX_SPEED_TURNS);
};

internals.Bot.prototype.stop = function () {
  console.log('\nStopping');
  this.motors.left.stop();
  this.motors.right.stop();
};
