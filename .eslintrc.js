module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        'template-curly-spacing': 'off',
        indent: ['off', 4],
        'no-tabs': 'off',
        'no-debugger': 'off',
        'space-before-function-paren': ['error', 'always'],
        'no-case-declarations': 0,
        allowEmptyReject: 0
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ]
}
