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
            const route = require(file);
            if (this.pluginOptions.prefix) {
                route.path = Prefix.add(this.pluginOptions.dir, file, route.path);
            }
            this.server.route(require(file));
        });
    }
};

module.exports = AutoRoute;
