import fs from 'fs';
import webpack from './webpack.config';

const arrayMapping = Object.keys(webpack.resolve.alias).map(alias => ([
  [alias, webpack.resolve.alias[alias]]
]));

const eslintRC = {
  parser: 'babel-eslint',
  plugins: ['react', 'import'],
  rules: {
    'max-len': ['error', 120, 2, { ignoreComments: true, ignoreStrings: true }],
    'react/prop-types': [2],
    'comma-dangle': ['error', 'never'],
    'linebreak-style': [0],
    'import/prefer-default-export': [0],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', '**/*.spec.js', '**/*/stories/**/*.js'] }],
    'class-methods-use-this': [
      1,
      {
        exceptMethods: [
          'render'
        ]
      }
    ]
  },
  settings: {
    'import/extensions': ['error', 'ignorePackages'],
    'import/resolver': {
      alias: {
        map: arrayMapping,
        extensions: ['.ts', '.js', '.jsx', '.json']
      },
      webpack: {
        config: './webpack.config.js'
      }
    },
    react: {
      version: 'detect'
    },
    'babel-module': {}
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  env: {
    browser: true,
    node: true,
    jasmine: true
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  }
};


function updateEslintRC() {
  fs.writeFile('.eslintrc', JSON.stringify(eslintRC), 'utf8', () => null);
}

updateEslintRC();
