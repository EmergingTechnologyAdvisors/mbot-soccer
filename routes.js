'use strict';

const routes = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: './public',
<<<<<<< HEAD
        redirectToSlash: true,
=======
>>>>>>> origin
        listing: false,
        index: true
      }
    }
  }
];

module.exports = routes;
