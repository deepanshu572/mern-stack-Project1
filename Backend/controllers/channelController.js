import videos from "../model/videoModel.js";
import shorts from "../model/shortModel.js";
import playlists from "../model/playlistModel.js";
import comunityPosts from "../model/communityModel.js";
import channels from "../model/channelModel.js";

export const getChannelDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Channel ID is required" });
    }
    const channelDetail = await channels.findById({ _id: id });
    return res.status(200).json({ channelDetail });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `channelDetail errorr getChannelDetail :  ${error}` });
  }
};
export const getChannelVideos = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("========================"+ id);

    // const video = await videos.find({ channel: id });
    // return id
  } catch (error) {
    return res.status(400).json({
      message: `channelDetailvideos errorr getChannelVideos :  ${error}`,
    });
  }
};
export const getChannelShorts = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Channel ID is required" });
      }
      const channelDetail = await shorts.findById({ _id: id });
      return res.status(200).json({ channelDetail });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `channelDetail errorr getChannelDetail :  ${error}` });
    }
};
export const getChannelPlaylists = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Channel ID is required" });
      }
      const channelDetail = await playlists.findById({ _id: id });
      return res.status(200).json({ channelDetail });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `channelDetail errorr getChannelDetail :  ${error}` });
    }
};
export const getChannelPosts = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Channel ID is required" });
      }
      const channelDetail = await comunityPosts.findById({ _id: id });
      return res.status(200).json({ channelDetail });
    } catch (error) {
      return res
        .status(400)
        .json({ message: `channelDetail errorr getChannelDetail :  ${error}` });
    }
};
