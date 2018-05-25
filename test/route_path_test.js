'use strict';

const { expect } = require('code');
const lab = exports.lab = require('lab').script();

const RoutePath = require('../lib/route_path.js');

lab.experiment('route path', () => {

    lab.it('should return all route path', () => {

        const options = {
            routes_dir: 'test/fixtures/routes',
            pattern: '**/!(_)*.js'
        };

        RoutePath.getAll(options, (err, files) => {

            if (err) {
                throw err;
            }
            expect(files.length).to.be.above(1);
        });
    });
});
