'use strict';

const Joi = require('joi');

module.exports = {
    plugin: Joi.object().keys({
        dir: Joi.string().required(),
        pattern: Joi.string().default('/**/!(_)*.js')
    })
};
