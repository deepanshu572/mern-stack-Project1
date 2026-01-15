import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
  },
  { _id: true }
);

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      required: true,
    },
    replies: [replySchema],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
  },
  { _id: true }
);
const ShortScheme = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channel",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: {
      type: String,
    },
    video: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    saveBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
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
    comments: [commentSchema],
  },

  { timestamps: true }
);
const shorts = mongoose.model("short", ShortScheme);

export default shorts;
