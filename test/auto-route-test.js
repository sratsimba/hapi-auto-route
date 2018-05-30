'use strict';

const Lab = require('lab');

const { expect } = require('code');

const { AutoRoute, Configuration } = require('../index.js');

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
            autoRoute.loadPrefix();

            expect(autoRoute.routes.prefix).to.be.an.array();
            expect(autoRoute.routes.prefix[0]).to.equal('pages');
        });

        lab.it('doesn\'t set routes.prefix if use prefix is false', async () => {

            options.pattern = 'pages/page1.js';
            options.use_prefix = false;
            const autoRoute = new AutoRoute(new Configuration(routerSetting, options));
            await autoRoute.loadFiles();
            autoRoute.loadRouteObjects();
            autoRoute.loadPrefix();

            expect(autoRoute.routes.prefix).to.be.undefined();
        });
    });

});
