const express = require("express");
const app = express();

app.use(express.json());

// Assignment !!!

const users = [];
function generateToken(username) {
  // Implement your token generation logic here
  let token = "";
  for (let i = 0; i < 10; i++) {
    token += Math.random().toString(36).charAt(2);
  }
  return token + username;
}

app.post("/signup", (req, res) => {
  // Handle signup logic
  const username = req.body.username;
  const password = req.body.password;
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }
  const token = generateToken(username);
  users.push({ username, password, token });

  res.json({
    msg: "Successfully registerd!",
    token: token,
  });
});

app.post("/signin", (req, res) => {
  // Handle signin logic
  const username = req.body.username;
  const password = req.body.password;

  if (
    users.find((user) => {
      return user.username === username && user.password == password;
    })
  ) {
    const newToken = generateToken(username);
    users.forEach((user) => {
      if (user.username == username && user.password == password) {
        user.token = newToken;
      }
    });

    res.json({
      msg: "successfully signed in",
      token: newToken,
    });
  } else {
    res.status(403).json({
      msg: "incorrect username or password",
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.authorization;
  let foundUser = null;
  users.find((user) => {
    if (user.token === token) {
      foundUser = user;
      return true;
    } else return false;
  });

  if (foundUser) {
    res.json({
      msg: "Welcome " + foundUser.username,
    });
  } else {
    res.status(403).json({
      msg: "No such User",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
