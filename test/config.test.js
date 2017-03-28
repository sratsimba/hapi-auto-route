'use strict';

const Config = require('../lib/config');
const Schema = require('../lib/schema');

describe('Config', () => {

    describe('#get()', () => {

        it('Return default options', () => {

            const defaultConf = {
                dir: __dirname + '/routes',
                pattern: '/**/!(_)*.js'
            };
            expect(Config.get({ dir: __dirname + '/routes' }, Schema.plugin))
                .toEqual(defaultConf);
        });

        it('Thow an expection when options.dir is not set', () => {

            expect(() => Config.get({}, Schema.plugin)).toThrow();
        });
    });
});
