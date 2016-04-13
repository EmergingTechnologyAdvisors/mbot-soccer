const keypress = require('keypress');
const five = require('johnny-five');
const songs = require('j5-songs');
const env = require('../config/environment');
const MAX_SPEED = 200;
// For smooth terrain
//const MAX_SPEED_TURNS = 85;

const board = new five.Board({
  port: env.get('blePort')
});

board.on('ready', (err) => {
  if (err) {
    console.log('Oops, there was an error:', err);
    return;
  }
  console.info('Board connected. Welcome to mBot Controls!');
  console.log('Control the bot with the right arrow keys, and SPACE to stop.');

  const motors = {
    left: new five.Motor([6, 7]),
    right: new five.Motor([5, 4])
  };
  const piezo = new five.Piezo(8);

  function controls(ch, key) {
    if ( !key ) { return; }

    if ( key.name === 'q' ) {
      console.log('\nQuitting mBot Controls');
      motors.left.stop();
      motors.right.stop();
      process.exit();
    }

    if ( key.name === 'space' ) {
      console.log('\nStopping');
      motors.left.stop();
      motors.right.stop();
    }

    if ( key.name === 'up' || key.name === 'w') {
      console.log('\nGoing forward');
      motors.left.rev(MAX_SPEED);
      motors.right.fwd(MAX_SPEED);
    }

    if ( key.name === 'left' || key.name === 'a') {
      console.log('\nGoing left');
      motors.left.fwd(MAX_SPEED);
      motors.right.fwd(MAX_SPEED);
    }

    if ( key.name === 'down' || key.name === 's') {
      console.log('\nGoing backward');
      motors.left.fwd(MAX_SPEED);
      motors.right.rev(MAX_SPEED);
    }

    if ( key.name === 'right' || key.name === 'd') {
      console.log('\nGoing right');
      motors.left.rev(MAX_SPEED);
      motors.right.rev(MAX_SPEED);
    }

    if ( key.name === 't' ) {
      console.log('\nTurbo Boost!!');
      motors.left.rev(255);
      motors.right.fwd(255);
    }

    if ( key.name === 'r' ) {
      console.log('\nRick Rolled!!');
      piezo.play(songs.load('never-gonna-give-you-up'));

      motors.left.fwd(MAX_SPEED);
      motors.right.fwd(MAX_SPEED);
    }

    if ( key.name === 'c' ) {
      console.log('\nCharge!!');
      piezo.play({
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
    }
  }

  keypress(process.stdin);
  process.stdin.on('keypress', controls);
  process.stdin.setRawMode(true);
  process.stdin.resume();
});
