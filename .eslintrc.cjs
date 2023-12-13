/* eslint-env node */
// general rules that are shared amongst all packages/projects
// add rule overrides sparingly with clear necessity
module.exports = {
  env: {
    es6: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-newline': ['off'],
    'max-len': [
      'error',
      { code: 120, tabWidth: 4, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreComments: true },
    ],
    'no-console': 'off',
    'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
    'consistent-return': 'warn',
    'no-tabs': 0,
    indent: ['error', 4, { ignoredNodes: ['ConditionalExpression', 'PropertyDefinition'] }],
    'import/extensions': ['error', 'ignorePackages', { js: 'always', mjs: 'always' }],
    camelcase: 'warn',
    'no-nested-ternary': 0,
    'keyword-spacing': ['error', { after: true }],
  },
  ignorePatterns: ['**/*.d.ts'],
};
