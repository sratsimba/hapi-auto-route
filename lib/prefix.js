'use strict';

const Path = require('path');

module.exports = {
    getPrefix: (route_dir, file) => {

        const prefix = Path.dirname(Path.relative(route_dir, file));

        return prefix.split(Path.sep).map((e) => {

            return e === '.' ? '' : e;
        });
    },
    apply: (prefixes, routePath, stripTrailingSlash) => {

        const newPath = prefixes.reduce((acc, current, index) => {

            if (current === '') {
                return acc;
            }
            return acc  + '/' + current;
        }, '') + routePath;


        if (newPath === '/') {
            return newPath;
        }

        if (stripTrailingSlash && newPath.endsWith('/')) {
            return newPath.slice(0, newPath.length - 1);
        }
        return newPath;
    }
};
