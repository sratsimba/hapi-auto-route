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

internals.validatePluginOptions = (options) => {

    const result = Joi.validate(options, internals.schema.plugin);
    Hoek.assert(result.error === null,
        new Error('Invalide hapi-auto-route options'));
};

exports.Configuration = class  {
    constructor(routerSetting, pluginOptions) {

        internals.validatePluginOptions(pluginOptions);

        // routerSetting is always set by the server so it don't need to
        // to be checked.
        this.router = Hoek.clone(routerSetting);
        this.plugin = Hoek.clone(pluginOptions);
    }
};
