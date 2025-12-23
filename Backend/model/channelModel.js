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
