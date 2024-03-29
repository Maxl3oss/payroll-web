/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        blue: {
          main: "#2149c2"
        },
        orange: {
          main: "#E95420"
        }
      }
    },
  },
  plugins: [],
}