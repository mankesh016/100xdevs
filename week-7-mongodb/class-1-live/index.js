const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const mongoose = require("mongoose");

const app = express();

// ADD database url
mongoose.connect("mongodb+srv://");

app.use(express.json());

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  try {
    await UserModel.create({
      email: email,
      password: password,
      name: name,
    });

    res.json({
      msg: "Successfully signed up!",
    });
  } catch {
    res.status(409).json({
      msg: "User already exits!",
    });
  }
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const ObjectId = await UserModel.findOne({ email, password });

  if (ObjectId) {
    const token = jwt.sign({ userId: ObjectId._id }, JWT_SECRET);
    res.send({ token });
  } else {
    res.status(403).json({
      msg: "Incorrect email or password",
    });
  }
});

app.post("/todo", auth, async function (req, res) {
  const title = req.body.title;
  const userId = req.userId;
  const done = false;

  await TodoModel.create({
    title,
    done,
    userId,
  });

  res.json({ msg: "Successfully added the task!" });
});

app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;
  const tasks = await TodoModel.find({
    userId,
  });

  res.json({ tasks });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
