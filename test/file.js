const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = readFileSync(join(__dirname, 'test.txt')).toString('utf8');
