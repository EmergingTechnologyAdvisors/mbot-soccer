'use strict';

const convict = require('convict');

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to run the web application on.',
    format: 'port',
    default: 8103,
    env: 'PORT'
  },
  blePort: {
    doc: 'The BLE Serial Port',
    format: String,
    default: '/dev/tty.Makeblock-ELETSPP',
    env: 'BLE_PORT'
  }
});

// Perform validation
config.validate();

// export the config object
module.exports = config;
