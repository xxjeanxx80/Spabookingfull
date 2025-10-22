/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f472b6',
        secondary: '#34d399',
        accent: '#60a5fa',
        dark: '#111827',
      },
    },
  },
  plugins: [],
};
