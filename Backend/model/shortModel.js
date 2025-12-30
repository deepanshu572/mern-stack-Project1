import mongoose from "mongoose";

const ShortScheme = new mongoose.Schema({
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
  videoBanner: {
    type: String,
    default: "",
  },
  video: {
    type: String,
    default: "",
  },
});
const shorts = mongoose.model("video", ShortScheme);

export default shorts;
