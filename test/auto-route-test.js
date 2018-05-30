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
});
