'use strict';

const Hoek = require('hoek');
const Glob = require('glob');
const Path = require('path');
const Prefix = require('./prefix');
const Configuration = require('./configuration');
const { promisify } = require('util');

module.exports = class {
    constructor(server, options) {

        this.config = new Configuration(server.settings.router, options);
        this.routes = {
            files: [],
            objects: [],
            // this will be set as an array of prefix if the plugin option use_prefix is true.
            prefixes: []
        };
        this.server = server;
    }

    async run() {

        await this.loadFiles();
        this.loadRouteObjects();
        this.loadPrefixes();
    }

    async loadFiles() {

        const glob = promisify(Glob);
        const pattern = Path.join(process.cwd(), this.config.plugin.routes_dir, this.config.plugin.pattern);

        const files = await glob(pattern);
        this.routes.files = files;
        return Hoek.clone(this.routes.files);
    }

    loadRouteObjects() {

        this.routes.objects = this.routes.files.map(require);
    }

    loadPrefixes() {

        const absoluteRoutesPath = Path.join(process.cwd(), this.config.plugin.routes_dir);
        this.routes.prefixes = this.routes.files.map((file) => {

            return this.config.plugin.use_prefix ? Prefix.getPrefix(absoluteRoutesPath, file) : '';
        });
    }

    applyRoutePrefixes() {

        const stripTrailingSlash = this.config.router.stripTrailingSlash;
        const routes = this.routes;
        this.routes.objects = this.routes.objects.map((route, index) => {

            if (Array.isArray(route)) {
                routes.objects[index].map((innerRoute, position) => {

                    routes.objects[index][position].path = Prefix.apply(routes.prefixes[index], innerRoute.path, stripTrailingSlash);
                    return routes.objects[index][position];
                });
            }
            routes.objects[index].path = Prefix.apply(routes.prefixes[index], route.path, stripTrailingSlash);
            return routes.objects[index];
        });
        return routes.objects;
    }
};
