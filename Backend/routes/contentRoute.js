import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  getAllVideos,
  getAllShorts,
  getAllPlaylist,
  getAllPost,
  getChannelDetail,
} from "../controllers/contentController.js";

const contentRouter = express.Router();

contentRouter.post("/allVideos", getAllVideos);
contentRouter.post("/allShorts", getAllShorts);
contentRouter.post("/allPlaylist", getAllPlaylist);
contentRouter.post("/allPost", getAllPost);
contentRouter.get("/channelDetail/:id", getChannelDetail);

export default contentRouter;
