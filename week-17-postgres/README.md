# Week 17: PostgreSQL & Node.js Integration

This guide provides a quick reference for setting up a Node.js project with TypeScript and connecting it to a PostgreSQL database using the `pg` library. It covers project initialization, dependency installation, and basic configuration.

---

## 🚀 Quick Setup Guide

Follow these steps to initialize your project from scratch.

### 1. Project Initialization

Start by initializing a new Node.js project. This creates your `package.json` file.

```bash
npm init -y
```

### 2. TypeScript Configuration

Install TypeScript as a development dependency and initialize the configuration file (`tsconfig.json`).

```bash
npm install -D typescript
npx tsc --init
```

_Make sure to update your `tsconfig.json` to include `"rootDir": "./src"` and `"outDir": "./dist"`._

### 3. PostgreSQL Database Client

Install the `pg` (node-postgres) library to interact with your PostgreSQL database, along with its TypeScript definitions.

```bash
npm install pg
npm install -D @types/pg
```

### 4. Express Framework (Optional but common)

If you are building an API, install Express and its types.

```bash
npm install express
npm install -D @types/express
```

### 5. Environment Variables

Install `dotenv` to securely manage your database connection strings and other sensitive data.

```bash
npm install dotenv
```

---

## ⚙️ Project Configuration

### Setting up ESM (ECMAScript Modules)

To use modern `import/export` syntax and top-level `await`, add the following to your `package.json`:

```json
{
  "type": "module"
}
```

### Adding a Development Script

To easily compile and run your TypeScript code, add this script to your `package.json` under the `"scripts"` section:

```json
"scripts": {
  "dev": "npx tsc -b && node dist/index.js"
}
```

You can now run your project using:

```bash
npm run dev
```

### Loading Environment Variables

At the very top of your entry file (e.g., `src/index.ts`), import `dotenv` to load variables from your `.env` file before executing any other code:

```typescript
import "dotenv/config";
```

---

## 📁 Directory Structure

After running the commands above, create your source directory and entry point:

```bash
mkdir src
touch src/index.ts
```

Your basic project structure should look like this:

```text
.
├── node_modules/
├── src/
│   └── index.ts
├── .env
├── package.json
├── package-lock.json
└── tsconfig.json
```

### Summary

```bash
npm init -y

npm install typescript

npx tsc --init

npm install pg
npm install -D @types/pg

create src/index.ts

"dev": "npx tsc -b && node dist/index.js",
npm run dev

npm install express
npm install -D @types/express

"type": "module",

npm install dotenv
import "dotenv/config";
```
