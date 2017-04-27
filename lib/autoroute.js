'use strict';

const Glob = require('glob');

const Options = require('./options');
const Prefix = require('./prefix');

class AutoRoute {

    constructor(server, options) {

        this.pluginOptions = Options.plugin(options);
        this.server = server;
    }

    loadRoutes() {

        const filePattern = this.pluginOptions.dir + this.pluginOptions.pattern;
        const files = Glob.sync(filePattern);
        files.forEach((file) => {

            const routes = require(file);
            if (Array.isArray(routes)) {
                routes.forEach((route) => {

                    if (this.pluginOptions.prefix) {
                        route.path = Prefix.add(this.pluginOptions.dir, file, route.path);
                    }
                    this.server.route(route);
                });
            }
            else {
                if (this.pluginOptions.prefix) {
                    routes.path = Prefix.add(this.pluginOptions.dir, file, routes.path);
                }
                this.server.route(routes);
            }
        });
    }
};

module.exports = AutoRoute;
