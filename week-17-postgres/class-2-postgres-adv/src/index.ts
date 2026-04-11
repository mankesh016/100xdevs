import "dotenv/config";
import express from "express";
import pg = require("pg");

const app = express();
app.use(express.json());

const pgClient = new pg.Client(process.env.PG_CONNECTION);

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const city = req.body.city;
  const country = req.body.country;
  console.log(username, password, city, country);

  // Problem if first query succeeds and second query fails
  // const response = await pgClient.query(
  //   "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;",
  //   [username, password],
  // );
  // console.log(response);
  // const userId = response.rows[0].id;
  // await pgClient.query(
  //   "INSERT INTO addresses (userid, city, country) VALUES ($1, $2, $3)",
  //   [userId, city, country],
  // );

  // Transactional approach
  pgClient.query("BEGIN;");
  const response = await pgClient.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;",
    [username, password],
  );
  const userId = response.rows[0].id;
  await pgClient.query(
    "INSERT INTO addresses (userId, city, country) VALUES ($1, $2, $3)",
    [userId, city, country],
  );
  pgClient.query("COMMIT;");

  res.send("User signed up successfully");
});
app.get("/metadata", async (req, res) => {
  const id = req.query.id;

  // Problem two seprate queries
  const response1 = await pgClient.query(
    "SELECT id, username FROM users WHERE id = $1;",
    [id],
  );
  const response2 = await pgClient.query(
    "SELECT city, country FROM addresses WHERE userId = $1;",
    [id],
  );
  res.send({
    user: response1.rows[0],
    addresses: response2.rows,
  });
});

app.get("/better-metadata", async (req, res) => {
  const id = req.query.id;

  // JOIN
  // const response = await pgClient.query(
  //   "SELECT users.id, users.username, addresses.city, addresses.country FROM users JOIN addresses ON users.id = addresses.userId WHERE users.id = $1;",
  //   [id],
  // );

  // Complexity More as it joins both tables for each match
  const response = await pgClient.query(
    "SELECT u.id, u.username, a.city, a.country FROM users u JOIN addresses a ON u.id = a.userId WHERE u.id = $1;",
    [id],
  );
  // console.log(response.rows);

  res.send({ response: response.rows });
});

async function main() {
  await pgClient.connect();
}

main();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
