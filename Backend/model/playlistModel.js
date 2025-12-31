import mongoose from "mongoose";

const playlistScheme = new mongoose.Schema({
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
  selectedVideos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "video",
    default: [],
  },
});
const playlists = mongoose.model("playlist", playlistScheme);

export default playlists;
