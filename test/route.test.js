'use strict';

const Route = require('../lib/route');

describe('Route', () => {

    describe('#files(dir, pattern)', () => {

        it('Return all valide files in the route path', () => {

            expect(Route.files(__dirname + '/routes', '/**/!(_)*.js').length).toBe(3);
        });
    });
});
