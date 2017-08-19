'use strict';

const gamepad = require('gamepad');
const five = require('johnny-five');
const env = require('../config/environment');
const MAX_SPEED = 200;

const board = new five.Board({
  port: env.get('blePort')
});

board.on('ready', (err) => {
  if (err) {
    console.log('Oops, there was an error:', err);
    return;
  }
  console.info('Board connected. Welcome to mBot Controls!');
  console.log('Control the bot with the supplied controller: \n Turning: Left-D-Pad: Turn left \n Right-D-Pad: Turn right');
  console.log('Hold these buttons to \n X: Turbo!! \n A: Forward \n B: Reverse \n Y: RickRoll Spin \n L1: Quit \n Let go of button to stop Mbot');

  const motors = {
    left: new five.Motor([6, 7]),
    right: new five.Motor([5, 4])
  };

// Initialize the library
gamepad.init();

// List the state of all currently attached devices
for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
console.log('Ready to go');
}

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

// Listen for move events on all gamepads
gamepad.on('move', function (id, axis, value) {
  console.log('id, axis, value', id, axis, value)
  if (axis == 2 && value == -1) {
    console.log('moving left');
    motors.left.fwd(MAX_SPEED);
    motors.right.fwd(MAX_SPEED);
  }
  else if (axis == 2 && value == 0) {
    console.log('turning stopping');
    motors.left.stop();
    motors.right.stop();
  }
  else if (axis == 2 && value == 1) { //moving right
    console.log('moving right');
    motors.left.rev(MAX_SPEED);
    motors.right.rev(MAX_SPEED);
  }
});

gamepad.on('up', function (id, num) { //when turbo or forward is up stop
  if (num == 1 || num == 0 || num == 2 || num == 3) {
    console.log('Stopping');
    motors.left.stop();
    motors.right.stop();
  }
});

gamepad.on('down', function (id, num) {

  if (num == 1) { // A button
    console.log('Forward');
    motors.left.rev(MAX_SPEED);
    motors.right.fwd(MAX_SPEED);
  }
  if (num == 0) { // X button
    console.log('Turbo!!!');
    motors.left.rev(255);
    motors.right.fwd(255);
  }
  if (num == 2) { // B button
    console.log('Going backward');
    motors.left.fwd(MAX_SPEED);
    motors.right.rev(MAX_SPEED);
  }
  if (num == 3) { // Y button
    console.log('Rick Rolled!!');
    motors.left.fwd(MAX_SPEED);
    motors.right.fwd(MAX_SPEED);
  }
  if (num == 4) { //left trigger L1
    console.log('Quitting');
    motors.left.stop();
    motors.right.stop();
    process.exit();
  }
});

process.stdin.resume();
});
