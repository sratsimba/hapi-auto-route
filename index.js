'use strict';

const { promisify } = require('util');
const Route = require('./lib/route.js');

exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {

        let route = [];
        const getAllRoute = promisify(Route.getAll);
        const files = await getAllRoute(options);
        files.forEach((file) => {

            route = Route.load(options, file);
            server.route(route);
        });
    }
};
