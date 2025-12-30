import uploadOnCloudinary from "../config/cloudinary.js";
import channels from "../model/channelModel.js";
import videos from "../model/videoModel.js";

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
      title,
      description,
      tags,
      video,
      videoBanner,
    });
    console.log("id" + videoData);
    const VideoPopulatedData = await channels.findByIdAndUpdate(
      chanelId,
      {
        videos: videoData._id,
      },
      { new: true }
    );
    console.log(videoData);
    return res.status(200).json({ videoData });
  } catch (error) {
    console.log("upload video error : " + error);
  }
};
export const handleUploadShort = (req, res) => {};
export const handleUploadPlaylist = (req, res) => {};
export const handleUploadCommunityPost = (req, res) => {};
