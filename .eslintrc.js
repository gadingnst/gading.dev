module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    semi: ['error', 'always'],
    'no-console': 'warn',
    'arrow-parens': 'off',
    'space-before-function-paren': 'off',
    'handle-callback-err': 'off',
    'template-curly-spacing': 'off',
    'vue/multi-word-component-names': 'off'
  }
};
