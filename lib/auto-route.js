'use strict';

const Hoek = require('hoek');
const Joi = require('joi');

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

exports.Configuration = class  {
    constructor(routerSetting, pluginOptions) {

        const settings = Joi.validate(routerSetting, internals.schema.routerSettings);
        const options = Joi.validate(pluginOptions, internals.schema.plugin);

        Hoek.assert(settings.error === null, new Error('Invalid server router settings'));
        Hoek.assert(options.error === null, new Error('Invalid hapi-auto-route options'));

        this.router = Hoek.clone(settings.value);
        this.plugin = Hoek.clone(options.value);
    }
};
