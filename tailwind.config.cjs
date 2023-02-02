/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      base: ['Inter', 'sans-serif'],
      alt: ['"Aeonik Fono"', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
