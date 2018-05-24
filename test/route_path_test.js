'use strict';

const MockFs = require('mock-fs');

const { expect } = require('code');
const lab = exports.lab = require('lab').script();

const RoutePath = require('../lib/route_path.js');

lab.experiment('route path', () => {

    lab.it('should return all route path', () => {

        const options = {
            routes_dir: 'test/routes',
            pattern: '**/!(_)*.js'
        };

        MockFs({
            test: {
                routes: {
                    'index.js': 'fklsdf',
                    'auth.js': 'hsdf'
                }
            }
        });
        RoutePath.getAll(options, (err, files) => {

            if (err) {
                // do nothing
            }
            expect(files.length).to.be.above(1);
        });
        MockFs.restore();
    });
});
