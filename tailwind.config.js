/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: true,
  },
  fontFamily: {
    sans: ["sans-serif"],
    serif: ["serif"],
  },
  plugins: [require("@tailwindcss/forms")],
};
