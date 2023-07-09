const baseTheme = {
  'primary': '#5e72e4',
  'primary-content': '#ffffff',
  'secondary': '#ff50a5',
  'secondary-content': '#ffffff',
  'accent': '#b89bff',
  'accent-content': '#ffffff',
  'info': '#11cdef',
  'info-content': '#ffffff',
  'success': '#2dce89',
  'success-content': '#ffffff',
  'warning': '#fb6340',
  'warning-content': '#ffffff',
  'error': '#f5365c',
  'error-content': '#ffffff',
  'neutral': '#a1a1a3'
};

/**
 * @see https://daisyui.com/docs/config/
 */
module.exports = {
  themes: [
    {
      light: {
        ...baseTheme,
        'base-100': '#ffffff',
        'base-200': '#f7f9fC',
        'base-300': '#e6e8ee',
        'base-content': '#313764'
      }
    },
    {
      dark: {
        ...baseTheme,
        'base-100': '#0e263a',
        'base-200': '#0f2d44',
        'base-300': '#282f5e',
        'base-content': '#ffffff'
      }
    }
  ],
  prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  base: true, // applies background color and foreground color for root element by default
  styled: true, // include daisyUI colors and design decisions for all components
  utils: true, // adds responsive and modifier utility classes
  rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
  logs: false // Shows info about daisyUI version and used config in the console when building your CSS
};
