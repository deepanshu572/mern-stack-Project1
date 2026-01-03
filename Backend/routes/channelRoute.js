import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  getChannelDetail,
  getChannelVideos,
  getChannelShorts,
  getChannelPosts,
  getChannelPlaylists,
} from "../controllers/channelController.js";

const channelRouter = express.Router();
channelRouter.get("/channelDetail/:id", isAuth, getChannelDetail);
channelRouter.post("/videos/:id", isAuth, getChannelVideos);
channelRouter.post("/shorts/:id", isAuth, getChannelShorts);
channelRouter.post("/playlist/:id", isAuth, getChannelPlaylists);
channelRouter.post("/post/:id", isAuth, getChannelPosts);

export default channelRouter;
