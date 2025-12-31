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
  video: {
    type: String,
    default: "",
  },
});
const shorts = mongoose.model("short", ShortScheme);

export default shorts;
