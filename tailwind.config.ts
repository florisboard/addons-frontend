import type { Config } from 'tailwindcss';

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
  plugins: [require('daisyui')],
};
export default config;
