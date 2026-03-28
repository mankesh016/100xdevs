const jwt = require("jsonwebtoken");
const { z } = require("zod");
const bcrypt = require("bcrypt");

const { UserModel, CourseModel } = require("../db");
const { Router } = require("express");
const { JWT_USER_SECRET } = require("../config");
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(5),
    password: z.string().min(6),
    fullName: z.string().min(3),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invaild data format",
      error: parsedData.error,
    });
    return;
  }

  const { email, password, fullName } = req.body;

  const foundUser = await UserModel.findOne({ email });
  console.log(foundUser);

  if (foundUser) {
    res.status(409).json({ msg: "User already exits!" });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  await UserModel.create({ email, password: hashedPassword, fullName });
  res.json({ msg: "Successfully signed up!" });
});

userRouter.post("/signin", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(5),
    password: z.string().min(6),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invaild data format",
      error: parsedData.error,
    });
    return;
  }

  const { email, password } = req.body;

  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    res.status(403).json({ msg: "Incorrect username or password" });
  }

  const matchPassword = await bcrypt.compare(password, foundUser.password);
  if (matchPassword) {
    const token = jwt.sign({ userId: foundUser._id }, JWT_USER_SECRET);
    res.json({ token });
  } else {
    res.status(403).json({ msg: "Incorrect username or password" });
  }
});

module.exports = { userRouter };
