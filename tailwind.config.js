/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Perhatikan 'Montserrat' di sini, sesuai dengan nama font
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}