const assert = require('assert').strict;
const { parse } = require('../../');
const testFile = require('../file');

module.exports = () => {
    const resTree = parse(testFile);
    assert.deepEqual(resTree, {
        '.': {
            'README.md': {},
            'example.png': {},
            'index.js': {},
            'package-lock.json': {},
            'package.json': {},
            'src': {
                'test': {
                    'test.js': {},
                },
                'index.js': {},
                'app.js': {},
            },
        },
    });
};
