module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'arrow-parens': 'off',
    'space-before-function-paren': 'off',
    'handle-callback-err': 'off',
    'template-curly-spacing': ['off']
  }
}
