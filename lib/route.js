'use strict';

const Glob = require('glob');

module.exports = {
    files: (dir, pattern) => Glob.sync(dir + pattern)
};
