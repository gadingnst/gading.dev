/* eslint-disable @typescript-eslint/no-var-requires */
const baseTheme = require('./base');

const lightTheme = {
  light: {
    ...baseTheme,
    'base-100': '#ffffff',
    'base-200': '#f7f9fC',
    'base-300': '#e6e8ee',
    'base-content': '#313764',
    '.header-primary': {
      backgroundColor: baseTheme.primary,
      color: '#ffffff'
    }
  }
};

module.exports = lightTheme;
