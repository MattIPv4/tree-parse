module.exports = {
    root: true,
    env: {
        'node': true,
    },
    extends: [
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        semi: [
            'error',
            'always',
        ],
        quotes: [
            'error',
            'single',
        ],
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
    },
};
