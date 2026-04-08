# Typescript

# 🛠️ TypeScript Node.js Setup

A minimal, production-ready TypeScript configuration for modern Node.js applications using ES Modules.

## 🚀 Quick Start

### 1. Initialize Project

Create a new Node.js project and install development dependencies:

```bash
npm init -y
npm install --save-dev typescript @types/node
```

### 2. Configure ESM Support

Update `package.json`, commonjs => ES Modules

```json
{
  "type": "module"
}
```

### 3. Initialize TypeScript Configuration

Generate a `tsconfig.json` file to manage the compiler settings.

```bash
npx tsc --init
```

**Recommended `tsconfig.json` updates:**

- `"rootDir": "./src"` — Where your `.ts` files live.
- `"outDir": "./dist"` — Where the compiled `.js` files will be generated.
- `"strict": true` — Enables type-safety (highly recommended for complex logic).
- `"target": "ESNext"` — To use the latest JavaScript features.

---

## Development Workflow

### Manual Build & Run

Compile your code to JavaScript and run it using Node:

```bash
npx tsc

node dist/index.js
```

### Watch Mode

Automatically recompile files whenever you save a change. This is essential for a smooth dev experience:

```bash
npx tsc -w
```

### 📜 Scripts

Add the following scripts to `package.json` to build and run with one command:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "tsc && node dist/index.js"
}
```

_Run it using: `npm run dev`_

### Summary

```
npm init -y
npm install --save-dev typescript @types/node

type: "module";

npx tsc --init
"rootDir": "./src"
"outDir": "./dist"
"strict": true

mkdir src && touch src/index.ts

build: npx tsc
start: node dist/index.js
"dev": "npx tsc && node dist/index.js"

npx tsc -w
```
