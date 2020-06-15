module.exports = {
  extends: ['metarhia', 'prettier'],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    strict: 0,
  },
};
