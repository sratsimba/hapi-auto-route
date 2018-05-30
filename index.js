'use strict';

const Hoek = require('hoek');
const Joi = require('joi');
const Glob = require('glob');
const Path = require('path');

const { promisify } = require('util');

const internals = {};

internals.schema = {};

// plugin options schema.
internals.schema.plugin = Joi.object().keys({
    routes_dir: Joi.string().default('routes'),
    pattern: Joi.string().default('**/*.js'),
    use_prefix: Joi.boolean().default(false)
});

// router settings schema.
internals.schema.routerSettings = Joi.object().keys({
    isCaseSensitive: Joi.boolean().required(),
    stripTrailingSlash: Joi.boolean().required()
});

exports.Configuration = class {
    constructor(routerSetting, pluginOptions) {

        const settings = Joi.validate(routerSetting, internals.schema.routerSettings);
        const options = Joi.validate(pluginOptions, internals.schema.plugin);

        Hoek.assert(settings.error === null, new Error('Invalid server router settings'));
        Hoek.assert(options.error === null, new Error('Invalid hapi-auto-route options'));

        this.router = Hoek.clone(settings.value);
        this.plugin = Hoek.clone(options.value);
    }
};

exports.AutoRoute = class {
    constructor(config) {

        this.config = config;
        this.routes = {
            files: [],
            objects: []
        };
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

    loadPrefix() {

        if (this.config.plugin.use_prefix) {

            this.routes.prefix = this.routes.files.map((file) => {

                const relativePath = Path.relative(this.config.plugin.routes_dir, file);
                return Path.dirname(relativePath).split(Path.sep); // Removes file basename and extension
            });
        }
    }
};

exports.plugin = {
    pkg: require('./package.json'),
    register: async (server, options) => {}
};
