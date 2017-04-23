'use strict';

const Joi = require('joi');

module.exports.plugin = function (options) {

    const schema = Joi.object().keys({
        dir: Joi.string().default(process.cwd() + '/routes'),
        pattern: Joi.string().default('/**/!(_)*.js'),
        prefix: Joi.boolean().default(true)
    });
    const result = Joi.validate(options, schema);
    if (result.error !== null) {
        throw result.error;
    }
    return result.value;
};
