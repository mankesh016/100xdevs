const express = require("express");
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { AdminModel, CourseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin");
const { JWT_ADMIN_SECRET } = require("../config");

adminRouter.post("/signup", async (req, res) => {
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

  const foundAdmin = await AdminModel.findOne({ email });
  console.log(foundAdmin);

  if (foundAdmin) {
    res.status(409).json({
      msg: "User already exits!",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 5);

  await AdminModel.create({ email, password: hashedPassword, fullName });
  res.json({ msg: "Successfully signed up!" });
});

adminRouter.post("/signin", async (req, res) => {
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

  const foundAdmin = await AdminModel.findOne({ email });
  console.log(foundAdmin);

  if (!foundAdmin) {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }

  const matchPassword = await bcrypt.compare(password, foundAdmin.password);
  if (matchPassword) {
    const token = jwt.sign({ userId: foundAdmin._id }, JWT_ADMIN_SECRET);
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      msg: "Incorrect username or password",
    });
  }
});

adminRouter.post("/courses", adminMiddleware, async (req, res) => {
  const requiredBody = z.object({
    title: z.string(),
    description: z.string(),
    duration: z.string(),
    price: z.string(),
    imageUrl: z.string(),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invaild data format",
      error: parsedData.error,
    });
    return;
  }

  const { title, description, duration, price, imageUrl } = req.body;

  await CourseModel.create({
    title,
    description,
    duration,
    price,
    imageUrl,
    createrId: req.userId,
  });

  res.json({ msg: "Course Added Successfully!" });
});

adminRouter.delete("/courses", adminMiddleware, async (req, res) => {
  const courseId = req.body.courseId;
  const deletedCourse = await CourseModel.findOneAndDelete({ _id: courseId });

  if (deletedCourse) {
    res.json({ msg: "Course Deleted Successfully!" });
  } else {
    res.json({ msg: "No course found" });
  }
});

adminRouter.put("/courses", adminMiddleware, async (req, res) => {
  const requiredBody = z.object({
    courseId: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    duration: z.string().optional(),
    price: z.string().optional(),
    imageUrl: z.string().optional(),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invaild data format",
      error: parsedData.error,
    });
    return;
  }

  const { courseId, ...updateData } = req.body;

  const updatedCourse = await CourseModel.findOneAndUpdate(
    { _id: courseId, createrId: req.userId },
    {
      $set: updateData, // it only updates the fields present in req.body
    },
  );

  if (updatedCourse) {
    res.json({ msg: "Course updated successfully!" });
  } else {
    res.status(404).json({ msg: "Course not found or unauthorized" });
  }
});

adminRouter.get("/courses", adminMiddleware, async (req, res) => {
  const allCourses = await CourseModel.find({});
  res.json({ allCourses });
});
adminRouter.get("/my/courses", adminMiddleware, async (req, res) => {
  const myCourses = await CourseModel.find({ createrId: req.userId });
  res.json({ myCourses });
});

module.exports = { adminRouter };
