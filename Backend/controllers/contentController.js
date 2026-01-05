import videos from "../model/videoModel.js";
import shorts from "../model/shortModel.js";
import playlists from "../model/playlistModel.js";
import comunityPosts from "../model/communityModel.js";
import channels from "../model/channelModel.js";

export const getAllVideos = async (req, res) => {
  try {
    const allVideos = await videos.find({}).populate("channel");
    return res.status(200).json({ allVideos });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `getAllVideos fnc error  : ${error}` });
  }
};
export const getAllShorts = async (req, res) => {
  try {
    const allShorts = await shorts.find({}).populate("channel");
    return res.status(200).json({ allShorts });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `getAllShorts fnc error  : ${error}` });
  }
};
export const getAllPlaylist = async (req, res) => {
  try {
    const allPlaylist = await playlists
      .find({})
      .populate("channel");
    return res.status(200).json({ allPlaylist });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `getAllPlaylist fnc error  : ${error}` });
  }
};
export const getAllPost = async (req, res) => {
  try {
    const allPost = await comunityPosts.find({}).populate("channel");
    return res.status(200).json({ allPost });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `getAllPost fnc error  : ${error}` });
  }
};
