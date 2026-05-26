const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const JWT_SECRET = "itsasecret";
app.use(express.json());

const users = [];
app.use(cors());

function auth(req, res, next) {
  const token = req.headers.authorization;
  try {
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    res.username = decodedInfo.username;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Invalid token",
    });
  }
}
function logger(req, res, next) {
  console.log(req.method + " request received");
  next();
}

app.post("/signup", logger, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }
  users.push({ username, password });

  res.json({
    msg: "Successfully registerd!",
  });
});

app.post("/signin", logger, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (
    users.find(
      (user) => user.username === username && user.password === password,
    )
  ) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    res.json({
      msg: "successfully signed in",
      token: token,
    });
  } else {
    res.status(403).json({
      msg: "incorrect username or password",
    });
  }
});

app.get("/me", logger, auth, (req, res) => {
  res.json({
    msg: "Welcome " + res.username,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
