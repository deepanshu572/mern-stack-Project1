import mongoose from "mongoose";
const replySchema = new mongoose.Schema(
  {
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channel",
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, Default: Date.now() },
    updatedAt: { type: Date },
  },
  { _id: true }
);

const commentSchema = new mongoose.Schema(
  {
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channel",
    },
    message: {
      type: String,
      required: true,
    },
    replies: { replySchema },
    createdAt: { type: Date, Default: Date.now() },
    updatedAt: { type: Date },
  },
  { _id: true }
);
const comunityPostScheme = new mongoose.Schema({
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channel",
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    dislike: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
},{timestamps:true});
const comunityPosts = mongoose.model("comunityPost", comunityPostScheme);

export default comunityPosts;
