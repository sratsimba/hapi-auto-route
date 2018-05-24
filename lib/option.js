'use strict';

const Joi = require('joi');

const internals = {};

internals.schema = Joi.object().keys({
    routes_dir: Joi.string().default('routes'),
    pattern: Joi.string().default('**/!(_)*.js'),
    use_prefix: Joi.boolean().default(false)
});

internals.defaultOptions = {
    routes_dir: 'routes',
    pattern: '**/!(_)*.js',
    use_prefix: false
};

exports.validate = (options) => {

    return Joi.validate(options, internals.schema, (error, value) => {

        if (error !== null) {
            throw error;
        }
        return value;
    });
};
