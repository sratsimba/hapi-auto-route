'use strict';

const Path = require('path');

module.exports.add = function (dir, file, path) {

    const prefix = '/' + Path.relative(dir, Path.dirname(file));
    if (path === '/') {
        return prefix;
    }
    return prefix + path;
};
