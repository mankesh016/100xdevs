# Week 18.1: Prisma and ORMs

This section covers the transition from writing raw SQL queries to using an **ORM (Object Relational Mapping)** tool. We explore why ORMs are essential in modern backend development and dive deep into **Prisma**, a next-generation ORM for Node.js and TypeScript.

---

## 📖 Context: What is an ORM?

An **ORM (Object Relational Mapping)** is a tool that abstracts the complexities of the underlying database into simpler, more easily managed objects within your code. It allows you to interact with your database using your preferred programming language (like JavaScript/TypeScript) without worrying about the underlying syntax (like raw SQL).

### Examples of Database Interaction

| Tool/Database               | Query Syntax                                       |
| --------------------------- | -------------------------------------------------- |
| **MongoDB (Mongoose)**      | `users.findOne({ userId: 1 })`                     |
| **PostgreSQL (pg library)** | `SELECT * FROM users WHERE userId=1`               |
| **Postgres (Prisma ORM)**   | `prisma.users.findFirst({ where: { userId: 1 } })` |

---

## ❓ Why Use ORMs?

1. **Simpler Syntax:** Converts JavaScript objects to SQL queries under the hood. Instead of writing raw SQL strings (`SELECT * FROM users WHERE email=$1`), you can simply write `users.find({ email: "alice@gmail.com" })`.
2. **Database Abstraction:** Provides a unified API irrespective of the database. You can flip the database you are using (e.g., migrating from PostgreSQL to MySQL) without rewriting your application's query logic.
3. **Type Safety & Auto-Completion:** When using a raw SQL client, the result type is often `any`, and the IDE cannot read the query string. With an ORM like Prisma, your editor understands the database schema and provides autocomplete for properties (e.g., `user.email`, `user.username`).
4. **Automatic Migrations:** Keeping track of raw SQL commands (`CREATE TABLE`, `ALTER TABLE`) to manage schema changes is tedious. ORMs like Prisma automatically generate and track these migrations for you, making it easy to share database states with other developers.

---

## 🚀 What is Prisma?

**Prisma** is a next-generation Node.js and TypeScript ORM.

**Core Benefits:**

- **Single Data Model:** You define your entire database schema in a single `.prisma` file.
- **Automatic Migrations:** Prisma automatically generates the necessary SQL migrations based on changes made to your data model.
- **End-to-End Type Safety:** Generates a tailored database client with full TypeScript support.

---

## 🛠️ Installing Prisma in a Fresh App

### 1. Initialize a TypeScript Project

```bash
npm init -y
npm install typescript
npx tsc --init

```

_Update `tsconfig.json` to include `"rootDir": "./src"` and `"outDir": "./dist"`._

_Add the build/run script in `package.json`:_

```json
"scripts": {
  "dev": "tsc -b && node ./dist/index.js"
}

```

### 2. Initialize Prisma

```bash
npm install prisma
npx prisma init

```

This creates a `schema.prisma` file. This file contains your data models and configuration (like the `datasource`, which tells Prisma you are using PostgreSQL, and points to your `url` connection string).

---

## 🗄️ Defining Your Data Model

Open `schema.prisma` (install the Prisma VS Code extension for syntax highlighting) and define your models:

```prisma
model Users {
  id       Int     @id @default(autoincrement())
  username String  @unique
  password String
  age      Int?
}

model Todos {
  id       Int     @id @default(autoincrement())
  title    String
  status   Boolean @default(false)
  userId   Int
}

```

_(Note: If you add a new column to an existing model in production, make sure it is optional (`?`) or has a `@default` value to prevent breaking existing database entries)._

### Running Migrations

To push this schema to your database and generate the SQL migration files, run:

```bash
npx prisma migrate dev --name init_schema

```

---

## ⚙️ Generating the Prisma Client

The Prisma Client is what allows your Node.js application to interact with the database (e.g., `Client.user.create()`).

```bash
npx prisma generate

```

_(Note: Running `prisma migrate dev` automatically triggers `prisma generate` under the hood)._

Unlike standard npm packages that install into `node_modules`, Prisma dynamically generates the client files inside `node_modules/@prisma/client` specifically tailored to your unique schema.

---

