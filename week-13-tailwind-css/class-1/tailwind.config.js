/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        red: {
          500: "yellow",
        },
      },
    },
  },
  plugins: [],
};
