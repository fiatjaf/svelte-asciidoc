export default {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    es6: true,
    browser: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'babel'],
  extends: ['prettier', 'plugin:svelte/recommended'],
  overrides: [
    {
      files: ['**/*.svelte'],
      parser: 'svelte-eslint-parser'
    }
  ],
  rules: {
    semi: ['warn', 'never'],
    quotes: ['error', 'single'],
    'dot-location': ['warn', 'property'],
    'guard-for-in': ['warn'],
    'no-multi-spaces': ['warn'],
    yoda: ['warn', 'never'],
    camelcase: ['error'],
    'comma-style': ['warn'],
    'block-spacing': ['warn'],
    'keyword-spacing': ['warn'],
    'no-trailing-spaces': ['warn'],
    'no-unneeded-ternary': ['warn'],
    'no-whitespace-before-property': ['warn'],
    'space-before-blocks': ['warn'],
    'space-in-parens': ['warn'],
    'arrow-spacing': ['warn'],
    'no-duplicate-imports': ['error'],
    'no-var': ['error'],
    'prefer-const': ['warn'],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ]
  }
}
