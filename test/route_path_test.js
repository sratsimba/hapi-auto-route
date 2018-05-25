'use strict';

const { expect } = require('code');
const lab = exports.lab = require('lab').script();

const RoutePath = require('../lib/route_path.js');

const Path = require('path');

lab.experiment('route path', () => {

    lab.it('should return all route path', () => {

        const options = {
            routes_dir: 'test/fixtures/routes',
            pattern: '**/!(_)*.js'
        };

        RoutePath.getAll(options, (err, files) => {

            if (err) {
                throw err;
            }
            expect(files.length).to.be.above(1);
            //console.log(files);
        });
    });
});

lab.experiment('getPathPrefix', () => {

    lab.it('does not add prefix if use_prefix options is false', () => {

        const options = {
            routes_dir: 'test/fixtures/routes',
            pattern: '**/!(_)*.js',
            use_prefix: false
        };

        // These files exists in fixtures.
        let routeFilePath = Path.join(process.cwd(), 'test/fixtures/routes/index.js');
        expect(RoutePath.getPathPrefix(options, routeFilePath)).to.be.equal('');

        routeFilePath = Path.join(process.cwd(), 'test/fixtures/routes/auth/login.js');
        expect(RoutePath.getPathPrefix(options, routeFilePath)).to.be.equal('');

    });

    lab.it('add prefix if use_prefix is true', () => {

        const options = {
            routes_dir: 'test/fixtures/routes',
            pattern: '**/!(_)*.js',
            use_prefix: true
        };

        // These files exists in fixtures.
        let routeFilePath = Path.join(process.cwd(), 'test/fixtures/routes/index.js');
        expect(RoutePath.getPathPrefix(options, routeFilePath)).to.be.equal('');

        routeFilePath = Path.join(process.cwd(), 'test/fixtures/routes/auth/login.js');
        expect(RoutePath.getPathPrefix(options, routeFilePath)).to.be.equal('auth');
    });
});
