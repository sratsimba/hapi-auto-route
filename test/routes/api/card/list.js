'use strict';

module.exports = {
    method: 'GET',
    path: '/',
    handler: (request, response) => reply('/api/card/list')
};
