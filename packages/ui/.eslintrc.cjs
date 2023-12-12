module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  extends: ['airbnb-base', 'plugin:vue/vue3-recommended'],
  overrides: [
    {
      files: ['**/*.{js,mjs,jsx,ts,tsx,vue}'],
    },
  ],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'import/extensions': ['error', 'ignorePackages', { js: 'always', mjs: 'always', ts: 'never' }],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/vite.config.ts', '**/cypress.config.ts'] }],
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
    'max-len': [
      'error',
      { code: 120, tabWidth: 2, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreComments: true },
    ],
    'no-nested-ternary': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'vue/no-reserved-component-names': 1,
    'vue/multi-word-component-names': 0,
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: ['optionLabel', 'activatorText'],
      },
    ],
    'vue/html-closing-bracket-newline': 0,
    'vue/max-attributes-per-line': 0,
    'vue/singleline-html-element-content-newline': 0,
    'keyword-spacing': ['error', { after: true }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
