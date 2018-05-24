'use strict';

const Hoek = require('hoek');

exports.validate = (options) => {

    const defaultOptions = {
        routes_dir: 'routes',
        pattern: '**/!(_)*.js',
        use_prefix: false
    };
    return Hoek.applyToDefaults(defaultOptions, options);
};
