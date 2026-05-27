---
# Week 17.1: PostgreSQL & SQL Database Fundamentals

This section transitions from the schemaless world of MongoDB into the structured, relational ecosystem of PostgreSQL. It covers the core differences between database types, raw SQL syntax, integrating Postgres with a Node.js backend, and critical security practices like preventing SQL injections.
---

## 🗄️ 1. Database Paradigms: NoSQL vs. SQL

Before diving into Postgres, it is crucial to understand the broader database landscape and why different applications choose different tools.

| Database Type        | Characteristics                                                                   | Examples          | Best Use Case                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| **NoSQL (Document)** | Schemaless, stores data in JSON-like documents, horizontally scalable by default. | MongoDB, Firebase | Rapid prototyping (e.g., hackathons), unstructured data, applications where the schema changes constantly.         |
| **SQL (Relational)** | Enforces strict schemas, stores data in tables (rows/columns), highly structured. | PostgreSQL, MySQL | Most enterprise full-stack apps, financial systems, or anything requiring strict data integrity and complex joins. |
| **Graph**            | Stores data as nodes and edges (relationships).                                   | Neo4j             | Social networks (finding "friends of friends"), recommendation engines.                                            |
| **Vector**           | Stores data as mathematical vectors (embeddings).                                 | Pinecone, Milvus  | Machine Learning, LLMs (Large Language Models), semantic search, and similarity matching.                          |

> **💡 Mongoose vs. SQL Schemas:** In MongoDB, the database itself is schemaless; we enforce the schema artificially at the Node.js level using Mongoose. In SQL, the schema is strictly enforced at the **database level**. If your app changes, you must write and execute SQL "migrations" to update the tables.

---

## 🐘 2. Setting Up PostgreSQL

To avoid the overhead of running Postgres locally, modern development often utilizes serverless cloud databases.

- **Provider:** [Neon.tech](https://neon.tech/) (Serverless Postgres).
- **Connection String Format:** The standard URI to connect to a database looks very similar to an HTTP URL:
  `postgresql://[username]:[password]@[host]/[database]`
- **Client Tools:** \* **pgAdmin:** A popular GUI (Graphical User Interface) for Postgres, similar to MongoDB Compass.
- **psql:** The command-line interface. (Command `\dt` lists all tables).

---

## 📝 3. Core SQL Syntax (CRUD)

In SQL, you interact with the data using structured queries rather than JavaScript objects.

### Creating a Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

```

- **`SERIAL`:** Automatically increments the ID for every new row (1, 2, 3...). Note: If an insert fails (e.g., duplicate email), the sequence still increments behind the scenes.
- **Why not use email as a Primary Key?** Users change their emails. Primary keys should ideally be immutable (unchanging).

### CRUD Operations

```sql
-- INSERT (Create)
INSERT INTO users (username, email, password)
VALUES ('alice', 'alice@gmail.com', 'pass123');

-- SELECT (Read)
SELECT * FROM users WHERE id = 1;

-- UPDATE (Update)
UPDATE users
SET password = 'new-password'
WHERE email = 'user@example.com';

-- DELETE (Delete)
DELETE FROM users WHERE id = 1;

```

---

## ⚙️ 4. Node.js Integration (`pg` library)

To connect our Express backend to Postgres, we use the `pg` (node-postgres) library. It is a non-blocking PostgreSQL client written in pure JavaScript.

**Setup:**

```bash
npm init -y
npm install typescript @types/node --save-dev
npx tsc --init
npm install pg @types/pg express dotenv

```

**Database Connection Boilerplate:**

```typescript
import { Client } from "pg";
import "dotenv/config"; // Loads process.env.PG_CONNECTION

const client = new Client(process.env.PG_CONNECTION);

async function connectDB() {
  await client.connect();
  console.log("Connected to database");

  const response = await client.query("SELECT * FROM users");
  console.log(response.rows);

  await client.end();
}
```

_(Note: Modern ECMAScript Modules (ESM) support "Top-level await", allowing you to use `await` outside of async functions. Enable this by setting `"type": "module"` in `package.json` or using `.mjs` extensions)._

---

## 🚨 5. Security: Defeating SQL Injection

**SQL Injection** is a vulnerability where an attacker manipulates a backend's database query by injecting malicious SQL code via user input fields.

### The Vulnerability (Bad Code)

```typescript
// ❌ NEVER DO THIS: Blindly concatenating strings
const username = req.body.username;
const password = req.body.password;

const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`;
await client.query(query);
```

**The Attack:** If a malicious user enters `pass'); DELETE FROM users; --` as their password, the final executed query becomes:
`INSERT INTO users (username, password) VALUES ('user', 'pass'); DELETE FROM users; --');`
_This successfully creates a user, and then wipes your entire database._

### The Fix: Parameterized Queries (Good Code)

Always send the SQL command and the user data separately. The database driver will sanitize the inputs, treating them strictly as literal values, never as executable code.

```typescript
// ✅ DO THIS: Using variables ($1, $2)
const insertQuery = "INSERT INTO users (username, password) VALUES ($1, $2)";
const values = [username, password];

await client.query(insertQuery, values);
```

---

## 🧠 Q&A

**1. How do we scale SQL databases?**

- **Vertical Scaling:** The primary method for SQL. Add more CPU, RAM, and storage to the single database server.
- **Master-Slave Architecture (Horizontal Read Scaling):** Since most applications have a 10:1 Read-to-Write ratio, you use one "Master" node strictly for writes, and replicate the data to multiple "Slave" (Read-Replica) nodes to handle read queries.
- **Sharding:** Dividing your data across multiple separate database servers based on a key (e.g., Users A-M on DB1, N-Z on DB2). _Warning:_ Sharding makes SQL `JOIN` operations extremely difficult or impossible across shards.

**2. Chat Application Architecture Considerations:**
If building a WebSocket-based chat app, consider:

- **Scaling:** How to handle millions of concurrent connections (Hint: Pub/Sub models using **Kafka** or **Redis**).
- **Features:** Media uploads (S3), nested threads, tagging users.
- **Message Delivery:** If a group has 500 members, one message sent requires the server to broadcast 500 individual websocket payloads. Architecting this fan-out process efficiently is key.

**Class Resources:**

- [100xDevs SQL Notes & Assignments](https://projects.100xdevs.com/tracks/YOSAherHkqWXhOdlE4yE/sql-1)
