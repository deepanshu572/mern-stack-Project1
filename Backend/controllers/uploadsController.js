import uploadOnCloudinary from "../config/cloudinary.js";
import channels from "../model/channelModel.js";
import videos from "../model/videoModel.js";
import shorts from "../model/shortModel.js";
import playlists from "../model/playlistModel.js";
import comunityPosts from "../model/communityModel.js";

export const handleUploadVideo = async (req, res) => {
  try {
    const { chanelId, title, description, tags } = req.body;
    const file = req.files;
    let video;
    let videoBanner;
    if (!file) {
      return res.status(400).json({ message: "Please upload files" });
    }
    if (file.video?.[0]) {
      video = await uploadOnCloudinary(file.video[0].path);
    }
    if (file.videoBanner?.[0]) {
      videoBanner = await uploadOnCloudinary(file.videoBanner[0].path);
    }
    const videoData = await videos.create({
      channel: chanelId,
      title,
      description,
      tags,
      video,
      videoBanner,
    });
    // const VideoPopulatedData = await videoData.populate("channel");

    const channelUpdate = await channels.findByIdAndUpdate(
      chanelId,
      { $push: { videos: videoData._id } },
      { new: true }
    );
    return res.status(200).json({ videoData });
  } catch (error) {
    console.log("upload video error : " + error);
  }
};
export const handleUploadShort = async (req, res) => {
  try {
    const { chanelId, title, description, tags } = req.body;
    const file = req.file;
    let video;
    if (!file) {
      return res.status(400).json({ message: "Please upload files" });
    }
    if (file) {
      video = await uploadOnCloudinary(file.path);
    }
    const shortsData = await shorts.create({
      channel: chanelId,
      title,
      description,
      tags,
      video,
    });
    // const shortsPopulated = await shortsData.populate("channel");

      await channels.findByIdAndUpdate(
      chanelId,

      { $push: { shorts: shortsData?._id } },

      { new: true }
    );

    return res.status(200).json({ shortsData });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `uploads shorts error  : ${error}` });
  }
};
export const handleUploadPlaylist = async (req, res) => {
  try {
    const { chanelId, title, description, selectedVideos } = req.body;
    const playlist = await playlists.create({
      channel: chanelId,
      title,
      description,
      selectedVideos,
    });
    // const populatedPlaylist = await playlist.populate("channel");
    const channelUpdate = await channels.findByIdAndUpdate(
      chanelId,

      { $push: { playlists: playlist._id } },

      { new: true }
    );
    return res.status(200).json({ playlist });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `uploads playlist error  : ${error}` });
  }
};
export const handleUploadCommunityPost = async (req, res) => {
  try {
    const { chanelId, description, image } = req.body;
    const file = req.file;
    let imageData;
    if (!file) {
      return res.status(400).json({ message: "Please upload files" });
    }
    if (file) {
      imageData = await uploadOnCloudinary(file.path);
    }

    const communityData = await comunityPosts.create({
      channel: chanelId,
      description,
      image: imageData,
    });
    // const communityPopulated = await communityData.populate("channel");

    const channelUpdate = await channels.findByIdAndUpdate(
      chanelId,
      {
        communityPosts: communityData._id,
      },
      { new: true }
    );

    return res.status(200).json({ communityData });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `uploads community error  : ${error}` });
  }
};
