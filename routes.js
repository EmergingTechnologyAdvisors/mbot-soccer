'use strict';

const routes = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './public',
        listing: false,
        index: true
      }
    }
  }
];

module.exports = routes;
