/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig } */
module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/contents/**/*.{md,mdx}'
  ],
  safelist: [
    {
      pattern:
        /^(bg)-(black|white|transparent|primary|accent|secondary|success|info|warning|danger|light|dark)/
    }
  ],
  theme: {
    fontFamily: {
      courgette: ['"Courgette"', 'cursive'],
      poppins: ['"Poppins"', 'sans-serif']
    },
    screens: {
      '2xs': '360px',
      xs: '428px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    container: {
      screens: {
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      }
    },
    width: {
      0: 0,
      10: '10%',
      25: '25%',
      50: '50%',
      75: '70%',
      full: '100%',
      screen: '100vw'
    },
    height: {
      0: 0,
      10: '10%',
      25: '25%',
      50: '50%',
      75: '70%',
      full: '100%',
      screen: '100vh'
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#FFFFFF',
      primary: {
        1: '#5E72E4',
        2: '#B89BFF',
        DEFAULT: '#5E72E4'
      },
      accent: {
        1: '#FF50A5',
        2: '#F3A4B5',
        DEFAULT: '#FF50A5'
      },
      success: {
        1: '#2DCE89',
        2: '#A0FFCF',
        DEFAULT: '#2DCE89'
      },
      info: {
        1: '#11CDEF',
        2: '#4ADEDE',
        DEFAULT: '#11CDEF'
      },
      warning: {
        1: '#FB6340',
        2: '#FDC094',
        DEFAULT: '#FB6340'
      },
      danger: {
        1: '#F5365C',
        2: '#FE676E',
        DEFAULT: '#F5365C'
      },
      light: {
        10: '#666B71',
        20: '#A1A1A3',
        30: '#CACBCF',
        40: '#E6E8EE',
        50: '#EAEAEA',
        60: '#F1F1F1',
        70: '#F7F9FC',
        DEFAULT: '#666B71'
      },
      dark: {
        10: '#0B2032',
        20: '#0E263A',
        30: '#0F2D44',
        40: '#113754',
        50: '#23395D',
        60: '#282F5E',
        70: '#313764',
        DEFAULT: '#0C1F30'
      }
    },
    spacing: {
      0: 0,
      2: '2px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      36: '36px',
      40: '40px',
      44: '44px',
      48: '48px',
      52: '52px',
      56: '56px',
      60: '60px',
      64: '64px',
      68: '68px',
      72: '72px',
      76: '76px',
      80: '80px',
      84: '84px',
      88: '88px',
      92: '92px',
      96: '96px',
      100: '100px'
    },
    borderRadius: {
      0: 0,
      2: '2px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      full: '50%'
    },
    extend: {
      boxShadow: {
        'md-bottom': '0 2px 4px 0 rgba(0, 0, 0, 0.1)'
      },
      colors: {
        'github': '#222222',
        'linkedin': '#0073b1',
        'instagram': '#e4405f',
        'facebook': '#3b5999',
        'twitter': '#1da1f2',
        'tumblr': '#37455c',
        'whatsapp': '#06d755',
        'telegram': '#35ace1',
        'youtube': '#cd201f',
        'steam': '#2a475e'
      },
      keyframes: {
        'scale': {
          '0%': {
            opacity: 0,
            transform: 'scale(0.8)'
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        },
        'y-t-25': {
          from: {
            opacity: 0,
            transform: 'translate(0, -25px)'
          },
          to: {
            opacity: 1,
            transform: 'translate(0)'
          }
        },
        'y-b-25': {
          from: {
            opacity: 0,
            transform: 'translate(0, 25px)'
          },
          to: {
            opacity: 1,
            transform: 'translate(0)'
          }
        }
      }
    }
  },
  variants: {
    extend: {
      margin: ['hover']
    }
  },
  plugins: []
};
