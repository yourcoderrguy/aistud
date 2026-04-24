/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#008080', 
          dark: '#1A202C'
        }
      }
    },
  },
  plugins: [],
}