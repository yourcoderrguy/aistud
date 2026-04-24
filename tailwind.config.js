/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update this to include the src folder where all your screens and components live
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // We can drop your custom AiStud UI colors here later
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