/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merged: ["Airstrike", "sans-serif"],
      },
      screens: {
        "3xl": "2300px",
      },
    },
  },
  plugins: [],
};

module.exports = config;
