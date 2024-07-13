import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./src/*/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--primary-font)', 'sans-serif'],
        display: ['var(--display-font)', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          'primary-content': colors.white,
          error: colors.red['600'],
          primary: colors.green['700'],
          secondary: colors.orange['600'],
          'base-content': colors.gray['900'],
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: colors.green['700'],
          'primary-content': colors.white,
          error: colors.red['600'],
          secondary: colors.orange['600'],
          'secondary-content': colors.white,
          'base-content': colors.gray['200'],
        },
      },
    ],
    logs: false,
  },
  plugins: [require('tailwind-scrollbar'), require('daisyui'), require('@tailwindcss/typography')],
};
export default config;
