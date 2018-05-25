'use strict';

const { expect } = require('code');
const lab = exports.lab = require('lab').script();
const Hapi = require('hapi');

const Route = require('../lib/route.js');

lab.experiment('route path', () => {

    lab.it('should return all route path', () => {

        const options = {
            routes_dir: 'test/fixtures/routes',
            pattern: '**/!(_)*.js'
        };

        Route.getAll(options, (err, files) => {

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
        let routeFilePath = 'test/fixtures/routes/index.js';
        expect(Route.getPathPrefix(options, routeFilePath)).to.be.equal('');

        routeFilePath = 'test/fixtures/routes/auth/login.js';
        expect(Route.getPathPrefix(options, routeFilePath)).to.be.equal('');

    });

    lab.it('add prefix if use_prefix is true', () => {

        const options = {
            routes_dir: 'test/fixtures/routes',
            pattern: '**/!(_)*.js',
            use_prefix: true
        };

        // These files exists in fixtures.
        let routeFilePath = 'test/fixtures/routes/index.js';
        expect(Route.getPathPrefix(options, routeFilePath)).to.be.equal('');

        routeFilePath = 'test/fixtures/routes/auth/login.js';
        expect(Route.getPathPrefix(options, routeFilePath)).to.be.equal('auth');

        routeFilePath = 'test/fixtures/routes/auth/v2/login.js';
        expect(Route.getPathPrefix(options, routeFilePath)).to.be.equal('auth/v2');

    });
});

lab.experiment('load', () => {

    lab.it('return or an array of route object  from route file', () => {

        const routeFilePath = 'test/fixtures/routes/auth/login.js';
        const options = {
            routes_dir: 'test/fixtures/routes',
            pattern: '**/!(_)*.js',
            use_prefix: false
        };
        const routes = Route.load(options, routeFilePath);
        expect(routes).to.be.array();
        expect(routes[0]).to.include(['method', 'path', 'handler']);
    });

    lab.it('Return an array of route object if the route \
        file contains an array of route objects.', () => {

        const routeFilePath = 'test/fixtures/routes/index.js';
        const options = {
            routes_dir: 'test/fixtures/routes',
            pattern: '**/!(_)*.js',
            use_prefix: false
        };
        const routes = Route.load(options, routeFilePath);
        expect(routes).to.be.array();
        expect(routes[0]).to.include(['method', 'path', 'handler']);
    });
});

lab.experiment('register', () => {

    lab.it('Register routes to the server', async () => {

        const routes = [{
            method: 'GET',
            path: '/',
            handler: (request, h) => {

                return 'a';
            }
        }];
        const server = Hapi.Server({ port: 8888 });
        Route.register(server, routes);
        const res = await server.inject('/');
        expect(res.statusCode).to.be.equal(200);
    });
});
