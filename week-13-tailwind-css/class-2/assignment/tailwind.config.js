/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        blue: {
          700: "#002d58",
          500: "#18416a",
          300: "#8194aa",
        },
        green: {
          300: "#39c7c0",
          500: "#0c6a7c",
        },
      },
    },
  },
  plugins: [],
};
