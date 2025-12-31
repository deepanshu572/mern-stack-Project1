import videos from "../model/videoModel.js";

export const getAllVideos = async (req, res) => {
  try {
    const allVideos = await videos.find({}).populate('channel');
    return res.status(200).json({ allVideos });
  } catch (error) {
    console.log(error);
  }
};
