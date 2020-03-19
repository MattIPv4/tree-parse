const assert = require('assert').strict;
const { parse, files } = require('../../');
const testFile = require('../file');

module.exports = () => {
    const resFiles = files(parse(testFile));
    assert.deepEqual(resFiles, [
        './README.md',
        './example.png',
        './index.js',
        './package-lock.json',
        './package.json',
        './src/test/test.js',
        './src/index.js',
        './src/app.js',
    ]);
};
