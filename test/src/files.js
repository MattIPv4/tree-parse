const assert = require('assert').strict;
const { parse, files } = require('../../');
const testFile = require('../file');

module.exports = () => {
    const resFiles = files(parse(testFile));
    assert.deepEqual(resFiles, [
        './README.md',
        './example.png',
        './package-lock.json',
        './package.json',
        './src/app.js',
        './src/util.js',
        './src/test/test.js',
        './index.js',
    ]);
};
