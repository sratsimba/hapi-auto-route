'use strict';

const Path = require('path');

module.exports = {
    getPrefix: (route_dir, file) => {

        const prefix = Path.dirname(Path.relative(route_dir, file));

        return prefix.split(Path.sep).map((e) => {

            return e === '.' ? '' : e;
        });
    },
    mergePrefixAndRoutePath: (prefix, routePath) => {

        
    }
};
