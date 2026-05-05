/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.{html,js}", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'accent': '#4A6FA5',
        'graphite': '#1A1A1A',
        'stone-light': '#F5F5F4',
      }
    },
  },
}