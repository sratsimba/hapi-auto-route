'use strict';

const Hoek = require('hoek');
const Joi = require('joi');

const internals = {};

internals.schema = {};

// plugin options schema.
internals.schema.plugin = Joi.object().keys({
    routes_dir: Joi.string(),
    pattern: Joi.string(),
    use_prefix: Joi.boolean()
});

// router settings schema.
internals.schema.routerSettings = Joi.object().keys({
    isCaseSensitive: Joi.boolean().required(),
    stripTrailingSlash: Joi.boolean().required()
});

internals.validatePluginOptions = (options) => {

    const result = Joi.validate(options, internals.schema.plugin);
    Hoek.assert(result.error === null,
        new Error('Invalid hapi-auto-route options'));
};


internals.validateRouterSettings = (settings) => {

    const result = Joi.validate(settings, internals.schema.routerSettings);
    Hoek.assert(result.error === null,
        new Error('Invalid server router settings'));
};

exports.Configuration = class  {
    constructor(routerSetting, pluginOptions) {

        internals.validateRouterSettings(routerSetting);
        internals.validatePluginOptions(pluginOptions);

        this.router = Hoek.clone(routerSetting);
        this.plugin = Hoek.clone(pluginOptions);
    }
};
