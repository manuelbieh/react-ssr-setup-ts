const paths = require('./config/paths');

module.exports = {
    parser: 'pluggable-babel-eslint',
    parserOptions: {
        plugins: ['typescript'],
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    extends: [
        'wiremore',
        'wiremore/react',
        'prettier',
        'prettier/react',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended',
        'plugin:security/recommended',
    ],
    globals: {
        __BROWSER__: true,
        __SERVER__: true,
    },
    plugins: ['babel', 'import', 'prettier', 'security'],
    settings: {
        'import/resolver': {
            node: {
                paths: paths.resolveModules,
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        'import/named': 0,
        'import/no-unassigned-import': 0,
        'import/no-named-as-default-member': 0,
        'prettier/prettier': 'error',
    },
};
