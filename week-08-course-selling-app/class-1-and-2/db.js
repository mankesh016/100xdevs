const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  fullName: String,
});

const AdminSchema = new Schema({
  email: String,
  password: String,
  fullName: String,
});

const CourseSchema = new Schema({
  title: String,
  description: String,
  duration: String,
  imageUrl: String,
  price: Number,
  createrId: {
    type: Schema.Types.ObjectId,
    ref: "admins",
  },
});

const PurchaseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "courses",
  },
});

const UserModel = mongoose.model("users", UserSchema);
const CourseModel = mongoose.model("courses", CourseSchema);
const AdminModel = mongoose.model("admins", AdminSchema);
const PurchaseModel = mongoose.model("purchases", PurchaseSchema);

module.exports = {
  UserModel,
  CourseModel,
  AdminModel,
  PurchaseModel,
};
