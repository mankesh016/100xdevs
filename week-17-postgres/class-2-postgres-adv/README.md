---
# Week 17.2: Advanced PostgreSQL - Relationships, Transactions & Joins

## 📖 Intro

This section builds upon the SQL fundamentals established in Week 17.1. We move beyond simple CRUD operations on a single table and explore the true power of Relational Databases: how tables interact with one another. We cover how to design relationships, how to ensure data integrity during complex operations using Transactions, and how to efficiently retrieve linked data using SQL Joins.
---

## 🏗️ Context

In real-world applications, data is rarely isolated. A user has an address, a blog post has comments, and an order has items. While NoSQL databases often solve this by nesting data (putting addresses inside the user document), SQL databases require normalization—breaking data into distinct tables and linking them together. Mastering these concepts is essential for backend engineering and system design interviews.

---

## 🔗 Relationships

Relational databases link tables together using **Primary Keys** (the unique identifier for a row in its own table) and **Foreign Keys** (a column in one table that points to a Primary Key in another).

### One-to-Many Relationship Example

A common scenario: One User can have multiple Addresses (e.g., Home, Work, Billing).

```sql
-- The Base Table (The "One")
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- The Referencing Table (The "Many")
CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL, -- This links back to the user
  city VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  street VARCHAR(255) NOT NULL,
  pincode VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

```

### Deletion Rules (Referential Integrity)

When you delete a record from a base table, what happens to the related data? You define this behavior using constraints:

- **`ON DELETE CASCADE`:** If you delete a user from the `users` table, all of their related addresses in the `addresses` table are instantly and automatically deleted. This prevents "orphan" records.
- **`ON DELETE RESTRICT`:** The database will _prevent_ you from deleting the user if they still have addresses linked to them. You must manually delete the addresses first.

---

## 💳 Transactions

A Transaction is a sequence of database operations that are treated as a single, atomic unit of work.

**The Classic Example (Banking):**

- **Query 1:** Deduct $100 from Alice's account.
- **Query 2:** Add $100 to Bob's account.

If the server crashes after Query 1 but before Query 2, $100 disappears into the void. Transactions ensure that **either BOTH queries succeed, or NEITHER happens.** ### Implementation

```sql
BEGIN; -- Start the transaction

INSERT INTO users (username, email, password) VALUES ('bob', 'bob@test.com', 'pass123');
-- If the next query fails due to a typo or network error...
INSERT INTO addresses (user_id, city, country) VALUES (999, 'NYC', 'USA');

COMMIT; -- Save changes permanently

```

If an error occurs anywhere between `BEGIN` and `COMMIT`, the database automatically performs a **`ROLLBACK`**, undoing all changes made in that transaction block.

---

## 🪢 Joins

Defining relationships is only half the battle; fetching the scattered data efficiently is the other.

**The Scenario:** Fetch a user's details _and_ their address.

- **The Bad Approach:** Query the `users` table. Wait for the response in Node.js. Extract the `user_id`. Make a second query to the `addresses` table. (This causes high latency).
- **The Good Approach:** Use a `JOIN` to make the database engine combine the data in a single optimized query.

```sql
SELECT u.id, u.username, u.email, a.city, a.country
FROM users u
JOIN addresses a ON a.user_id = u.id
WHERE u.id = 1;

```

_(Note on Performance: If the `ON` condition is missing or incorrect, the database might perform a Cartesian Product—multiplying every row in Table A by every row in Table B (NxM), which can crash a system. However, modern SQL engines are highly optimized to execute properly written Joins faster than multiple separate queries)._

---

## 🔀 Types of Joins

Understanding which Join to use is a fundamental SQL skill.

1. **`JOIN` (or `INNER JOIN`):** The default. Returns _only_ the rows that have matching values in BOTH tables.

- _Gotcha:_ If Alice exists in `users` but has no entries in `addresses`, an `INNER JOIN` will not return Alice at all.

2. **`LEFT JOIN`:** Returns ALL rows from the left table (`users`), and any matching rows from the right table (`addresses`).

- _Use Case:_ If you want to see Alice's details regardless of whether she has an address, use a `LEFT JOIN`. The address columns for her row will simply return `NULL`.

3. **`RIGHT JOIN`:** Returns ALL rows from the right table, and matching rows from the left.
4. **`FULL JOIN`:** Returns ALL rows from both tables, combining matches where possible and filling gaps with `NULL` everywhere else.

---

## 🎯 Conclusion & Resources

Mastering these core SQL concepts allows you to design robust, scalable, and normalized databases. Moving forward, modern ORMs (like Prisma) will abstract much of this raw SQL syntax away, but understanding the underlying mechanics of Foreign Keys, Cascades, and Transactions is what separates junior developers from senior engineers.

**Class Resources:**

- [100xDevs SQL Notes & Assignments](https://projects.100xdevs.com/tracks/YOSAherHkqWXhOdlE4yE/sql-1)
