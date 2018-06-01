'use strict';

const Lab = require('lab');
const Prefix = require('../lib/prefix');
const { expect } = require('code');

const lab = exports.lab = Lab.script();

lab.describe('Prefix', () => {

    const files = [
        '/a/1.js',
        '/a/b/2.js',
        '/a/b/c/3.js'
    ];

    const baseDir = '/a';

    lab.describe('#parse()', () => {

        lab.it('returns an array', () => {

            expect(Prefix.parse(files[0], baseDir)).to.be.an.array();
        });

        lab.it('relative path from baseDir to file', () => {

            expect(Prefix.parse(files[0], baseDir)).to.not.include(['a']);
            expect(Prefix.parse(files[1], baseDir)).to.not.include(['a']);
            expect(Prefix.parse(files[2], baseDir)).to.not.include(['a']);
        });

        lab.it('removes filename', () => {

            expect(Prefix.parse(files[0], baseDir)).to.not.include(['1.js']);
            expect(Prefix.parse(files[1], baseDir)).to.not.include(['2.js']);
            expect(Prefix.parse(files[2], baseDir)).to.not.include(['3.js']);
        });

        lab.it('returned prefixes do not contain dot', () => {

            expect(Prefix.parse(files[0], baseDir)).to.not.include(['.']);
            expect(Prefix.parse(files[1], baseDir)).to.not.include(['.']);
            expect(Prefix.parse(files[2], baseDir)).to.not.include(['.']);
        });

        lab.it('return prefix in an array of string', () => {

            expect(Prefix.parse(files[0], baseDir)).to.only.include(['']);
            expect(Prefix.parse(files[1], baseDir)).to.only.include(['b']);
            expect(Prefix.parse(files[2], baseDir)).to.only.include(['b', 'c']);
        });

        lab.it('throw an error if baseDir is relative path', () => {

            const itThrow = () => {

                const relativeBaseDir = 'a';
                Prefix.parse(files[0], relativeBaseDir);
            };
            expect(itThrow).to.throw();
        });
    });

    lab.describe('joinPrefix()', () => {

        lab.it('join prefixes', () => {

            expect(Prefix.joinPrefix([''])).to.be.equal('');
            expect(Prefix.joinPrefix(['b'])).to.be.equal('/b');
            expect(Prefix.joinPrefix(['b', 'c'])).to.be.equal('/b/c');
        });
    });
});
