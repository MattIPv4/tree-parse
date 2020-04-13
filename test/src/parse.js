const assert = require('assert').strict;
const { parse } = require('../../');
const testFile = require('../file');

module.exports = () => {
    const resTree = parse(testFile);
    assert.deepEqual(resTree, {
        '.': {
            'README.md': {},
            'example.png': {},
            'package-lock.json': {},
            'package.json': {},
            'src': {
                'app.js': {},
                'util.js': {},
                'test': {
                    'test.js': {},
                },
            },
            'index.js': {},
        },
    });
};
