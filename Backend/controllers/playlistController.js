import playlists from "../model/playlistModel.js";

export const handlePlaylistSave = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const userId = req.userId.toString();

    let playlist = await playlists.findById(playlistId).populate({
      path: "selectedVideos",
      model: "video",
    })

    if (!playlist) {
      return res.status(400).json({ message: "Playlist not found!" });
    }

    if (playlist.saveBy.includes(userId)) {
      playlist.saveBy.pull(userId);
    } else {
      playlist.saveBy.push(userId);
    }

    await playlist.save();
    return res.status(200).json(playlist);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "something wents wrong in handlePlaylistSave fnc " });
  }
};
