/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
      },
      colors: {
        primary: "#10B982",
        secondary: "#EBEEF3",
        white: "#FFFFFF",
        black: "#000000",
        "dark-green": "#059669",
      },
    },
  },
  plugins: [],
};
