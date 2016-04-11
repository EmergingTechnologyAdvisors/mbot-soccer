'use strict';

const internals = {};
const five = require('johnny-five');
const env = require('../config/environment');
const songs = require('j5-songs');

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
    this.proximity = new five.Proximity({
      controller: 'HCSR04',
      pin: 10
    });

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
          case 'turbo':
            socket.emit('stateChange', 'Turbo BOOST!!');
            console.log('\nTurbo Boost!!');
            this.turbo();
            break;
          case 'charge':
            socket.emit('stateChange', 'Charge!!');
            console.log('\nCharge!!');
            this.charge();
            break;
          case 'rickroll':
            socket.emit('stateChange', 'You got Rick Rolled');
            console.log('\nYou got Rick Rolled');
            this.rickroll();
            break;
          case 'sonar':
            socket.emit('stateChange', 'Sonar activated');
            console.log('\nSonar Activated');
            this.sonar();
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

internals.Bot.prototype.turbo = function() {
  console.log('\nTurbo boost');
  this.motors.left.rev(255);
  this.motors.right.fwd(255);
};

internals.Bot.prototype.charge = function() {
  console.log('\nCharge');
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
};

internals.Bot.prototype.rickroll = function() {
  console.log('\nYou\'ve been Rick Rolled');
  this.motors.left.rev(255);
  this.motors.right.rev(255);
  this.piezo.play(songs.load('never-gonna-give-you-up'));
};

internals.Bot.prototype.sonar = function() {
  console.log('\nSensor activated');
  this.proximity.on('data', function() {
    console.log('inches: ', this.inches);
  });
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
