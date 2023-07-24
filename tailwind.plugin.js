/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');

const stylePlugins = plugin(({ addUtilities, theme }) => {
  addUtilities({
    '.base-container': {
      width: theme('width.full'),
      maxWidth: theme('maxWidth.6xl'),
      paddingLeft: theme('spacing.4'),
      paddingRight: theme('spacing.4'),
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    '.text-shadow': {
      textShadow: '2px 2px 15px #000'
    },
    '.text-shadow-white': {
      textShadow: '2px 2px 15px #FFF'
    },
    '.text-shadow-none': {
      textShadow: 'none'
    }
  });
});

module.exports = stylePlugins;
