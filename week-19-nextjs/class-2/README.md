# Week 19: Full-Stack Next.js (App Router & Prisma Integration)

This week marks a major paradigm shift as we move from standard React Client-Side Rendering (CSR) into the world of **Next.js Server-Side Rendering (SSR)**. We explore the architectural differences, fix React's SEO and Waterfalling issues, and learn how to write backend API routes and direct database calls right alongside our frontend components.

---

## 🛑 The Shortcomings of React (CSR)

React is an incredible UI library, but it has notable disadvantages for production web applications:

1. **Separate Frontend and Backend:** You must maintain a separate Node.js/Express backend for APIs.
2. **No Built-in Routing:** Reliance on external libraries like `react-router-dom`.
3. **Poor SEO:** Crawlers receive an empty HTML file initially, relying on JS to render content.
4. **The Waterfalling Problem:** Resources load sequentially. HTML loads JS $\rightarrow$ JS triggers API call $\rightarrow$ API returns Data $\rightarrow$ Component finally renders.

---

## 🚀 What Next.js Offers

Next.js is a full-stack framework built on top of React that natively solves these issues.

- **Server-Side Rendering (SSR):** The very first request returns a fully populated HTML document, eliminating the waterfall effect and drastically improving initial load times and SEO.
- **API Routes:** Write backend logic (JSON endpoints) in the same repository.
- **File-Based Routing:** Creating a file or folder automatically creates a route.
- **No CORS Issues:** Since the frontend and backend share the same domain, cross-origin resource sharing (CORS) configurations are unnecessary.

### React vs. Next.js Architecture

| Feature     | React (Client-Side Rendering)               | Next.js (Server-Side Rendering)       |
| ----------- | ------------------------------------------- | ------------------------------------- |
| **Hosting** | Deployed on CDNs / S3 (Static).             | Deployed on Vercel, EC2, or Node VMs. |
| **Routing** | Handled by Javascript (`react-router-dom`). | Handled natively via the file system. |
| **Backend** | Requires an external Express server.        | Features native backend API routes.   |

---

## ⚡ Server Components vs. Client Components

In the Next.js App Router, **every component is a Server Component by default.**

### Server Components

They run on the server. You can write `async/await` directly in the component to fetch data. The console logs print to the server terminal, not the browser console.

```tsx
// This runs on the server!
export default async function User() {
  const response = await axios.get("https://api.example.com/user");
  return <div>{response.data.name}</div>;
}
```

### Client Components

If you need interactivity (e.g., `onClick`), or React Hooks (`useState`, `useRef`, `useEffect`), you **must** convert it to a client component by adding `"use client"` at the top of the file.

```tsx
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

---

## 🧩 Core Next.js Routing & Layouts

### 1. File-Based Routing

In the `app/` directory, folders define the route path, and `page.tsx` defines the UI.

- `app/page.tsx` $\rightarrow$ `localhost:3000/`
- `app/users/page.tsx` $\rightarrow$ `localhost:3000/users`

### 2. Loading States (`loading.tsx`)

In Next.js, if an async Server Component is fetching data, the request will hang until the data resolves. To fix this, create a `loading.tsx` file next to your `page.tsx`. Next.js will automatically render this fallback UI while the page is awaiting data.

### 3. Layouts (`layout.tsx`)

Layouts wrap pages and persist across routes (perfect for Navbars or Footers).

---

## 🔌 API Routes (The Backend)

You can build JSON endpoints directly in Next.js using `route.ts` files.

- **Path:** `app/api/v1/signup/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  // e.g., await prisma.user.create({ data });
  return NextResponse.json({ message: "User Registered Successfully." });
}
```

---

## 🗄️ Prisma Setup in Next.js

Next.js allows you to bypass API routes entirely for data fetching if you want. You can use Prisma to query your database _directly_ from a Server Component.

### 1. Installation

Install Prisma and the necessary PostgreSQL adapters:

```bash
npm install prisma tsx @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg dotenv pg

```

### 2. Initialization & Generation

Initialize Prisma, pointing the output to a custom directory inside the app router.

```bash
npx prisma init --output ../app/generated/prisma

```

_(Define your schema and `DATABASE_URL` in `.env`)_

```bash
# Push schema to DB
npx prisma migrate dev --name init

# Generate Client
npx prisma generate

```

### 3. The Singleton Pattern (Critical for Dev Mode)

When running Next.js in development (`npm run dev`), Hot Module Replacement (HMR) re-compiles files on every save. If you instantiate Prisma normally, it will create hundreds of database connections and crash your DB.

**Solution:** Create a Singleton instance at `lib/prisma.ts`.

```typescript
// lib/prisma.ts
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Initialize the Postgres adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

### 4. Direct Database Access in Components

Because Server Components execute securely on the server, you can import this Singleton and query the database directly during the render cycle.

```tsx
// app/page.tsx
import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  );
}
```

---

## 🔗 Resources & Class Notes

- **Class 0 (NextJS Client Side):** [Slide Deck](https://projects.100xdevs.com/tracks/nextjs-1/next-1)
- **Class 1 (NextJS Server Side):** [Slide Deck](https://projects.100xdevs.com/tracks/nextjs-2/next-2-1)
- **Official Docs:** [Prisma with Next.js](https://www.prisma.io/docs/guides/frameworks/nextjs)
