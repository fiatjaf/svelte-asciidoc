import js from '@eslint/js'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'

export default [
  js.configs.recommended,
  ...tseslint.configs['recommended'],
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {...globals.node, ...globals.browser},
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        extraFileExtensions: ['.svelte']
      }
    }
  },
  {
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
      ],
      'svelte/no-at-html-tags': ['off'],
      '@typescript-eslint/no-explicit-any': ['off']
    }
  },
  {
    ignores: ['.svelte-kit/**', 'dist/**']
  }
]
