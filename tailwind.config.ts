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
          primary: 'green',
          secondary: 'teal',
          'base-content': colors.gray['900'],
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: 'green',
          'primary-content': colors.white,
          secondary: 'teal',
          'base-content': colors.gray['200'],
        },
      },
    ],
    logs: false,
  },
  plugins: [require('tailwind-scrollbar'), require('daisyui'), require('@tailwindcss/typography')],
};
export default config;
