'use strict';

const Glob = require('glob');
const Hoek = require('@hapi/hoek');
const Joi = require('@hapi/joi');
const Path = require('path');
const Util = require('util');
const Prefix = require('./prefix');

module.exports.getFiles = (baseDir, pattern) => {

    if (Array.isArray(baseDir)) {
        const promise = new Promise((resolve, reject) => {
            Promise.all(baseDir.map((d) => this.getFiles(d, pattern)))
                .then((value) => resolve(Hoek.flatten(value)))
                .catch((reason) => reject(reason));
        })
        return promise;
    }

    const absolutePattern = Path.join(baseDir, pattern);
    const glob = Util.promisify(Glob);
    return glob(absolutePattern, {});
};

module.exports.getRoutes = (files) => {

    return files.map((file) => {

        return Hoek.clone(require(Path.resolve(file)));
    });
};

module.exports.getPrefixes = (files, baseDir) => {

    return files.map((file) => {

        return Prefix.parse(file, baseDir).reduce((current, next) => {

            return current + '/' + next;
        }, '');
    });
};

module.exports.updatePaths = (prefixes, routes, stripTrailingSlash) => {

    const update = (route, index, removeTrailingSlash) => {

        const newRoute = Hoek.clone(route);

        if (prefixes[index] === '/') {
            return newRoute;
        }

        newRoute.path = prefixes[index] + route.path;
        if (removeTrailingSlash && newRoute.path.endsWith('/')) {
            newRoute.path = newRoute.path.slice(0, -1);
        }

        return newRoute;
    };

    return routes.map((route, index) => {

        if (Array.isArray(route)) {
            return route.map((innerRoute, _index) => {

                return update(innerRoute, index, stripTrailingSlash);
            });
        }

        return update(route, index, stripTrailingSlash);
    });
};

module.exports.validateOptions = (options) => {

    const optionsSchema = Joi.object().keys({
        routes_dir: Joi.alternatives(Joi.string(), Joi.array().items(Joi.string())).required(),
        pattern: Joi.string().default('**/!(_)*.js'),
        use_prefix: Joi.boolean().default(false)
    });

    const { error, value } = Joi.validate(options, optionsSchema);
    Hoek.assert(error === null, 'Invalid options are passed to hapi-auto-route');
    return value;
};
