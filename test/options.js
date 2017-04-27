'use strict';

const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const Options = require('../lib/options');

lab.describe('Options', (done) => {

    lab.describe('#getOptions()', () => {

        lab.it('applies defaults value', (done) => {

            const defaultOptions = Options.plugin({
                dir: __dirname + '/routes'
            });
            Code.expect(defaultOptions).to.be.equal({
                dir: __dirname + '/routes',
                pattern: '/**/!(_)*.js',
                prefix: true
            });
            done();
        });

        lab.it('Doesn\'t throws exception when dir is not set', (done) => {

            Code.expect(() => {

                Options.plugin({});
            }).to.not.throw();
            done();
        });
    });
});
