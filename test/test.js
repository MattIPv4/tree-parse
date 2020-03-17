const { readFileSync } = require('fs');
const { join } = require('path');
const { parse } = require('../src');
const assert = require('assert').strict;

const testFile = readFileSync(join(__dirname, 'test.txt')).toString('utf8');
const res = parse(testFile);

assert.deepEqual(res, {
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
