module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'no-use-before-define': 'off',
    'no-unused-vars': 0,
    'no-underscore-dangle': 0,
    quotes: 0,
    'no-restricted-syntax': 0,
    'consistent-return': 'off',
  },
};
