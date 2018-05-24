'use strict';

const Glob = require('glob');
const Path = require('path');

exports.getAll = (options, callback) => {

    const baseDir = Path.join(process.cwd(), options.routes_dir);
    const glob = Path.join(baseDir, options.pattern);
    Glob(glob, callback);
};
