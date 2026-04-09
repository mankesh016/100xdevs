import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("Users", UserSchema);

const ContentSchema = new Schema({
  title: String,
  type: String,
  link: String,
  tags: [{ type: Types.ObjectId, ref: "Tags" }],
  userId: { type: Types.ObjectId, ref: "Users", required: true },
});

export const ContentModel = model("Contents", ContentSchema);

const TagSchema = new Schema({
  title: String,
});
export const TagModel = model("Tags", TagSchema);

const LinkSchema = new Schema({
  hash: String,
  userId: { type: Types.ObjectId, ref: "Users", required: true },
});

export const LinkModel = model("Links", LinkSchema);
