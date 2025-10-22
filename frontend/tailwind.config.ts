import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#f97316'
      }
    }
  },
  plugins: []
};

export default config;
