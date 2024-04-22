'use strict';

const Glob = require('glob');
const Hoek = require('@hapi/hoek');
const Joi = require('joi');
const Path = require('path');
const Util = require('util');
const Prefix = require('./prefix');

module.exports.getFiles = (baseDir, pattern) => {

    if (Array.isArray(baseDir)) {
        return new Promise((resolve) => {

            Promise.all(baseDir.map((d) => this.getFiles(d, pattern)))
                .then((value) => resolve(Hoek.flatten(value)));
        });
    }

    const absolutePattern = Path.join(baseDir, pattern);
    const glob = Util.promisify(Glob);
    return glob(absolutePattern, {});
};

module.exports.getRoutes = (filepaths) => {

    const routeSchema = Joi.object().keys({
        method: Joi.string().required(),
        path: Joi.string().required()
        // Technically handler is required as well, either in the method or in its options, but that gets sticky with plugins.
    }).xor('handler', 'options').unknown(true);

    const multipleRoutesAllowed = Joi.alternatives(routeSchema, Joi.array().items(routeSchema));

    const files = filepaths.map((p) => require(Path.resolve(p)));

    const routes = files.filter((file) => {

        const result = multipleRoutesAllowed.validate(file);
        return !Object.keys(result).includes('error');
    });

    return routes.map((file) => Hoek.clone(file));
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
        routes_dir: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).required(),
        pattern: Joi.string().default('**/!(_)*.js'),
        use_prefix: Joi.boolean().default(false)
    });

    const result = optionsSchema.validate(options);

    Hoek.assert(!Object.keys(result).includes('error'), 'Invalid options are passed to hapi-auto-route');

    return result.value;
};
