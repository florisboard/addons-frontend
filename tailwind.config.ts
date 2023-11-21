import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/*/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-custom)', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
