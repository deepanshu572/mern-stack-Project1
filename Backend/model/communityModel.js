import mongoose from "mongoose";

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
});
const comunityPosts = mongoose.model("comunityPost", comunityPostScheme);

export default comunityPosts;
