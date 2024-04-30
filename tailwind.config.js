const { transform } = require('next/dist/build/swc');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#caa776',
        primary: '#301c11',
        secondary: '#a88b70',
        'knight-white': '#fcdfd0',
      },
      fontFamily: {
        title: ['var(--font-glockenspiel)'],
        main: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
