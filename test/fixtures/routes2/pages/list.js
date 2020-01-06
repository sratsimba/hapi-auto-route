'use strict';

module.exports = [{
    'method': 'GET',
    'path': '/page1',
    handler: (request, h) => 'index.js'
}, {
    'method': 'GET',
    'path': '/page2',
    handler: (request, h) => 'index.js'
}];
