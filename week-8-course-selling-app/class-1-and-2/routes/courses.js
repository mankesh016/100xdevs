const express = require("express");
const Router = express.Router;
const courseRouter = Router();
const { z } = require("zod");
const { CourseModel, PurchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  // userId, courseId
  const requiredBody = z.object({
    courseId: z.string(),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invaild data format",
      error: parsedData.error,
    });
    return;
  }

  const { courseId } = req.body;
  await PurchaseModel.create({ userId: req.userId, courseId });

  res.json({
    msg: "Course Purchased Successfully!",
  });
});

courseRouter.get("/preview", async (req, res) => {
  // all courses
  const allCourses = await CourseModel.find({});
  res.json({ allCourses });
});

courseRouter.get("/my", userMiddleware, async (req, res) => {
  // my courses
  const myPurchases = await PurchaseModel.find({ userId: req.userId });
  const purchasedCoursesId = myPurchases.map((purchase) => purchase.courseId);

  // courseId
  const myCourses = await CourseModel.find({
    _id: { $in: purchasedCoursesId },
  });
  res.json({ myCourses });
});

module.exports = { courseRouter };
