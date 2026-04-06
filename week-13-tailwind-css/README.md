# React + Vite + Tailwind CSS

This project uses **Vite** for the development environment and **Tailwind CSS** for utility-first styling. Follow the steps below to set up or verify the styling configuration.

---

## 🔥 Modern Setup (Tailwind CSS v4.0)

Tailwind v4.0 is designed to be faster and features a CSS-first configuration, moving logic from JavaScript into your stylesheets.

### 1. Installation

Install the core engine and the dedicated Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

### 2. Configure Vite

Add the Tailwind plugin to your vite.config.ts or vite.config.js:

```JavaScript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

### 3. Usage & Theming

In your main CSS file (e.g., src/index.css), import Tailwind and use the @theme block for customizations. No tailwind.config.js is required!

```CSS
@import "tailwindcss";

@theme {
  /* Overwrite an existing color */
  --color-blue-500: #0ea5e9;

  /* Add a brand new color */
  --color-brand: #3b82f6;

  /* Custom variables are automatically available as utility classes (e.g., bg-midnight) */
  --color-midnight: #0f172a;
}
```

### Run

```bash
npm run dev
```

---

## 🚀 Installation & Setup (Tailwind CSS v3.x)

### 1. Install Dependencies

Install Tailwind CSS and its peer dependencies via npm. We use `postcss` and `autoprefixer` to ensure cross-browser compatibility.

### 1. Install Dependencies

Install Tailwind CSS and its peer dependencies via npm. We use `postcss` and `autoprefixer` to ensure cross-browser compatibility.

```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

### 2. Initialize Configuration

Generate the tailwind.config.js and postcss.config.js files in your root directory.

```bash
npx tailwindcss init -p
```

### 3. Configure Template Paths

Update the content array in tailwind.config.js. This tells Tailwind which files to scan for class names to keep the production bundle small.

```JavaScript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all React component files
  ],
  theme: {
    extend: {}, // Add custom themes, colors, or fonts here
  },
  plugins: [],
}
```

### 4. Add Tailwind Directives

Add the @tailwind directives to your global CSS file (e.g., ./src/index.css). These inject Tailwind's styles into your project.

```CSS
/* Base styles and resets */
@tailwind base;
/* Component classes (like .btn or .card) */
@tailwind components;
/* Utility classes (like .flex or .text-center) */
@tailwind utilities;
```

### 5. Import CSS

Ensure your CSS file is imported in your main entry point (usually src/main.jsx or src/main.tsx).

```JavaScript
import './index.css'
```

## 🛠️ Development

### Running the Project

Since this is a Vite project, you don't need to run a separate Tailwind watch command. The PostCSS plugin handles it automatically.

```Bash
npm run dev
```

### Manual Build (Optional)

If you need to generate a standalone CSS file without using Vite's build pipeline:

```Bash
npx tailwindcss -i ./src/index.css -o ./src/output.css --watch
```

### Summary (v3.x)

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

@tailwind base;
@tailwind components;
@tailwind utilities;

npx tailwindcss -i ./src/index.css -o ./src/output.css --watch
```
