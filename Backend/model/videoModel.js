import mongoose from "mongoose";

const VideoScheme = new mongoose.Schema({
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
const videos = mongoose.model("video", VideoScheme);

export default videos;
