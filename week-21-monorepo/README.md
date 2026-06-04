# Week 21: Monorepos and Turborepo

This section covers the architecture and tooling required to build scalable applications using **Monorepos**. We explore the differences between standard repositories and monorepos, understand how build orchestrators work, and use **Turborepo** to structure a full-stack chat application featuring Next.js, Express, and WebSockets.

---

## 🏗️ Part 1: Monorepo Fundamentals

### What is a Monorepo?

A **Monorepo** (Monolithic Repository) is an architectural concept where multiple projects (e.g., frontend, backend, shared UI components, infrastructure code) are housed inside a single version-controlled repository.

**When should you use a Monorepo?**
You should transition to a monorepo when your frontend and backend:

1. **Share Code:** You want to reuse TypeScript interfaces, Zod schemas, or UI components.
2. **Require Enhanced Collaboration:** It becomes easier for full-stack developers to work across the stack in one unified workspace.
3. **Need Centralized Tooling:** Managing build tools, ESLint, and Prettier is simpler because you maintain a single configuration set for the entire project.

_Note: If your frontend and backend are completely decoupled and share no code (e.g., React frontend and a GoLang backend), separate repositories are perfectly fine._

### Build Systems vs. Build System Orchestrators

- **Build Systems:** Tools that transform source code into executable code (e.g., `tsc` for TypeScript, `gcc` for C++, `Vite`/`Next.js` for React).
- **Build System Orchestrators:** Tools like **Turborepo** do not compile code themselves. Instead, they act as traffic directors, telling the system _when_ to build _what_, and executing the underlying build systems efficiently.

### Why Turborepo?

Turborepo is a high-performance build system orchestrator built on top of workspaces (npm, pnpm, or yarn).

1. **Aggressive Caching:** It caches the output of tasks. If you build a project once, the second build will complete in milliseconds by fetching the result from the cache.
2. **Parallelization:** It runs independent tasks concurrently across all available CPU cores.
3. **Dependency Graph Awareness (DAG):** It analyzes your workspace to build a Directed Acyclic Graph (DAG), ensuring tasks are executed in the optimal order based on their dependencies.

---

## 🚀 Part 2: Initializing a Turborepo

To bootstrap a new Turborepo, use the official CLI. (Using `pnpm` is highly recommended for disk space efficiency).

```bash
npx create-turbo@latest my-turborepo

```

### Standard Folder Structure

Turborepo relies on your package manager's "Workspaces" feature. It divides your code into two main directories:

- **`apps/`**: Contains the runnable end-user applications (e.g., `web` for Next.js, `api` for Node.js).
- **`packages/`**: Contains shared code and configurations that the apps depend on (e.g., `ui`, `eslint-config`, `typescript-config`).

---

## 💻 Part 3: Building a Full-Stack Architecture

Let's structure a Monorepo containing a Next.js frontend, an Express HTTP server, and a Node.js WebSocket server.

### 1. Creating Shared UI Components

Inside `packages/ui/src/button.tsx`, you can create a generic Button component.
Ensure the `packages/ui/package.json` exports this file properly.

In your Next.js app (`apps/web`), you can easily import it:

```tsx
// Notice the custom package name defined in the monorepo
import { Button } from "@repo/ui/button";
```

### 2. Backend Setup (HTTP & WebSockets)

Create two new folders inside `apps/`: `http-server` and `ws-server`.
Navigate into each and initialize a Node/TypeScript project:

```bash
npm init -y
npx tsc --init

```

- **Install dependencies:** \* HTTP: `npm i express @types/express`
- WS: `npm i ws @types/ws`

### 3. Shared TypeScript Configuration

Instead of duplicating `tsconfig.json` rules, use the shared config located at `packages/typescript-config/backend.json`.

In your backend's `tsconfig.json`, simply extend the shared configuration:

```json
{
  "extends": "@repo/typescript-config/backend.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

_(Note: Always explicitly declare `rootDir` and `outDir` in the local `tsconfig.json` to prevent path confusion relative to the shared package)._

---

## ⚙️ Part 4: Turborepo Configuration (`turbo.json`)

The `turbo.json` file at the root of your project is the brain of Turborepo. It defines the pipeline, task dependencies, and caching rules.

### Configuring the Pipeline

Because we are running standard Node.js backends alongside Next.js, we must update the caching outputs. Node uses `dist/`, while Next.js uses `.next/`.

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [
        ".next/**", // Cache Next.js build
        "!.next/cache/**", // Do NOT cache Next.js internal cache
        "dist/**" // Cache Node.js/TypeScript builds
      ]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Cache Invalidation (`inputs`)

You can tell Turborepo exactly when it needs to invalidate the cache and rebuild everything.

```json
{
  "tasks": {
    "build": {
      "inputs": ["$TURBO_DEFAULT$", ".env", ".env.local"]
    }
  }
}
```

_If anything in the default source code or the environment variable files changes, Turborepo will discard the cache and trigger a fresh build._

### Workspace-Specific Configuration

If an individual app requires unique build steps, you can create a localized `turbo.json` inside that specific app's folder to override the global configuration:

```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```
