# React + Vite

### Tailwind Setup Commands

```
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}

Add the following to your CSS file (e.g., ./src/input.css):

@tailwind base;
@tailwind components;
@tailwind utilities;

npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```
