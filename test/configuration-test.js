'use strict';

const Lab = require('lab');

const { expect } = require('code');

const { Configuration } = require('../index.js');

const lab = exports.lab = Lab.script();

lab.describe('Configuration', () => {

    lab.it('is a class', () => {

        expect(Configuration).to.be.not.undefined()
            .and.to.be.an.function(); // a class.
    });

    lab.describe('#constructor()', () => {

        lab.it('stores router settings and plugin options', () => {

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

        lab.it('ensure that plugin options are valid', () => {

            const options = {
                routes_dir: 34, // should be a string
                pattern: 55, // should be a string
                use_prefix: 'blabla' // should be a boolean (true or false)
            };

            expect(() => {

                new Configuration(null, options);
            }).to.throw();
        });

        lab.it('ensure that router settings are valid', () => {

            const options = {
                routes_dir: 'sd',
                pattern: 'df',
                use_prefix: false
            };
            expect(() => {

                new Configuration({}, options);
            }).to.throw();
        });

        lab.it('applies default plugin options when they are not specified.', () => {

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
});
