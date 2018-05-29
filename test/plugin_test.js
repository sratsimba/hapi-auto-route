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
});
