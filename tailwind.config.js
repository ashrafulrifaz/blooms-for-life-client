/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF4F5A',
        'second': '#EE656D'
      },
      fontFamily: {
        'main': ['DM Sans', 'sans-serif'],
        'second': ['Raleway', 'sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
}

