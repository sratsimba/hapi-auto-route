'use strict';

const Lab = require('lab');
const Prefix = require('../lib/prefix');

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

    lab.describe('#apply(prefixes, routePath, stripTrailingSlash)', () => {

        lab.it('create a new path based on prefix and route path', () => {

            expect(Prefix.apply(['a', 'b'], '/')).to.be.equal('/a/b/');
            expect(Prefix.apply(['a'], '/b')).to.be.equal('/a/b');
            expect(Prefix.apply([''], '/')).to.be.equal('/');
        });

        lab.it('handle it remove trailing slash if stripTrailingSlash is true', () => {

            expect(Prefix.apply(['a', 'b'], '/', true)).to.be.equal('/a/b');
            expect(Prefix.apply([''], '/', true)).to.be.equal('/');
        });
    });
});
