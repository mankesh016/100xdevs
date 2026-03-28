const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");

// ADD database url
mongoose.connect("mongodb+srv://");

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const User = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(6).max(30),
    name: z.string(),
  });

  const parsedData = User.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      error: parsedData.error,
      msg: "Invalid Data",
    });
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const hobby = req.body.hobby;

  const hashedPassword = await bcrypt.hash(password, 5);
  console.log(hashedPassword);

  try {
    await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
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

  const ObjectId = await UserModel.findOne({ email });
  const hashedPassword = ObjectId.password;

  const passwordMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordMatch) {
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
  console.log("Server is listening on port 3000...");
});
