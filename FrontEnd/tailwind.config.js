/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'], // Ensure you include all relevant file types
  theme: {
    extend: {
      colors: {
        primary: '#007BFF', // Custom primary color
        jetBlack: '#1C1C1E',
        whiteText: '#FFFFFF',
        grayText: '#333333',
      },
      fontFamily: {
        sans: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')({ nocompatible: true }), // For newer versions, remove compatibility mode
  ],
}
