import channels from "../model/channelModel.js";

export const getAllChannels = async (req, res) => {
  try {
    const Allchannels = await channels
      .find({})
      .populate("videos")
      .populate("shorts")
      .populate("playlists")
      .populate("communityPosts")
      
    return res.status(200).json({ Allchannels });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `allchannels errorr getAllChannels :  ${error}` });
  }
};
