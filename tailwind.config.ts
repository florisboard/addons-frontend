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
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: 'green',
          secondary: 'teal',
          'base-content': colors.gray['900'],
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: 'green',
          secondary: 'teal',
          'base-content': colors.gray['200'],
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
export default config;
