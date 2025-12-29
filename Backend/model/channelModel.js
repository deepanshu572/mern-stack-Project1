import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/1200x/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg",
  },
  bannerImage: {
    type: String,
    default: "",
  },
  category: {
    type: String,
  },
  communityPosts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comunityPost",
  },
  playlists: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "playlist",
  },
  shorts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shorts",
  },
  subscribers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subscriber",
  },
  videos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "video",
  },
});

const channels = mongoose.model("channel", channelSchema);

export default channels;