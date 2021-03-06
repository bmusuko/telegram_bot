module.exports = {
    "env": {
      "es6": true,
      "node": true
    },
    "extends": [
        'prettier',
    ],
    "plugins": [
        'prettier'
    ],
    "parser": "@typescript-eslint/parser",
    'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
      'ecmaVersion': 12,
      'sourceType': 'module'
    },
    'rules': {
      'prettier/prettier': 'error',
      'class-methods-use-this': 'off',
      'no-param-reassign': 'off',
      'camelcase': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }]
    }
};