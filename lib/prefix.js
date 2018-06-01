'use strict';

const Path = require('path');
const Hoek = require('hoek');

module.exports.parse = (file, baseDir) => {

    Hoek.assert(Path.isAbsolute(baseDir), 'baseDir must be an absolute path');

    const absolutePath = Path.dirname(Path.relative(baseDir, file));
    const prefixes = absolutePath.split(Path.sep);
    return prefixes.map((prefix) => {

        return prefix === '.' ? '' : prefix;
    });
};

module.exports.joinPrefix = (prefixes) => {

    return prefixes.reduce((joined, prefix) => {

        if (prefix === '') {
            return '';
        }
        return joined + '/' + prefix;
    }, '');
};
