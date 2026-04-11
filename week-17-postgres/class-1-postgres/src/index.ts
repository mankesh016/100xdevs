import "dotenv/config";
import express from "express";
import pg = require("pg");

const app = express();
app.use(express.json());

const pgClient = new pg.Client(process.env.PG_CONNECTION);

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`;
  // console.log(query);
  // SQL Injection vulnerability
  // "password": "'); DELETE FROM users; INSERT INTO users (username, password) VALUES ('user','pass"
  // await pgClient.query(
  //   `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`,
  // );

  await pgClient.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, password],
  );

  res.send("User signed up successfully");
});
async function main() {
  await pgClient.connect();
  // await pgClient.query("UPDATE users SET username = 'alice123' where id = 1;");
  // const response = await pgClient.query("SELECT * from users;");
  // console.log(response.rows);
}

main();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
