/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#C6414C'
      },
      fontFamily: {
        'main': ['DM Sans', 'sans-serif'],
        'second': ['Raleway', 'sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
}