## 💻 Creating Your First App (CRUD Operations)

Here is how you use the generated client to interact with your database:

```typescript
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

async function createUser() {
  // Create a new user
  const user = await client.users.create({
    data: {
      username: "bob123",
      password: "random128",
      age: 25,
    },
  });
  console.log("User created");

  // Fetch all users
  const allUsers = await client.users.findMany();
  console.log("All users:", JSON.stringify(allUsers));
}

// Find a specific user and only select their username
async function getSpecificUser() {
  const specificUser = await client.users.findMany({
    where: { id: 100 },
    select: { username: true },
  });
}
```

---

## 🔗 Relationships

You must define foreign key relationships upfront in your Prisma schema. Prisma makes this highly intuitive through abstractions.

### One-to-Many Relationship Setup

A single user can have multiple todos:

```prisma
model Users {
  id       Int      @id @default(autoincrement())
  // ... other fields
  todos    Todos[]  // Prisma abstraction (does not become a SQL column)
}

model Todos {
  id       Int      @id @default(autoincrement())
  // ... other fields
  userId   Int
  User     Users    @relation(fields: [userId], references: [id])
}

```

Under the hood, Prisma converts this into the correct SQL constraints (`FOREIGN KEY ("userId") REFERENCES "users" ("id")`).

---

## 🌐 Expressify It!

Integrating Prisma with an Express server allows you to build a full REST API seamlessly.

```bash
npm install express @types/express

```

```typescript
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Fetch all users
app.get("/users", async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

// Fetch todos for a specific user
app.get("/todos/:id", async (req, res) => {
  const todos = await prisma.todos.findMany({
    where: {
      userId: Number(req.params.id),
    },
  });
  res.json(todos);
});

app.listen(3000, () => console.log("Server running on port 3000..."));
```

Run `npm run dev` and test the endpoints via your browser or Postman (`http://localhost:3000/users`).

---

## 🌱 Database Seeding (Q&A 18.1)

To test your application, you need data. Instead of manually entering users one by one, you can automate this using Prisma's seed feature combined with the `@faker-js/faker` library to generate massive amounts of realistic dummy data.

### 1. Setup Dependencies and Configuration

Install the required tools for executing TypeScript files and generating fake data:

```bash
npm i -D ts-node typescript @types/node @faker-js/faker

```

Next, instruct Prisma on how to run your seed file by adding this snippet to your `package.json`:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}

```

### 2. The Seed Script (`prisma/seed.ts`)

Create a file at `prisma/seed.ts` and write a script to bulk-create users and their associated relationships:

```typescript
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    // Generate a unique username by adding a random number suffix
    const mockUsername = `${faker.internet.username()}_${faker.number.int({ min: 10, max: 99 })}`;

    await prisma.users.create({
      data: {
        username: mockUsername,
        password: faker.internet.password(), // Simulated plain text/hashed password
        age: faker.number.int({ min: 18, max: 60 }), // Generates age between 18 and 60
        city: faker.location.city(),
        // Nested write: Creates the user AND their associated todos simultaneously
        todos: {
          create: [
            {
              title: faker.hacker.verb() + " " + faker.hacker.noun(), // e.g., "override primary matrix"
              completed: faker.datatype.boolean(),
            },
            {
              title: faker.git.commitMessage(), // e.g., "fix: resolve merge conflict"
              completed: faker.datatype.boolean(),
            },
            {
              title: faker.lorem.sentence({ min: 3, max: 7 }),
              completed: faker.datatype.boolean(),
            },
          ],
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### 3. Execute the Seed

Run the seed command in your terminal:

```bash
npx prisma db seed

```

**Output:** `🌱  The seed command has been executed.`

---

## 📝 Assignment

Build a complete Todo application that allows a user to sign up, create todos, and fetch their todos.
**Using:**

1. TypeScript (as language)
2. PostgreSQL (as Database)
3. Prisma (as ORM)
4. Zod (for Input Validation)

---

## 🔗 Resources & Notes

- **Class Notes:** [100xDevs Prisma 1](https://projects.100xdevs.com/tracks/gZf9uBBNSbBR7UCqyyqT/prisma-1)
- _Note: Week 18.2 class on Next.js has been moved to Week 19.0._
