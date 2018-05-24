'use strict';

const Joi = require('joi');

const internals = {};

internals.schema = Joi.object().keys({
    routes_dir: Joi.string().default('routes'),
    pattern: Joi.string().default('**/!(_)*.js'),
    use_prefix: Joi.boolean().default(false)
});
<<<<<<< HEAD
=======

internals.defaultOptions = {
    routes_dir: 'routes',
    pattern: '**/!(_)*.js',
    use_prefix: false
};
>>>>>>> 992cc2d7ff317b15db8b01ce12800095f00a2257

exports.validate = (options) => {

    return Joi.validate(options, internals.schema, (error, value) => {

        if (error !== null) {
            throw error;
        }
        return value;
    });
};
