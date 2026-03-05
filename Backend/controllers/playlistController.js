import playlists from "../model/playlistModel.js";
import channels from "../model/channelModel.js";
export const handlePlaylistSave = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const userId = req.userId.toString();

    let playlist = await playlists.findById(playlistId).populate({
      path: "selectedVideos",
      model: "video",
    });

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

export const handleDeletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await playlists.findByIdAndDelete(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found!" });
    }
    return res
      .status(200)
      .json({ message: "Playlist deleted successfully!", playlist });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "something wents wrong in handleDeletePlaylist fnc " });
  }
};

export const handleUpdatePlaylist = async (req, res) => {
  try {
    const {
      channelId,
      title,
      description,
      selectedVideos,
    } = req.body;
    console.log(req.body);
    const playlist = await playlists.findByIdAndUpdate(
      req.params.playlistId,
      {
        title,
        description,
        selectedVideos,
      },
      { new: true },
    ).populate({
      path: "selectedVideos",
      model: "video",
    });
  

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found!" });
    }
    return res
      .status(200)
      .json({ message: "Playlist updated successfully!", playlist });
  } catch (err) {
    return res.status(400).json({
      message: `something wents wrong in handleUpdatePlaylist fnc ${err} `,
    });
  }
};
