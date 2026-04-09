/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx, js, jsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#d8d7ff",
          300: "#e2e7fe",
          500: "#7175b5",
          700: "#534ee3",
        },
      },
    },
  },
  plugins: [],
};
