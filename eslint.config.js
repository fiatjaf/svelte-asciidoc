import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'

export default [
  js.configs.recommended,
  ...tseslint.configs['recommended'],
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte']
      }
    },
    rules: {
      semi: ['warn', 'never'],
      quotes: ['error', 'single'],
      'dot-location': ['warn', 'property'],
      'guard-for-in': ['warn'],
      'no-multi-spaces': ['warn'],
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
  },
  {
    ignores: ['.svelte-kit/**', 'dist/**']
  }
]
