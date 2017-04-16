'use strict';

const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const Prefix = require('../lib/prefix');

lab.describe('Prefix', () => {

    lab.describe('#add()', () => {

        lab.it('Add prefix to the path', (done) => {

            const dir = '/path/to/route';
            const file = ('/path/to/route/a/b/c/file.js');
            const path = '/login';
            Code.expect(Prefix.add(dir, file, path)).to.be.equal('/a/b/c/login');
            done();
        });

        lab.it('Remove trailing slash', (done) => {

            const dir = '/path/to/route';
            const file = '/path/to/route/a/b/c/file.js';
            // Supposed that file contain this route.
            const path = '/';
            Code.expect(Prefix.add(dir, file, path)).to.be.equal('/a/b/c');
            done();
        });

        lab.it('Remove prefix in the root dir', (done) => {

            const dir = '/path/to/route';
            const file = '/path/to/route/login.js';
            const path = '/login';
            Code.expect(Prefix.add(dir, file, path)).to.be.equal('/login');
            done();
        });
    });
});
