/** @see https://tailwindcss.com/docs/configuration */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/packages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,jsx,ts,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './contents/**/*.{md,mdx}'
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui'],
      courgette: ['var(--font-courgette)', 'cursive']
    },
    extend: {
      keyframes: require('./design/keyframes'),
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: [
    require('daisyui'),
    require('./design/tailwind.custom')
  ],
  daisyui: require('./daisy.config')
};
