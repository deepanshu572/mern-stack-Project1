import videos from "../model/videoModel.js";

export const handletoggleLikes = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.userId.toString();
    const video = await videos.findOne({ _id: videoId });
    if (video.like.includes(userId)) {
      console.log("done");
      video.like.pull(userId);
    } else {
      video.like.push(userId);
      video.dislike.pull(userId);
      console.log("check kar!");
    }
    await video.save();
    return res.status(200).json({ video });
  } catch (error) {
    console.log(error);
  }
};
export const handletoggleDisLikes = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.userId.toString();

    const video = await videos.findById(videoId);
    if (!video) return res.status(404).json({ message: "video not found" });

    if (video.dislike.includes(userId)) {
      video.dislike.pull(userId);
      console.log("Dislike removed");
    } else {
      video.dislike.push(userId);
      video.like.pull(userId);
      console.log("Dislike added, like removed if existed");
    }

    await video.save();
    return res.status(200).json({ video });
  } catch (error) {
    console.error("Error toggling dislike:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const handleSaveBy = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.userId.toString();
    const video = await videos.findById(videoId);
    if (!video) return res.status(404).json({ message: "video not found" });
    if (video.saveBy.includes(userId)) {
      video.saveBy.pull(userId);
      console.log("unsaved");
    } else {
      video.saveBy.push(userId);
      console.log("saved");
    }
    await video.save();
    return res.status(200).json({ video });
  } catch (error) {
    console.error("Error toggling dislike:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
