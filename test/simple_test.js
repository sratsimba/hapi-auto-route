'use strict';

const Lab = require('lab');

const { expect } = require('code');

const lab = exports.lab = Lab.script();

lab.test('simple test', () => {

    expect(1 + 1).to.be.equal(2);
});
