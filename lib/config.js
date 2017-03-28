'use strict';

const Joi = require('joi');

module.exports = {
    get: function (options, schema) {

        const result = Joi.validate(options, schema);
        if (result.error !== null) {
            throw result.error;
        }
        return result.value;
    }
};
