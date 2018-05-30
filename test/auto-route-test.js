'use strict';

const Lab = require('lab');
const AutoRoute = require('../lib/auto-route');
const Configuration = require('../lib/configuration.js');

const { expect } = require('code');


const lab = exports.lab = Lab.script();

lab.describe('AutoRoute', () => {

    const routerSetting = {
        isCaseSensitive: true,
        stripTrailingSlash: false
    };

    const options = {
        routes_dir: './test/fixtures/routes'
    };

    lab.it('is a class', () => {

        expect(AutoRoute).to.be.a.function(); // a class
    });

    lab.describe('#constructor(config)', () => {

        lab.it('set configuration', () => {

            const autoRoute = new AutoRoute(new Configuration(routerSetting, {}));
            expect(autoRoute.config).to.be.instanceof(Configuration);
        });

        lab.it('set property routes which is an array', () => {

            const autoRoute = new AutoRoute(new Configuration(routerSetting, {}));
            expect(autoRoute.routes).to.be.an.object().and.include(['files']);
        });
    });

    lab.describe('#loadFiles()', () => {

        lab.it('returns routes file path and set AutoRoute routes property', async () => {

            const autoRoute = new AutoRoute(new Configuration(routerSetting, options));
            const files = await autoRoute.loadFiles();
            expect(files).to.be.an.array();
            expect(files.length).to.be.above(0);
            expect(autoRoute.routes.files).to.be.an.array();
            expect(autoRoute.routes.files.length).to.be.above(0);
        });
    });

    lab.describe('#loadHapiRoutes()', () => {

        lab.it('return hapi routes objecs and set routes objects', async () => {

            options.use_prefix = true;

            const autoRoute = new AutoRoute(new Configuration(routerSetting, options));
            await autoRoute.loadFiles();
            autoRoute.loadRouteObjects();

            expect(autoRoute.routes.objects).to.be.an.array();
            expect(autoRoute.routes.objects[0]).to.include(['method', 'path', 'handler']);
        });
    });

    lab.describe('#loadPrefix()', () => {

        lab.it('set prefix if use_prefix is true.', async () => {

            options.pattern = 'pages/page1.js';
            options.use_prefix = true;
            const autoRoute = new AutoRoute(new Configuration(routerSetting, options));
            await autoRoute.loadFiles();
            autoRoute.loadRouteObjects();
            autoRoute.loadPrefixes();

            expect(autoRoute.routes.prefixes).to.be.an.array();
            expect(autoRoute.routes.prefixes[0]).to.an.array();
            expect(autoRoute.routes.prefixes[0][0]).to.be.equal('pages');

        });

        lab.it('set prefixes to be an array of empty string if plugin do not use prefix', async () => {

            options.pattern = 'pages/page1.js';
            options.use_prefix = false;
            const autoRoute = new AutoRoute(new Configuration(routerSetting, options));
            await autoRoute.loadFiles();
            autoRoute.loadRouteObjects();
            autoRoute.loadPrefixes();

            expect(autoRoute.routes.prefixes).to.be.an.array();
            expect(autoRoute.routes.prefixes[0]).to.be.a.string().and.empty();
        });

        lab.it('replace dot whit an empty string', async () => {

            options.pattern = 'index.js';
            options.use_prefix = true;
            const autoRoute = new AutoRoute(new Configuration(routerSetting, options));
            await autoRoute.loadFiles();
            autoRoute.loadRouteObjects();
            autoRoute.loadPrefixes();

            expect(autoRoute.routes.prefixes[0][0]).to.be.a.string().and.to.empty();
        });
    });

    lab.describe('#applyRoutePrefix()', () => {

        lab.it('apply route prefix if plugin use prefixes', async () => {

            options.pattern = 'pages/page1.js';
            options.use_prefix = true;
            routerSetting.stripTrailingSlash = true;
            const autoRoute = new AutoRoute(new Configuration(routerSetting, options));
            await autoRoute.loadFiles();
            autoRoute.loadRouteObjects();
            autoRoute.loadPrefixes();
            autoRoute.applyRoutePrefixes();

            expect(autoRoute.routes.objects[0].path).to.be.equal('/pages/page1');
        });

        lab.it('apply prefix on an array of route objects', async () => {

            options.pattern = 'pages/index.js';
            options.use_prefix = true;
            routerSetting.stripTrailingSlash = true;
            const autoRoute = new AutoRoute(new Configuration(routerSetting, options));
            await autoRoute.loadFiles();
            autoRoute.loadRouteObjects();
            autoRoute.loadPrefixes();
            autoRoute.applyRoutePrefixes();

            expect(autoRoute.routes.objects[0][0].path).to.be.equal('/pages/ListPage1');
            expect(autoRoute.routes.objects[0][1].path).to.be.equal('/pages/ListPage2');

        });
    });

    lab.it('#run()', async () => {

        const autoRoute = new AutoRoute(new Configuration(routerSetting, options));
        await autoRoute.run();
    });
});
