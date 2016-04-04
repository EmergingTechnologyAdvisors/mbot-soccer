'use strict';

const mBot = require('./mbot');

exports.register = function (server, options, next) {
  const io = require('socket.io')(server.listener);
  new mBot(io);

  next();
};

exports.register.attributes = {
    name: 'soccer-controls'
};
