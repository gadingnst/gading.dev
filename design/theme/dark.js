/* eslint-disable @typescript-eslint/no-var-requires */
const baseTheme = require('./base');

const darkTheme = {
  dark: {
    ...baseTheme,
    'base-100': '#0e263a',
    'base-200': '#0f2d44',
    'base-300': '#282f5e',
    'base-content': '#ffffff',
    '.header-primary': {
      backgroundColor: '#282f5e',
      color: '#ffffff'
    }
  }
};

module.exports = darkTheme;
