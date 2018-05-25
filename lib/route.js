'use strict';

const Glob = require('glob');
const Path = require('path');

exports.getAll = (options, callback) => {

    const baseDir = Path.join(options.routes_dir);
    const glob = Path.join(baseDir, options.pattern);
    Glob(glob, callback);
};

exports.getPathPrefix = (options, routeFilePath) => {

    const pathPrefix = Path.dirname(Path.relative(options.routes_dir, routeFilePath));
    if (options.use_prefix) {
        if (pathPrefix === '.') {
            return '';
        }
        return pathPrefix;
    }
    return '';
};

exports.load = (options, routeFilePath) => {

    const routes = [];
    const absolutePath = Path.resolve(process.cwd(), routeFilePath);
    const routeContent = require(absolutePath);
    if (Array.isArray(routeContent)) {
        return routeContent;
    }
    routes.push(routeContent);
    return routes;
};

exports.register = (server, routes) => {

    routes.forEach((route) => {

        server.route(route);
    });
};
