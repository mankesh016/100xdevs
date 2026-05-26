const express = require("express");
const mongoose = require("mongoose");
const { adminRouter } = require("./routes/admin");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/courses");

require("dotenv").config();
// node --env-file=.env index.js (use this in node v20+, instead of dotenv)

const app = express();
app.use(express.json());

app.use("/admin", adminRouter); // to redirect the req with this prefix to specific router
app.use("/user", userRouter);
app.use("/courses", courseRouter);

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome Back!",
  });
});

async function main() {
  mongoose.connect(process.env.DB_CONNECT); // to ensure database is connected first...
  app.listen(3000, () => console.log("Sever is listening on 3000 port"));
}

main();
