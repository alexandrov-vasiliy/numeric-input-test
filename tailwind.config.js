/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#CFCADF',
        'primary': '#3D06D7',
        'dark': '#1E0E4C',
        'primary-light': '#906FEE'
      },
      fontFamily: {
        'koulen': ['Koulen', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
