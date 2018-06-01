'use strict';

const Lab = require('lab');
const Hapi = require('hapi');
const HapiAutoRoute = require('..');
const { expect } = require('code');

const lab = exports.lab = Lab.script();

lab.describe('hapi-auto-route', () => {

    lab.it('register route to the server', async () => {

        const server = Hapi.Server({ port: 3000 });
        await server.register({
            plugin: HapiAutoRoute,
            options: {
                routes_dir: './test/fixtures/routes'
            }
        });
        let result = await server.inject('/');
        expect(result.statusCode).to.be.equal(200);
        result = await server.inject('/page1');
        expect(result.statusCode).to.be.equal(200);
        result = await server.inject('/p1.view');
        expect(result.statusCode).to.be.equal(200);
        result = await server.inject('/deep');
        expect(result.statusCode).to.be.equal(200);
    });

    lab.it('apply prefix', async () => {

        const server = Hapi.Server({ port: 3000 });
        await server.register({
            plugin: HapiAutoRoute,
            options: {
                routes_dir: './test/fixtures/routes',
                use_prefix: true
            }
        });
        let result = await server.inject('/');
        expect(result.statusCode).to.be.equal(200);
        result = await server.inject('/pages/page1');
        expect(result.statusCode).to.be.equal(200);
        result = await server.inject('/pages/p1.view');
        expect(result.statusCode).to.be.equal(200);
        result = await server.inject('/pages/deep/deep');
        expect(result.statusCode).to.be.equal(200);
    });

    lab.it('stripTrailingSlash', async () => {

        const server = Hapi.Server({
            port: 3000,
            router: {
                stripTrailingSlash: true
            }
        });
        await server.register({
            plugin: HapiAutoRoute,
            options: {
                routes_dir: './test/fixtures/with-trailing-slash',
                use_prefix: true
            }
        });
        let result = await server.inject('/');
        expect(result.statusCode).to.be.equal(200);
        result = await server.inject('/pages');
        expect(result.statusCode).to.be.equal(200);
    });
});
