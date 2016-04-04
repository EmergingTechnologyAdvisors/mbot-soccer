'use strict';

const internals = {};
const five = require('johnny-five');
const env = require('./config/environment');

module.exports = internals.Bot = function () {
  this.MAX_SPEED = 200;
  this.MAX_SPEED_TURNS = 85;

  const board = new five.Board({
    port: env.get('blePort')
  });

  board.on('ready', (err) => {
    if (err) {
      console.log('Oops, there was an error:', err);
      return;
    }
    console.info('Board connected. Ready for controls');

    this.motors = {
      left: new five.Motor([6, 7]),
      right: new five.Motor([5, 4])
    };
    this.piezo = new five.Piezo(8);
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
