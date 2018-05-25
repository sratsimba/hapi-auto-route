'use strict';

const { promisify } = require('util');
const Route = require('./lib/route.js');
const Option = require('./lib/option');

exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {

        let route = [];
        const valideOptions = Option.validate(options);
        const getAllRoute = promisify(Route.getAll);
        const files = await getAllRoute(valideOptions);
        files.forEach((file) => {

            route = Route.load(valideOptions, file);
            server.route(route);
        });
    }
};
