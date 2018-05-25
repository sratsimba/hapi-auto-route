'use strict';

const HapiAutoRoute = require('../index.js');
const Hapi = require('hapi');

const { expect } = require('code');
const lab = exports.lab = require('lab').script();

lab.experiment('plugin', () => {

    let server = null;
    let plugin = null;
    let hapiAutoRouteOptions = null;

    lab.beforeEach(() => {

        server = Hapi.Server({ port: 3000 });
        plugin = HapiAutoRoute.plugin;
        hapiAutoRouteOptions = {
            routes_dir: 'test/fixtures/routes',
            pattern: '**/*.js',
            use_prefix: true
        };
    });

    lab.afterEach(() => {

        server = null;
    });

    lab.it('pluging.pkg should set with package.json', () => {

        expect(plugin).to.not.undefined();
        expect(plugin.pkg).to.not.undefined();
        expect(plugin.pkg).include(['name', 'version', 'description']);
    });

    lab.it('Should have register function', () => {

        expect(plugin.register).to.not.undefined();
        expect(plugin.register).to.be.function();
    });

    lab.it('Register route to the server', async () => {

        hapiAutoRouteOptions.use_prefix = false;
        await server.register({
            plugin: HapiAutoRoute,
            options: hapiAutoRouteOptions
        });
        const result = await server.inject('/');
        expect(result.statusCode).to.be.equal(200);
    });

    lab.it('Apply default options', async () => {

        delete hapiAutoRouteOptions.use_prefix;
        delete hapiAutoRouteOptions.pattern;
        await server.register({
            plugin: HapiAutoRoute,
            options: hapiAutoRouteOptions
        });
        const result = await server.inject('/');
        expect(result.statusCode).to.be.equal(200);
    });


    lab.it('Change route path if use_prefix is true', async () => {

        await server.register({
            plugin: HapiAutoRoute,
            options: hapiAutoRouteOptions
        });
        const result = await server.inject('/auth/login');
        expect(result.statusCode).to.be.equal(200);
    });
});
