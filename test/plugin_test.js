'use strict';

const HapiAutoRoute = require('../index.js');

const { expect } = require('code');
const lab = exports.lab = require('lab').script();

lab.experiment('plugin', () => {

    lab.it('pluging.pkg should set with package.json', () => {

        const plugin = HapiAutoRoute.plugin;
        expect(plugin).to.not.undefined();
        expect(plugin.pkg).to.not.undefined();
        expect(plugin.pkg).include(['name', 'version', 'description']);
    });

    lab.it('Should have register function', () => {

        const plugin = HapiAutoRoute.plugin;
        expect(plugin.register).to.not.undefined();
        expect(plugin.register).to.be.function();
    });
});
