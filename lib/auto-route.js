'use strict';

const Hoek = require('hoek');
const Glob = require('glob');
const Path = require('path');
const { getPrefix } = require('./prefix');
const { promisify } = require('util');

module.exports = class {
    constructor(config) {

        this.config = config;
        this.routes = {
            files: [],
            objects: [],
            // this will be set as an array of prefix if the plugin option use_prefix is true.
            prefixes: undefined
        };
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
        if (this.config.plugin.use_prefix) {
            this.routes.prefixes = this.routes.files.map((file) => {

                return getPrefix(absoluteRoutesPath, file);
            });
        }
    }
};
