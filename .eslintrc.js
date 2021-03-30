module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: ['prettier', 'plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-new': 'off',
    'no-tabs': 'off',
    'space-before-function-paren': 'off',
    'no-extend-native': 'off',
    eqeqeq: 'off',
    'no-useless-escape': 'off',
    'no-extend-native': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
