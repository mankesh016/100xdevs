## 🚀 Quick Setup Guide: Next.js + Prisma

This guide outlines the modern approach to setting up Prisma within a Next.js App Router project, including the use of `@prisma/adapter-pg` for optimized serverless/edge compatibility.

### 1. Install Dependencies

Install Prisma CLI and TypeScript utilities as development dependencies:

```bash
npm install prisma tsx @types/pg --save-dev
```

Install the Prisma Client, the PostgreSQL adapter, and necessary drivers as production dependencies:

```bash
npm install @prisma/client @prisma/adapter-pg dotenv pg
```

### 2. Initialize Prisma

Initialize Prisma. The `--output` flag here specifically directs the generated client to a custom directory (useful in monorepos or specific architectural setups):

```bash
npx prisma init --output ../app/generated/prisma
```

### 3. Configure Database Connection

Open the generated `.env` file and add your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name?schema=public"
```

### 4. Define Your Schema

Open the generated `schema.prisma` file and define your data models. Example:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

### 5. Run Migrations & Generate Client

Apply the schema to your database (creates the tables):

```bash
npx prisma migrate dev --name init
```

Generate the Prisma Client based on your schema:

```bash
npx prisma generate
```

_(Optional: Set up a seed script here if you want to populate your database with initial data)._

---

## 🛠️ The Singleton Pattern for Next.js

In Next.js development mode, Hot Module Replacement (HMR) reloads your files frequently. If you initialize the Prisma Client directly in your route handlers, it will create a new database connection on every save, quickly exhausting your connection limit.

To prevent this, we use a **Singleton Pattern** to ensure only one instance of the Prisma Client is created during development.

### 1. Create the Database Client File

Create a new file at `lib/prisma.ts`:

```bash
mkdir -p lib && touch lib/prisma.ts
```

### 2. Implement the Singleton

Add the following code to `lib/prisma.ts`. This configuration also uses the `@prisma/adapter-pg` which is highly recommended for modern Next.js deployments.

```typescript
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg"; // Ensure you have pg imported if needed by adapter

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// Assuming process.env.DATABASE_URL is set
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

---

## 💻 Usage in Next.js Server Components

Because Next.js defaults to Server Components, you can fetch data directly from the database without needing to create a separate API route.

```tsx
import prisma from "@/lib/prisma";

export default async function Home() {
  // Fetch users directly on the server
  const users = await prisma.user.findMany();

  return (
    <main>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </main>
  );
}
```
