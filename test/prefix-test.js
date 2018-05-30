'use strict';

const Lab = require('lab');

const { expect } = require('code');

// The hapi-auto-route plugin
const { getPrefix } = require('../lib/prefix.js');

const lab = exports.lab = Lab.script();

lab.describe('Prefix', () => {

    lab.describe('#getPrefix(route_dir, filePath)', () => {

        lab.it('return an array of folder tree', () => {

            expect(getPrefix('/a', '/a/b/c/1.js')).to.be.an.array().include(['b', 'c']);
            expect(getPrefix('/a', '/a/b/c/1.js')).to.not.include(['1.js']);
        });

        lab.it('replace dot with empty string', () => {

            expect(getPrefix('/a', '/a/1.js')).to.not.include(['.']).and.include(['']);
        });
    });
});
