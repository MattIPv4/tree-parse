const { readFileSync } = require('fs');
const { join } = require('path');
const { parse, files } = require('../');
const assert = require('assert').strict;

const testFile = readFileSync(join(__dirname, 'test.txt')).toString('utf8');
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
        'config.js': {},
    },
});

const resFiles = files(resTree);

assert.deepEqual(resFiles, [
    './README.md',
    './example.png',
    './index.js',
    './package-lock.json',
    './package.json',
    './src/test/test.js',
    './src/index.js',
    './src/app.js',
    './config.js',
]);
