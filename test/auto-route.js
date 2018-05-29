'use strict';

const Lab = require('lab');

const { expect } = require('code');

// The hapi-auto-route plugin
const { Configuration } = require('../lib/auto-route.js');

const lab = exports.lab = Lab.script();

lab.describe('Option', () => {

    lab.it('Options is an object', () => {

        expect(Configuration).to.be.not.undefined()
            .and.to.be.an.function(); // a class.
    });

    lab.it('Has a merged property of routerSetting and options', () => {

        const routerSetting = {
            isCaseSensitive: true,
            stripTrailingSlash: false
        };
        const options = {
            routes_dir: 'sd',
            pattern: 'df',
            use_prefix: false
        };
        const config = new Configuration(routerSetting, options);
        expect(config.router).to.be.an.object().and.include([
            'isCaseSensitive', 'stripTrailingSlash'
        ]);
        expect(config.plugin).to.be.an.object().and.include([
            'routes_dir', 'pattern', 'use_prefix'
        ]);
    });

    lab.it('Throw an error when options is not valid', () => {

        const options = {
            routes_dir: 34, // should be a string
            pattern: 55, // should be a string
            use_prefix: 'blabla' // should be a boolean (true or false)
        };

        expect(() => {

            new Configuration(null, options);
        }).to.throw();
    });

    lab.it('Throws an error when router settings are invalid', () => {

        const options = {
            routes_dir: 'sd',
            pattern: 'df',
            use_prefix: false
        };
        expect(() => {

            new Configuration({}, options);
        }).to.throw();
    });

    lab.it('applies default plugin options when "options" is undifined.', () => {

        const routerSetting = {
            isCaseSensitive: true,
            stripTrailingSlash: false
        };
        const config = new Configuration(routerSetting, {});
        expect(config.plugin.routes_dir).to.be.equal('routes');
        expect(config.plugin.pattern).to.be.equal('**/*.js');
        expect(config.plugin.use_prefix).to.be.false();
    });
});
