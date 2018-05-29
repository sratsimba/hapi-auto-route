'use strict';

const Lab = require('lab');

const { expect } = require('code');

// The hapi-auto-route plugin
const { plugin } = require('../index.js');

const lab = exports.lab = Lab.script();

lab.describe('plugin', () => {

    lab.it('Exports plugin.', () => {

        expect(plugin).to.be.not.undefined();
    });

    lab.it('use package.json file as plugin informations', () => {

        expect(plugin.pkg).to.be.not.undefined();
        expect(plugin.pkg).to.include(['name', 'version', 'description']);
    });

    lab.it('Has function register', () => {

        expect(plugin.register).to.be.not.undefined();
        expect(plugin.register).to.be.a.function();
    });
});
