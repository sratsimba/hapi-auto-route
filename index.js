'use strict';

const { promisify } = require('util');
const Route = require('./lib/route.js');
const Option = require('./lib/option');

exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {

        let routes = [];
        const valideOptions = Option.validate(options);
        const getAllRoute = promisify(Route.getAll);
        const files = await getAllRoute(valideOptions);
        files.forEach((file) => {

            routes = Route.load(valideOptions, file);
            if (valideOptions.use_prefix) {
                routes.forEach((route) => {

                    route.path = Route.getPathPrefix(valideOptions, file) + route.path;
                });
            }
            server.route(routes);
        });
    }
};
