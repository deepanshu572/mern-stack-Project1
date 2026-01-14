import shorts from "../model/shortModel.js";

export const handletoggleLikes = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userId = req.userId.toString();
    const short = await shorts.findOne({ _id: shortId });
    if (short.like.includes(userId)) {
      console.log("done");
      short.like.pull(userId);
    } else {
      short.like.push(userId);
      short.dislike.pull(userId);
      console.log("check kar!");
    }
    await short.save();
    return res.status(200).json({ short });
  } catch (error) {
    console.log(error);
  }
};
export const handletoggleDisLikes = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userId = req.userId.toString();

    const short = await shorts.findById(shortId);
    if (!short) return res.status(404).json({ message: "Short not found" });

    if (short.dislike.includes(userId)) {
      short.dislike.pull(userId);
      console.log("Dislike removed");
    } else {
      short.dislike.push(userId);
      short.like.pull(userId);
      console.log("Dislike added, like removed if existed");
    }

    await short.save();
    return res.status(200).json({ short });
  } catch (error) {
    console.error("Error toggling dislike:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const handleSaveBy = async (req, res) => {
  try {
    const { shortId } = req.params;
    const userId = req.userId.toString();
    const short = await shorts.findById(shortId);
    if (!short) return res.status(404).json({ message: "Short not found" });
    if (short.saveBy.includes(userId)) {
      short.saveBy.pull(userId);
      console.log("unsaved");
    } else {
      short.saveBy.push(userId);
      console.log("saved");
    }
    await short.save();
    return res.status(200).json({ short });
  } catch (error) {
    console.error("Error toggling dislike:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
