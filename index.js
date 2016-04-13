'use strict';

const Hapi = require('hapi');
const env = require('./config/environment');
const pkg = require('./package.json');
const routes = require('./routes');
const _ = require('lodash');

const server = new Hapi.Server();
server.connection({ port: env.get('port') });

server.register([
  require('inert'),
  require('./plugins/controls')
], (err) => {
  if (err) {
    console.log('Error loading plugins', err);
    throw err;
  }

  server.route(routes);
  server.start((err) => {
    if (err) {
      console.log(err);
      throw err;
    }

    console.log('=> Registered plugins:', { plugins: _.keysIn(server.registrations).join(', ') });
    console.log('=> Booting server');
    console.log('=> %s v%s running on %s', pkg.name, pkg.version, server.info.uri);
    console.log('=> Ctrl-C to shutdown server');
  });
});
