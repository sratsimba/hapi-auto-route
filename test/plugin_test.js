'use strict';

const HapiAutoRoute = require('../index.js');
const Hapi = require('hapi');

const { expect } = require('code');
const lab = exports.lab = require('lab').script();

lab.experiment('plugin', () => {

    lab.it('pluging.pkg should set with package.json', () => {

        const plugin = HapiAutoRoute.plugin;
        expect(plugin).to.not.undefined();
        expect(plugin.pkg).to.not.undefined();
        expect(plugin.pkg).include(['name', 'version', 'description']);
    });

    lab.it('Should have register function', () => {

        const plugin = HapiAutoRoute.plugin;
        expect(plugin.register).to.not.undefined();
        expect(plugin.register).to.be.function();
    });

    lab.it('Register route to the server', async () => {

        const server = Hapi.Server({ port: 3000 });
        await server.register({
            plugin: HapiAutoRoute,
            options: {
                routes_dir: 'test/fixtures/routes',
                pattern: '**/!(_)*.js'
            }
        });
        const result = await server.inject('/');
        expect(result.statusCode).to.be.equal(200);
    });

    lab.it('Apply default options', async () => {

        const server = Hapi.Server({ port: 3000 });
        await server.register({
            plugin: HapiAutoRoute,
            options: {
                routes_dir: 'test/fixtures/routes'
            }
        });
        const result = await server.inject('/');
        expect(result.statusCode).to.be.equal(200);
    });


    lab.it('Change route path if use_prefix is true', async () => {

        const server = Hapi.Server({ port: 3000 });
        await server.register({
            plugin: HapiAutoRoute,
            options: {
                routes_dir: 'test/fixtures/routes',
                use_prefix: true
            }
        });
        const result = await server.inject('/auth/login');
        expect(result.statusCode).to.be.equal(200);
    });
});
