'use strict';

const Hapi = require('hapi');
const env = require('./config/environment');
const pkg = require('./package.json');
const routes = require('./routes');

const server = new Hapi.Server();
server.connection({ port: env.get('port') });
server.route(routes);

server.register([
  require('blipp'),
  require('./plugins/controls')
], (err) => {
  if (err) {
    console.log('Error loading plugins', err);
    throw err;
  }

  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('=> Booting server');
    console.log('=> %s v%s starting on %s', pkg.name, pkg.version, server.info.uri);
    console.log('=> Ctrl-C to shutdown server');
    console.log('=> Server running on %s', server.info.uri);
  });
});
