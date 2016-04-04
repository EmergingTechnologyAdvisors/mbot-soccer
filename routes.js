'use strict';

const routes = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './public',
        redirectToSlash: true,
        listing: false,
        index: true
      }
    }
  }
];

module.exports = routes;
