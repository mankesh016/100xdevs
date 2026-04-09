import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { authMiddleware, JWT_SECRET } from "./middleware.js";
import { generateHash } from "./utils.js";
import cors from "cors";

mongoose.connect(process.env.DB_CONNECT!);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  // TODO: zod validation and password hashing
  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username: username,
      password: password,
    });
    res.json({
      message: "Successfully Signed Up!",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists!",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({
    username: username,
    password: password,
  });

  // sign JWT token
  if (existingUser) {
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

// app.use(authMiddleware);

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const title = req.body.title;
  const link = req.body.link;
  const type = req.body.type;

  await ContentModel.create({
    title: title,
    link: link,
    type: type,
    tags: [],
    //@ts-ignore
    userId: req.userId,
  });

  res.json({
    message: "Content Added",
  });
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  const content = await ContentModel.find({ userId: userId }).populate(
    "userId",
    "username",
  );
  res.json({
    content,
  });
});

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const contentId: String = req.body.contentId;

  const deleteDoc = await ContentModel.findOneAndDelete({
    _id: contentId,
    // @ts-ignore
    userId: req.userId,
  });

  if (!deleteDoc) {
    res.json({
      message: "no content found",
    });
  } else {
    res.json({
      message: "deleted successfuly!",
    });
  }
});

app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  const share: boolean = req.body.share;
  if (share) {
    const existingLink = await LinkModel.findOne({
      // @ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }

    const hash = generateHash(6);
    await LinkModel.create({
      // @ts-ignore
      userId: req.userId,
      hash: hash,
    });

    res.json({
      hash,
    });
    return;
  }

  await LinkModel.deleteOne({
    // @ts-ignore
    userId: req.userId,
  });

  res.json({
    message: "Sharable link deleted",
  });
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const linkData = await LinkModel.findOne({
    hash: hash,
  });

  if (linkData) {
    // share brain of linkData.userId
    const userId = linkData.userId;
    const content = await ContentModel.find({ userId: userId });
    res.json({
      usename: content,
    });
    return;
  }

  res.status(411).json({
    message: "No such links",
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
