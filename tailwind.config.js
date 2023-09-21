/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      colors: {
        yellow: "#FFCB05",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
