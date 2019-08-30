'use strict';

const Lab = require('@hapi/lab');
const Path = require('path');
const AutoRoute = require('../lib/auto-route');

const { expect } = require('@hapi/code');

const lab = exports.lab = Lab.script();

// These files exist in fixtures.
const getFiles = () => {

    const routeDir = Path.resolve(__dirname, 'fixtures/routes');

    const files = [
        'index.js'
    ];
    return files.map((file) => {

        return Path.join(routeDir, file);
    });
};

lab.describe('AutoRoute', () => {

    const routeDir = './test/fixtures/routes';

    lab.describe('loadFiles', () => {

        lab.it('load files in an array', () => {

            AutoRoute.getFiles(routeDir, '**/*.js').then((files) => {

                expect(files.length).to.be.above(0);
            });
        });
    });

    lab.describe('getRoutes', () => {

        lab.it('return route objects in a file', () => {

            expect(AutoRoute.getRoutes(getFiles())).to.be.an.array();
            expect(AutoRoute.getRoutes(getFiles())[0]).to.include(['method', 'path', 'handler']);
        });
    });

    lab.describe('getPrefixes()', () => {

        lab.it('return an array of prefix', () => {

            const files = [
                '/a/1.js',
                '/a/b/2.js',
                '/a/b/c/3.js'
            ];

            const baseDir = '/a';

            expect(AutoRoute.getPrefixes(files, baseDir).length).to.be.equal(3);
            expect(AutoRoute.getPrefixes(files, baseDir)).to.include(['/', '/b', '/b/c']);
        });
    });

    lab.describe('updatePaths(prefixes, routes)', () => {

        lab.it('returns an array of routes', () => {

            const prefixes = [
                '/',
                '/b',
                '/b/c'
            ];
            const routes = [{ path: '/1' }, { path: '/2' }, { path: '/3' }];
            expect(AutoRoute.updatePaths(prefixes, routes)).to.be.an.array();
            expect(AutoRoute.updatePaths(prefixes, routes)[0].path).to.be.equal('/1');
            expect(AutoRoute.updatePaths(prefixes, routes)[1].path).to.be.equal('/b/2');
            expect(AutoRoute.updatePaths(prefixes, routes)[2].path).to.be.equal('/b/c/3');
        });

        lab.it('work with an an array of inner routes', () => {

            const prefixes = [
                '/',
                '/b',
                '/b/c'
            ];
            const routes = [{ path: '/1' }, [{ path: '/2' }, { path: '/3' }, { path: '/4' }], { path: '/5' }];
            expect(AutoRoute.updatePaths(prefixes, routes)).to.be.an.array();
            expect(AutoRoute.updatePaths(prefixes, routes)[0].path).to.be.equal('/1');
            expect(AutoRoute.updatePaths(prefixes, routes)[1][0].path).to.be.equal('/b/2');
            expect(AutoRoute.updatePaths(prefixes, routes)[1][1].path).to.be.equal('/b/3');
            expect(AutoRoute.updatePaths(prefixes, routes)[1][2].path).to.be.equal('/b/4');
            expect(AutoRoute.updatePaths(prefixes, routes)[2].path).to.be.equal('/b/c/5');

        });

        lab.it('strip trailing slash', () => {

            const prefixes = [
                '/',
                '/b',
                '/b/c'
            ];
            const routes = [{ path: '/' }, [{ path: '/' }, { path: '/3/' }, { path: '/4' }], { path: '/5/' }];
            expect(AutoRoute.updatePaths(prefixes, routes, true)).to.be.an.array();
            expect(AutoRoute.updatePaths(prefixes, routes, true)[0].path).to.be.equal('/');
            expect(AutoRoute.updatePaths(prefixes, routes, true)[1][0].path).to.be.equal('/b');
            expect(AutoRoute.updatePaths(prefixes, routes, true)[1][1].path).to.be.equal('/b/3');
            expect(AutoRoute.updatePaths(prefixes, routes, true)[1][2].path).to.be.equal('/b/4');
            expect(AutoRoute.updatePaths(prefixes, routes, true)[2].path).to.be.equal('/b/c/5');
        });
    });

    lab.describe('validateOptions(options)', () => {

        lab.it('returns options when they are valid', () => {

            const routes_dir = Path.resolve(__dirname, 'fixtures/routes');

            const validOptions = AutoRoute.validateOptions({ routes_dir });
            expect(validOptions.routes_dir).to.be.equal(routes_dir);
            expect(validOptions.pattern).to.be.equal('**/!(_)*.js');
            expect(validOptions.use_prefix).to.be.equal(false);

        });

        lab.it('throw an error when they are invalid', () => {

            const itThrow = () => {

                AutoRoute.validateOptions({ not_in_props: '' });
            };

            expect(itThrow).to.throw();
        });
    });
});
