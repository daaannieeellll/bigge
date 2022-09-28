const { url } = require("inspector");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "big-pattern": url("/img/bg.svg"),
      },
      backgroundSize: {
        80: "80vh",
      },
      fontFamily: {
        oswald: ["Oswald"],
        providence: ["Providence"],
      },
    },
  },
  plugins: [],
};
