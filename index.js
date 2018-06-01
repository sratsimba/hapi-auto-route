'use strict';

const Path = require('path');

const AutoRoute = require('./lib/auto-route');

exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {

        const opts = AutoRoute.validateOptions(options);

        let prefixes = [];

        const files = await AutoRoute.getFiles(opts.routes_dir, opts.pattern);
        let routes = AutoRoute.getRoutes(files);

        if (opts.use_prefix) {
            prefixes = AutoRoute.getPrefixes(files, Path.join(process.cwd(), opts.routes_dir));
            routes = AutoRoute.updatePaths(prefixes, routes);
        }

        routes.forEach((route) => {

            server.route(route);
        });
    }
};
