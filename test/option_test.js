'use strict';

const { expect } = require('code');
const lab = exports.lab = require('lab').script();

const Option = require('../lib/option.js');

lab.experiment('options', () => {

    lab.it('Apply default options on empty object', () => {

        const option = Option.validate({});
        expect(option.routes_dir).to.be.equal('routes');
        expect(option.pattern).to.be.equal('**/!(_)*.js');
        expect(option.use_prefix).to.be.false();
    });

    lab.it('Apply default options on empty field.', () => {

        const option = Option.validate({
            routes_dir: 'r',
            use_prefix: true
        });
        expect(option.routes_dir).to.be.equal('r');
        expect(option.pattern).to.be.equal('**/!(_)*.js');
        expect(option.use_prefix).to.be.true();
    });
});
