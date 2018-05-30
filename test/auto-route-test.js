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
            expect(autoRoute.routes).to.be.an.array();
        });
    });
});
