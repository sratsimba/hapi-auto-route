'use strict';

const Glob = require('glob');
const Hoek = require('hoek');
const Joi = require('joi');
const Path = require('path');
const Util = require('util');
const Prefix = require('./prefix');

module.exports.getFiles = (baseDir, pattern) => {

    const absolutePattern = Path.join( baseDir, pattern);
    const glob = Util.promisify(Glob);
    return glob(absolutePattern, {});
};

module.exports.getRoutes = (files) => {

    return files.map((file) => {

        return Hoek.clone(require(Path.join(process.cwd(), file)));
    });
};

module.exports.getPrefixes = (files, baseDir) => {

    return files.map((file) => {

        return Prefix.parse(file, baseDir).reduce((current, next) => {

            return current + '/' + next;
        }, '');
    });
};

module.exports.updatePaths = (prefixes, routes) => {

    const update = (route, index) => {

        const newRoute = Hoek.clone(route);

        if (prefixes[index] === '/') {
            return newRoute;
        }
        newRoute.path = prefixes[index] + route.path;
        return newRoute;
    };

    return routes.map((route, index) => {

        if (Array.isArray(route)) {
            return route.map((innerRoute, _index) => {

                return update(innerRoute, index);
            });
        }

        return update(route, index);
    });
};

module.exports.validateOptions = (options) => {

    const optionsSchema = Joi.object().keys({
        routes_dir: Joi.string().default('routes'),
        pattern: Joi.string().default('**/!(_)*.js'),
        use_prefix: Joi.boolean().default(false)
    });

    const { error, value } = Joi.validate(options, optionsSchema);
    Hoek.assert(error === null, 'Invalid options are passed to hapi-auto-route');
    return value;
};
