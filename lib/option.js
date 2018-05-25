'use strict';

const Joi = require('joi');

const internals = {};

internals.schema = Joi.object().keys({
    routes_dir: Joi.string().default('routes'),
    pattern: Joi.string().default('**/!(_)*.js'),
    use_prefix: Joi.boolean().default(false)
});

exports.validate = (options) => {

    return Joi.validate(options, internals.schema, (error, value) => {

        if (error !== null) {
            throw error;
        }
        return value;
    });
};
